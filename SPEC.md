# Teza - API Spec v1

## Endpoints

- `POST /_endpoints/add/<endpoint-name>`
	Adds a new endpoint
- `POST /_endpoints/edit/<endpoint-name>`
	Edits an endpoint (new endpoint name is received as "name" in request body (see schema below)).
- `POST /_endpoints/remove/<endpoint-name>`
	Removes an endpoint
- `POST /_endpoints/deprecate/<version-number>`
	Deprecates a version number and sends a "version currently deprecated" response with status 403.
- `GET /_endpoints`
	Lists all endpoints

#### Force hard delete

- `POST /_purge_all`
   Hard deletes all soft deleted items

## Endpoint schema

`POST /_endpoints/add` request should contain the following request body along with a bearer token.

```javascript
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

### `/_endpoints/add/<endpoint-name>`

- `GET /<endpoint-name>`
- `GET /<endpoint-name>/<id>`
- `POST /<endpoint-name>/add`
- `POST /<endpoint-name>/edit/<id>`
- `POST /<endpoint-name>/delete/<id>`

## Examples:

- `POST /_endpoints/add/articles`
- `GET /articles`
- `POST /articles/add`
- `GET /articles/1`
- `POST /articles/add`
- `POST /articles/edit/1`
- `POST /articles/delete/1`
