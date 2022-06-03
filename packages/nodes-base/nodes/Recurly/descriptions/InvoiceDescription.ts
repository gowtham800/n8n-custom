import {
	INodeProperties,
} from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
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
				description: 'Get an invoice',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all invoices',
			}
		],
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
			},
		},
	},
];

export const invoiceFields: INodeProperties[] = [
	// ----------------------------------
	//       invoice: get
	// ----------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the invoice to retrieve',
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
				operation: [
					'get',
				],
			},
		},
	},

	// ----------------------------------
	//       invoice: getAll
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
					'invoice',
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
					'invoice',
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
