# What have we done in this step

In this step, we start parsing the JSON response we're getting from the URI `request` is reaching out to. We are also introudce a very basic JS templating language – called `hanlebars` – into our application that allows us to seperate application logic from what we're serving to the user.

The first, we need to add `express-handlebars` to our application. Once again, this can go at the top:

```javascript
const handlebars = require('express-handlebars') // pull in the express-handlebars dependency
```

Next, we need to define express-handlebars as an engine and then set it as our default view engine:

```javascript
app.engine('handlebars', handlebars()) // set up handlebars as an engine
app.set('view engine', 'handlebars') // set handlebars as our default view engine
```

We've gone ahead and created a `views` directory with our first view – `comic.handlebars` – that we then render when someone hits the `/comic` path in our application. Since we're mainly focusing on Node.js and Express here, this is a bit outside of the scope of the workshop and we won't have you duplicate this work every time. If you'd like to look at what's in there, I highly encourage you to peek into `/views` to see the basic HTML we've written in the templates!

Next, we've added a few lines to the Request query to parse out the data we're getting back from the API. We pull a few properties on the JSON object into our own JSON object of data to render, and then responding to the client by rendering our `comic` template and passing in that data to the template:

```javascript
      const bodyToJson = JSON.parse(body) //parse the JSON we're getting from the API
      const dataToRender = { // assign a few specific bits of the parsed JSON to semantically named values
        'title': bodyToJson.safe_title, // title of the comic
        'img': bodyToJson.img, // comic image
        'desc': bodyToJson.alt // comic description
      }
      response.render('comic', dataToRender) // respond to the connecting client with the 'comic' handlebars template, and pass the dataToRender object
```

# Steps

- Add `express-handlebars to our aplication
- Define the `handlebars` engine with `app.engine()`
- Set the `view engine` to `handlebars` with `app.set`
- Created `/views` and added a single template, `comic.handlebars`
- Parse the JSON we're getting back from the API
- Build a new object that only contains the JSON we need to render our view correctly
- Send our response, rendering the `comic` handlebars template and passing in that new object with the data to render
