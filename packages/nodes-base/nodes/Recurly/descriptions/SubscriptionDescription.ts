import {
	INodeProperties,
} from 'n8n-workflow';

export const subscriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'get',
		description: 'Operation to perform',
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a subscription',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all subscriptions',
			}
		],
		displayOptions: {
			show: {
				resource: [
					'subscription',
				],
			},
		},
	},
];

export const subscriptionFields: INodeProperties[] = [
	// ----------------------------------
	//       subscription: get
	// ----------------------------------
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the subscription to retrieve',
		displayOptions: {
			show: {
				resource: [
					'subscription',
				],
				operation: [
					'get',
				],
			},
		},
	},

	// ----------------------------------
	//       subscription: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: [
					'subscription',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		displayOptions: {
			show: {
				resource: [
					'subscription',
				],
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
	}
];
