# What have we done in this step

Now that we understand that the express `request.query` object (where `request` is the name of the request object you've included in your `app.get()` callback), we can start using that to query the API we're hitting – the XKCD website, whcih provides a JSON object for every comic.

We need to start by introducing `request` to our application – this can go at the top of the file, with our other variables:

```javascript
const r = require('request')
```

Next, we'll add an if/else in the `/comic` route's callback to detect if there's an `id` property in the querystring:

```javascript
  if (request.query.id) {
    // do work if there's a querystring with a key of `id`
  } else {
    // if there's not, send a basic message instructing the user on what to do
    response.send('Find a comic by adding a querystring to the current page. For example: https://tierneyxkcd.azurewebsites.net/comic?id=112')
  }
```

Next we'll begin accessing the data we're going to be using to build our site by using the Request module (we've assigned it to `r` in this case to hopefully help avoid confusion with the request in request/response) to reach out to XKCD API.

The Request module takes two parameters: a URL to fetch and a callback with three propperties (a variable for the error, a variable for the respose from the APPI, and the body returned by the API).

Here's that change, adding the call to `r()` inside of the `if(request.query.id)` block:

```javascript
  if (request.query.id) {
    r(`https://xkcd.com/${request.query.id}/info.0.json`, (error, responseFromAPI, body) => {
      // do work with the response from the request
    })
  } else {
    response.send('Find a comic by adding a querystring to the current page. For example: https://tierneyxkcd.azurewebsites.net/comic?id=112')
  }
```

Next, let's do some work with what Request returns. Specifically:

- let's `throw` if an error occurs
- let's log the response + the status code we get back
- let's send what we got as a resposne from the API

```javascript
  if (request.query.id) {
    r(`https://xkcd.com/${request.query.id}/info.0.json`, (error, responseFromAPI, body) => {
      if (error) throw error // throw if there's an error

      console.log(`Response from XKCD website when calling https://xkcd.com/${request.query.id}/info.0.json: ${responseFromAPI} ${responseFromAPI.statusCode}`) // let's log the response + the status code we get back

      response.send(body) // let's send what we got as a resposne from the API
    })
  } else {
    response.send('Find a comic by adding a querystring to the current page. For example: https://tierneyxkcd.azurewebsites.net/comic?id=112')
  }
```

Interestingly, because we're directly sending the response from the XKCD website without any additional modification (via `response.send(body)`), we've actually created an extremely basic reverse proxy – a powerful tool that can be used to seamlessly transition back-ends from one tool, language, or platform to another.