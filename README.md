# Technicolor Interview

My answer to Technicolor's Backend Coding Test.

## Q & A

### Why did I choose Node.js, Restify and MongoDB?

I chose MongoDB because it is easier to work with than RDMS for this specific demo. I don't need to worry about schema at all, and it makes prototyping very easy. I chose Node.js and Javascript because I heard this is what Technicolor uses, and I want to demonstrate that I have good experiece with node.js. I chose [Restify](https://github.com/restify/node-restify) as the basis for this API server instead of [express](http://expressjs.com/) or [hapi](http://hapijs.com/) because Restify is a library specifically designed to make restful APIs and it does just enough to get the job done.

### How to handle API versioning?

API versioning is a feature of routing. With Restify, we can do this easily. Please see [Restify API Documentation](http://mcavage.me/node-restify/#routing)'s *Versioned Routes* for more details. I also really like the idea of specifying API version via the `Accept-Version` HTTP header. It makes versioning info orthogonal to other request information, such as query string or url path parameters.

### Pagination?

I ran out of time and did not implement pagination. Here is my plan though:

Pagination information should use HTTP `Range` header. ( Please see [Heroku API design](https://github.com/interagent/http-api-design/issues/36). ) This makes the pagination information orthogonal to other query paramters. I would also not use `offset` / `skip`, instead I would use `lastID`. When constructing the query, we filter out any ID that is smaller than lastID and apply a `limit` to the query. The advantage over `offset` / `skip` is that it prevents shifting when new records are added to the previous ranges.

### IoC?

This project uses [electrolyte](https://github.com/jaredhanson/electrolyte) as a Inversion of Control container to achieve Dependency Injection. It's an overkill for this small application, but I wanted to demonstrate how DI can really decouple this applicaiton and making tests easier.

### No Models?

I've worked with Rail's ActiveRecord for many many years, and I wanted to demonstrate a different approach to data storage called Repository pattern, which I think is probably more suitable for JS and functional programming.

### Deployment?

You can deploy this on Heroku or build a Docker container or use Puppy / Chef to provision this app. But it is out of the scope of this demo.

## Prerequisite

* MongoDB
* Node.js

## Setup

```
npm install
```

## Test

```
npm test
```

## Run

### Create and configure `.env` file

```
cp .env.example .env
```

Then you can configure it to suit your environment.


### Start the server

```
./index.js
```

Note, fixture data is loaded when running in development mode.

## Usage

To see if a user / password pair is authenticated:

```
curl -XPOST \
     -H'Content-Type: application/json' \
     -d'{"username":"alice","password":"changeme"}' \
     'http://localhost:3000/auth' | json
```

To retrieve all programmer users sorted by city:

```
curl 'http://localhost:3000/users?profession=programmer&citysort=-1' | json
```

To check server health:

```
curl 'http://localhost:3000/health' | json
```

To read from a specific dir:

```
curl 'http://localhost:3000/readdir?path=/tmp' | json
```
