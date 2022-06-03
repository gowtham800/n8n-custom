import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

import {
	handleListing,
	loadResource,
	recurlyApiRequest,
} from './helpers';

import {
	subscriptionOperations,
	invoiceOperations,
	transactionOperations,
	planOperations,
	subscriptionFields,
	invoiceFields,
	transactionFields,
	planFields
} from './descriptions';

export class Recurly implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Recurly',
		name: 'recurly',
		icon: 'file:RecurlyLogo.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Recurly API',
		defaults: {
				name: 'Recurly',
				color: '#1A82e2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: "recurlyApi",
				required: true
			}
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Subscription',
						value: 'subscription',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Transaction',
						value: 'transaction',
					},
					{
						name: 'Plan',
						value: 'plan',
					},
				],
				default: 'subscription',
				description: 'Resource to consume',
			},
			...subscriptionOperations,
			...invoiceOperations,
			...transactionOperations,
			...planOperations,
			...subscriptionFields,
			...invoiceFields,
			...transactionFields,
			...planFields
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData;
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {

			try {

				if (resource === 'subscription') {

				 if (operation === 'get') {

						// ----------------------------------
						//           subscription: get
						// ----------------------------------

						const subscriptionId = this.getNodeParameter('subscriptionId', i);
						responseData = await recurlyApiRequest.call(this, 'GET', `/subscriptions/${subscriptionId}`, {}, {});

					} else if (operation === 'getAll') {

						// ----------------------------------
						//          subscription: getAll
						// ----------------------------------

						responseData = await handleListing.call(this, resource, i);

					}

				}

				else if (resource === 'plan') {

					if (operation === 'get') {

						 // ----------------------------------
						 //           plan: get
						 // ----------------------------------

						 const planId = this.getNodeParameter('planId', i);
						 responseData = await recurlyApiRequest.call(this, 'GET', `/plans/${planId}`, {}, {});

					 } else if (operation === 'getAll') {

						 // ----------------------------------
						 //          plan: getAll
						 // ----------------------------------

						 responseData = await handleListing.call(this, resource, i);

					 }

				}

				else if (resource === 'transaction') {

					if (operation === 'get') {

						 // ----------------------------------
						 //           transaction: get
						 // ----------------------------------

						 const transactionId = this.getNodeParameter('transactionId', i);
						 responseData = await recurlyApiRequest.call(this, 'GET', `/transactions/${transactionId}`, {}, {});

					 } else if (operation === 'getAll') {

						 // ----------------------------------
						 //          transaction: getAll
						 // ----------------------------------

						 responseData = await handleListing.call(this, resource, i);

					 }

				}

				else if (resource === 'invoice') {

					if (operation === 'get') {

						 // ----------------------------------
						 //           invoice: get
						 // ----------------------------------

						 const invoiceId = this.getNodeParameter('invoiceId', i);
						 responseData = await recurlyApiRequest.call(this, 'GET', `/invoices/${invoiceId}`, {}, {});

					 } else if (operation === 'getAll') {

						 // ----------------------------------
						 //          invoice: getAll
						 // ----------------------------------

						 responseData = await handleListing.call(this, resource, i);

					 }

				}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}

				throw error;
			}

			Array.isArray(responseData)
				? returnData.push(...responseData)
				: returnData.push(responseData);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
