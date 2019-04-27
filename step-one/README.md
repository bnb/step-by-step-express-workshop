# What have we done in this step

We'll install Express (`npm i express`), and set up an extremely simple web server using Express in `app.js`. This web server will listen to port `8080`, and are responding to a single route (`/`) with a simple message (`Hello from Express! 👋`). Finally, we let ourselves know the app is running by logging a tiny message out to the console.

Let's set up all the variables we'll use (put these at the very top of our `app.js` file):

```javascript
const express = require('express')
const app = express()
const port = 8080
```

Next, we're going to set up a route that will listen to the path browsers default to when they connect to a website. We'll achieve this with Express's `.get()` method, which takes two arguments – a path and a callback function:

```javascript
app.get(<path argument>, <callback function> {
  // this is where we are able to define what we want to do when someone navigates to this path
  response.send(<what we want to send back to the client>)
})
```

So, let's define the path and the arguemnts. In this case, I'm using the arrow function syntax (`(arguments) => {/* do work */}`) for defining a function – normal function syntax (`function (arguments) {/* do work */}`) works equally well here.

```javascript
app.get('/', (request, response) => {
  response.send(<what we want to send back to the client>)
})
```

Let's send a tiny, basic response to the connecting client:

```javascript
app.get('/', (request, response) => {
  response.send('Hello from XKCD-serv! 👋')
})
```

Finally, let's set Express up to actively listen to incoming requests using the `port` and log that when we start the app:

```javascript
app.listen(port, () => console.log(`Our app is now listening on port ${port}!`))
```

## Steps

- Require Express
- Instantiate Express and assign it to `app`
- Set up a variable for the port – we'll use `8080` as the value for that variable
- Set up a single route that listens to the browser's default route + send a very simple response
- Set our app to listen to the port we defined in the variable and log that we're listening