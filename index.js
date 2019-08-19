var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
  var pathObj = url.parse(req.url, true)
  if (pathObj.pathname.includes('/api')) {
	console.log(pathObj.pathname === '/api/getInfo')
	switch (pathObj.pathname) {
	  case '/api/getInfo':
		res.end(JSON.stringify({ code: 200, msg: 'getInfo接口获取成功', data: { name: '小二郎' } }))
		break
	  case '/api/list':
		res.end(JSON.stringify({ code: 200, msg: 'list接口获取成功', data: ['西瓜','苹果', '无花果']}))
		break
	  default:
		res.end(JSON.stringify({ code: 500, msg: pathObj.pathname }))
		break
	}
  } else {
	res.end(fs.readFileSync(__dirname + '/sample' + pathObj.pathname))
  }
}).listen(8080)
