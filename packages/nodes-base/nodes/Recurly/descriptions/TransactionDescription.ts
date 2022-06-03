import {
	INodeProperties,
} from 'n8n-workflow';

export const transactionOperations: INodeProperties[] = [
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
				description: 'Get a transaction',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all transactions',
			}
		],
		displayOptions: {
			show: {
				resource: [
					'transaction',
				],
			},
		},
	},
];

export const transactionFields: INodeProperties[] = [
	// ----------------------------------
	//       transaction: get
	// ----------------------------------
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the transaction to retrieve',
		displayOptions: {
			show: {
				resource: [
					'transaction',
				],
				operation: [
					'get',
				],
			},
		},
	},

	// ----------------------------------
	//       transaction: getAll
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
					'transaction',
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
					'transaction',
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
