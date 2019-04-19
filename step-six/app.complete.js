const express = require('express')
const handlebars = require('express-handlebars')
const r = require('request')
const app = express()
const port = process.env.PORT ? process.env.PORT : 8080

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')
app.use(express.static('static'))

app.get('/', (request, response, next) => {
  response.send('Hello from XKCD-serv! 👋')
})

app.get('/comic', (request, response, next) => {
  if (request.query.id) {
    r(`https://xkcd.com/${request.query.id}/info.0.json`, (error, responseFromAPI, body) => {
      if (error) return next(error)

      console.log(`Response from XKCD website when calling https://xkcd.com/${request.query.id}/info.0.json: ${responseFromAPI} ${responseFromAPI.statusCode}`)
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
    })
  } else {
    response.send('Find a comic by adding a querystring to the current page. For example: tierneyxkcd.azurewebsites.net/comic?id=112')
  }
})

// Error function
app.use((error, request, response, next) => { // Express can tell this is an error handler because we're passing 4 variables to itti
  response.render('error', { error: error })
})

app.listen(port, () => console.log(`Our app is now listening on port ${port}!`))
