var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var userPath = path.join(__dirname, 'users');

var server = http.createServer();

server.on('request', (req, res) => {
    var parsed = url.parse(req.url, true);
    console.log(req.url)
    console.log(parsed);
    var data = '';
    req.on('data', (chunk) => {
       data += chunk;
       // console.log(data)
    });
    req.on('end', () => {
      if(req.method === 'POST') {
          var userData = JSON.parse(data);
          fs.open(userPath + "/"+ userData.username+ '.json', 'wx', (err, fd) => {
              if(err) return res.end(err);
              fs.writeFile(fd, data, err => {
                  if(err) res.end(err);
                  fs.close(fd, (err) => {
                      res.end(data);
                  });
              })
          })
      }
// POST: localhost:4000/users?username=srijan

      if(req.method === 'GET') {
      	var userName = parsed.query.username;
      	fs.readFile(userPath + '/'+userName+ '.json', (err, data) => {
      		if(err) return console.log(err);
      			console.log(data.toString())
      			res.end();
      		})
      }  

       if(req.method === 'PUT') {
       	var userName = parsed.query.username;
       	fs.open(userPath + '/' +userName+ '.json', 'r+', (err, fd) => {
				if(err) return console.log(err);
					fs.ftruncate(fd, 0 , (err) => {
						if(err) return console.log(err);
						fs.writeFile(fd, JSON.stringify(data), (err) => {
							console.log(data)
							if(err) return console.log(err)
								fs.close(fd, (err) => {
									if(err) return console.log(err)
										res.end();	
							})
					})
				})
			})
 		 }

 		 if(req.method==='DELETE') {
 		 	var userName = parsed.query.username;
 		 	fs.unlink(userPath + '/' +userName+ '.json', err => {
 		 		if(err) return console.log(err);
				console.log(userPath + '/' +userName+ '.json'+ ' was deleted');
				res.end();
 		 	})
 		 }

	});

})

server.listen(4000, () => {
    console.log("server started at port 4000");
})