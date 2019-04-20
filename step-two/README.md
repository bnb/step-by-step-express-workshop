# What have we done in this step

We're going to figuring out how Express routing works by exposing a bit of the internal guts. You're going to set up up a new route that we're listening to and are logging the request object in the response to the client.

You can achieve this by using the same syntax we used previously:

```javascript
app.get(<path argument>, <callback function> {
  response.send(<what we want to send back to the client>)
})
```

In this case, we're going to want to use `/comic` as the value for `<path argument>`, and pass in an arrow function that takes `request` and `response` as arguments:

```javascript
app.get('/comic', (request, response) => {
  response.send(<what we want to send back to the client>)
})
```

Finally, we're going to pass the querystring (everything after `?` in the URL) as the response via `request.query`, meaning we're just directly outputting whatever the user is inputting:

```javascript
app.get('/comic', (request, response) => {
  response.send(request.query)
})
```

# Steps

- Add another route, `/comic`
- When the user hits this route, render the querystring that they're passing as a part of the request as the response