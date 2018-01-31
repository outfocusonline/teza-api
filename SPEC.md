# Teza - API Spec v1

## Endpoints

- `POST /_endpoints/add/<endpoint-name>`
- `POST /_endpoints/remove/<endpoint-name>`
- `POST /_endpoints/deprecate/<version-number>`
- `GET /_endpoints`

#### Force hard delete

- `POST /_purge_all`
   Hard deletes all soft deleted items

## Endpoint model

`POST /_endpoints/add` request should contain the following request body

```javascript
{
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
