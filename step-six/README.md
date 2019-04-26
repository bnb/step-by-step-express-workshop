# What have we done in this step

In this step, we're adding Error handling. There are a few options for automatically scaffolding out Express applications (like [`express-generator`](http://npm.im/express-generator)) that will build out more effective error handling, but for this example I wanted to be sure to show you could build your own with minimal effort.

To do this, we need to add a function with four arguments (`(error, request, response, next)`), which will tell Express that this function is error handling middleware.

```
app.use((error, request, response, next) => {
  response.render('error', { error: error })
})
```

In this code example, we're calling Express's `.use()` method and passing the required four callbacks to let Express know we've encoutnered an error. Inside of the method's callback, we're telling Express to redner the `error` Handlebars template, and pass along the `error` argument from the callback as `problem`, which we use in the [`views/error.handlebars`](./views/error.handlebars) file.

Additionally, we need to start passing the `next` argument in the other Express method calls where we want to handle errors`

```javascript
app.get('/', (request, response, next) => {
```

and

```javascript
app.get('/comic', (request, response, next) => {
```

Finally, we want to replace anywhere we would have previously `throw`n errors with `next()`. In our case, as a way to handle errors thrown imediately in our callback to `r`, and wrap our JSON data builder in a `try`/`catch` where the `catch` can return an error if the `try` fails rather than crashing our application.

Here's the change we need to make at the beginning of our `r` callback:

```javascript
    r(`https://xkcd.com/${request.query.id}/info.0.json`, (error, responseFromAPI, body) => {
      if (error) return next(error)
```

And here's our try/catch addition, which just wraps our previous work to reender a `comic` view:

```javascript
      try {
        const bodyToJson = JSON.parse(body)
        const dataToRender = {
          'title': bodyToJson.safe_title,
          'img': bodyToJson.img,
          'desc': bodyToJson.alt
        }
        response.render('comic', dataToRender)
      } catch (error) {
        next(error)
      }
```

Now anytime we encounter an error _while requesting_ data from the XKCD API, an error will throw. This particular trigger is easy to encounter when we pass a comic ID that doesn't exist – for example, `7777777` or `beyonce`.

To wrap things up, we'll add the ability to use the `PORT` environment variable as the port we _should_ run the application on. If `PORT` isn't defined, we fall back to port `8080`. This is the only change required to deploy our app up to Azure AppService \o/

```javascript
const port = process.env.PORT ? process.env.PORT : 8080
```

Here's a general checklist of what you'll need to do to make sure your app will work with the least amount of effort when you deploy to AppService:

- Run your app on the port defined via the `PORT` environment variable
- The value of the `main` property in your `package.json` is the same as the main file of your app
- Your dependencies are all defined in `package.json`

If you have the [Azure App Service](https://aka.ms/app-service-extension) extension for VS Code, you can now right-click on the directory and select "Deploy to Web App" and ship it to prod!