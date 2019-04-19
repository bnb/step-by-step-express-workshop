const express = require('express')
const app = express()
const port = 8080

app.get('/', (request, response) => {
  response.send('Hello from Express! 👋')
})

app.listen(port, () => console.log(`Our app is now listening on port ${port}!`))
