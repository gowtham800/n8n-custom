import {
	INodeProperties,
} from 'n8n-workflow';

export const planOperations: INodeProperties[] = [
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
				description: 'Get a plan',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all plans',
			}
		],
		displayOptions: {
			show: {
				resource: [
					'plan',
				],
			},
		},
	},
];

export const planFields: INodeProperties[] = [
	// ----------------------------------
	//       plan: get
	// ----------------------------------
	{
		displayName: 'Plan ID',
		name: 'planId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the plan to retrieve',
		displayOptions: {
			show: {
				resource: [
					'plan',
				],
				operation: [
					'get',
				],
			},
		},
	},

	// ----------------------------------
	//       plan: getAll
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
					'plan',
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
					'plan',
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
