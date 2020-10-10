const express = requiere('express')
const serveStatic = requiere('serve-static')
const path = requiere('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)

console.log('Listening on por: ' + port)