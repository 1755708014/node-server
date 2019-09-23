var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')

function staticRoot (staticRoot, req, res) {
  console.log(staticRoot, req.url)
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticRoot, pathObj.pathname)
  fs.readFile(filePath, 'binary', (err, fileContent) => {
    if (err){
      console.log('404')
	  res.writeHead(404)
	  res.end('404 not Found')
	} else {
      console.log('OK')
	  res.writeHead(200)
	  res.write(fileContent, 'binary')
	  res.end()
	}
  })
  console.log(pathObj)
}

var server = http.createServer((req, res) => {
  staticRoot(path.join(__dirname, 'static'), req, res)
})

server.listen(9999)
console.log('Server is running at http://127.0.0.1:9999/')
