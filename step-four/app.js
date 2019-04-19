const express = require('express')
const r = require('request')
const app = express()
const port = 8080

app.get('/', (request, response) => {
  response.send('Hello from XKCD-serv! 👋')
})

app.get('/comic', (request, response) => {
  if (request.query.id) {
    r(`https://xkcd.com/${request.query.id}/info.0.json`, (error, responseFromAPI, body) => {
      if (error) throw error
      console.log(`Response from XKCD website when calling https://xkcd.com/${request.query.id}/info.0.json: ${responseFromAPI} ${responseFromAPI.statusCode}`)
      response.send(body)
    })
  } else {
    response.send('Find a comic by adding a querystring to the current page. For example: https://tierneyxkcd.azurewebsites.net/comic?id=112')
  }a
})

app.listen(port, () => console.log(`Our app is now listening on port ${port}!`))
