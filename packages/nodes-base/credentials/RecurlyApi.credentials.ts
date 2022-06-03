import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class RecurlyApi implements ICredentialType {
	name = 'recurlyApi';
	displayName = 'Recurly API';
	documentationUrl = 'recurly';
	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			default: '',
		},
	];
}
