# Schema to Diagram

This project attempts to solve the task of getting an SQL diagram from an existing schema.

## Demo Screenshots

![Alt text](/screenshots/1.png)
![Alt text](/screenshots/2.png)

## How to use

### Install dependencies

`npm i`

### Run Server

`npm start`

### Making Request

`POST http://localhost:3000/html` and pass as json body:

```json
{
  "host": "DB_HOST_HERE",
  "port": "DB_PORT_HERE",
  "password": "DB_PASSWORD_HERE",
  "user": "DB_USER_HERE",
  "database": "DB_NAME_HERE",
  "schemas": "DB_SCHEMAS_HERE",
}
```

Defaults values are:

```js
{
  host: '0.0.0.0',
  port: '5432',
  user: 'postgres',
  schemas: ['public'],
  database: 'postgres',
  password: 'example',
}
```

## Under the hood

[**pg-structure**](http://www.pg-structure.com/): Library for retrieve schemas from postgres.

[**express**](https://expressjs.com/): Server Framework. It is responsible to connect to your database and retrieve the schema using the library mentioned above.

[**gojs**](https://gojs.net/): Library for visualization. Used for render tables and relationships (diagram itself).

## Limitations

For now, only works with postgres databases.

## How to contribute

**Running development server**

`npm run dev`

## Licence

MIT License

Copyright (c) 2018 Bruno Cascio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
