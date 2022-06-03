import {
	IExecuteFunctions,
	IHookFunctions,
} from 'n8n-core';

import {
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import {
	flow,
	isEmpty,
	omit,
} from 'lodash';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

/**
 * Make an API request to Recurly
 *
 * @param {IHookFunctions} this
 * @param {string} method
 * @param {string} url
 * @param {object} body
 * @returns {Promise<any>}
 */
export async function recurlyApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: object,
	query?: object,
) {
	const credentials = await this.getCredentials('recurlyApi');

	const options = {
		headers: {
			'Accept': 'application/vnd.recurly.v2021-02-25+json',
		},
		method,
		auth: {
			user: credentials.secretKey as string,
		},
		form: body,
		qs: query,
		uri: `https://v3.eu.recurly.com${endpoint}`,
		json: true,
	};

	if (options.qs && Object.keys(options.qs).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.request!.call(this, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Load a resource so it can be selected by name from a dropdown.
 */
export async function loadResource(
	this: ILoadOptionsFunctions,
	resource: 'subscription' | 'invoice' | 'transaction' | 'plan',
): Promise<INodePropertyOptions[]> {
	const responseData = await recurlyApiRequest.call(this, 'GET', `/${resource}s`, {}, {});

	return responseData.data.map(({ name, id }: { name: string, id: string }) => ({
		name,
		value: id,
	}));
}

/**
 * Handles a Recurly listing by returning all items or up to a limit.
 */
export async function handleListing(
	this: IExecuteFunctions,
	resource: string,
	i: number,
	qs: IDataObject = {},
) {
	const returnData: IDataObject[] = [];
	let responseData;

	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = this.getNodeParameter('limit', i, 0) as number;

	do {
		responseData = await recurlyApiRequest.call(this, 'GET', `/${resource}s`, {}, qs);
		returnData.push(...responseData.data);

		if (!returnAll && returnData.length >= limit) {
			return returnData.slice(0, limit);
		}

		qs.starting_after = returnData[returnData.length - 1].id;
	} while (responseData.has_more);

	return returnData;
}
