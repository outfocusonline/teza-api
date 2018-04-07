# Teza - API Spec v1

## Endpoints

- `POST /_endpoints/<endpoint-name>`
	Adds a new endpoint
- `POST /_endpoints/<endpoint-name>/edit`
	Edits an endpoint (new endpoint name is received as "name" in request body (see schema below)).
- `DELETE /_endpoints/<endpoint-name>`
	Removes an endpoint
- `POST /_endpoints/<version-number>/retire`
	Retires a version number and on future requests to the API sends a "version currently deprecated" response with status 410.
- `GET /_endpoints`
	Lists all endpoints

#### Force hard delete

- `POST /_purge_all`
   Hard deletes all soft deleted items

## Endpoint schema

`POST /_endpoint` request should contain the following request body along with a bearer token.

```JSON
{
	name: {
		type: String,
		required: true
	},
	model: {
		type: Object,
		required: true
	},
	isUser: {
		type: Boolean,
		required: false
	},
	version: {
		type: Number,
		required: false
	},
	authenticated: {
		type: Boolean,
		required: false
	}
}
```

## Created endpoints

### `POST /_endpoints/<endpoint-name>`

- `GET /<endpoint-name>`
- `GET /<endpoint-name>/<id>`
- `POST /<endpoint-name>`
- `POST /<endpoint-name>/<id>/edit`
- `DELETE /<endpoint-name>/<id>`