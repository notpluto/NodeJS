// Create Operation
// fd: file identifier

var fs = require('fs');
var path = require('path');
var userPath = path.join(__dirname, 'users')
// console.log(__dirname);

var data = {
	name: 'James',
	email: 'james.bond@mi6.com',
	age: '37',
	username: 'bond07',
}

var data2 = {
	name: 'Bruce',
	email: 'brucewayne@batman.com',
	age: 32,
	username: 'batman'
}

// fs.open(userPath + '/user1.js', 'wx', (err,fd) => {
// 	if (err) return console.log(err);
// 	console.log(fd)
// 		fs.writeFile(fd, JSON.stringify(data), (err) => {
// 		if(err) return console.log(err);
// 			fs.close(fd, (err) => {
// 			if(err) return console.log(err)
// 		})
// 	})
// })


// Read Operation

// fs.readFile(userPath + '/user1.js', (err, data) => {
// 	if(err) return console.log(err);
// 	// console.log(JSON.stringify(data));
// 	console.log(data.toString());
// })

// Update Operation 
fs.open(userPath + '/user1.js', 'r+', (err, fd) => {
	if(err) return console.log(err);
	fs.ftruncate(fd, 0 , (err) => {
		if(err) return console.log(err);
		fs.writeFile(fd, JSON.stringify(data2), (err) => {
			if(err) return console.log(err)
				fs.close(fd, (err) => {
					if(err) return console.log(err)
			})
		})
	})
})

// Delete a user

// fs.unlink(userPath + '/user1.js', (err) => {
	// if(err) return console.log(err);
	// console.log(userPath + '/user1.js' + ' was deleted');
// })
