var readline = require('readline');
var os = require('os')
const chalk = require('chalk');
// The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time
var fs = require('fs');
var path = require('path');
var events = require('events');
var e = new events.EventEmitter();
var userPath = path.join(__dirname, 'users')
console.log(userPath)

var mainObj = {
	'exit': 'Allows you to end the terminal session. Takes in argument 0 for normal exit.',
	'date': 'Returns the current date for the system',
	'help': 'Provides a syntax/usage for the required command',
	'stats': 'Returns system stats such as CPU count, free memory etc.',
	'list users': 'Returns a list of user objects',
	'man': 'Manual pages for various commands'
}

var helpObj = {
	'ls' : 'For each operand that names a file of a type other than directory, ls displays its name as well as any requested, associated information.',
	'rm': 'rm stands for ‘remove‘ as the name suggests rm command is used to delete or remove files and directory in UNIX like operating system.',
	'mv': '(short for move) is a command that moves one or more files or directories from one place to another.',
	'cd': 'This command allows you to change user directory'
}

// Event emitters
e.on('exit', (val) => {
	process.exit(0);
})

e.on('date', () => {
	hrline()
	console.log(`${whitespace(80)} ${chalk.blue.bold(`DATE`)} ${whitespace(80)}`)
	verticalpadding()
	verticalpadding()
	hrline()
  console.log(`${whitespace(70)} System time is: ${new Date().toLocaleTimeString()}`);
})

e.on('help', () => {
	hrline()
	console.log(`${whitespace(80)} ${chalk.yellow.bold(`HELP`)} ${whitespace(80)}`)
	verticalpadding()
	verticalpadding()
	hrline()
  for (var key in helpObj) {
		console.log(whitespace(20), chalk.yellow.bold(key), whitespace(10), chalk.yellow(helpObj[key]), verticalpadding())
	}
})

e.on('stats', () => {
	hrline()
	console.log(`${whitespace(80)} ${chalk.red.bold(`STATS`)} ${whitespace(80)}`)
	verticalpadding()
	verticalpadding()
	hrline()
  console.log(`${whitespace(50)} ${chalk.magenta.bold(`Free memory in bytes:`)} ${whitespace(30)} ${os.freemem()}` + os.EOL);
  console.log(`${whitespace(50)} ${chalk.magenta.bold(`System uptime (in seconds):`)} ${whitespace(24)} ${os.uptime()}` + os.EOL);
  console.log(`${whitespace(50)} ${chalk.magenta.bold(`CPU`)} ${whitespace(47)}  ${os.cpus()[0].model}`);

})

e.on('list users', () => {
  hrline()
	console.log(`${whitespace(80)} ${chalk.red.bold(`USERS`)} ${whitespace(80)}`)
	verticalpadding()
	verticalpadding()
	hrline()

	fs.readdir(userPath, (err, fd) => {
		if(err) return console.log(err);
		fd.forEach((file,obj) =>  {
			var newData = ''
			fs.readFile(userPath + `/${file}`, (err,result) => {
				if(err) return console.log(err);
				var newResult = JSON.parse(result);
				var pData = `${whitespace(30)} ${chalk.blue.bold(`Name:`)} ${newResult.name} ${whitespace(20)} ${chalk.blue.bold(`Age:`)} ${newResult.age}  ${whitespace(20)} ${chalk.blue.bold(`Email:`)} ${newResult.email}`
				console.log(pData);
			})
		});
	})
})

e.on('man', () => {
	hrline()
	console.log(`${whitespace(80)} ${chalk.cyan.bold(`MANUAL`)} ${whitespace(80)}`)
	verticalpadding()
	verticalpadding()
	hrline()
  // console.log(`Welcome to CLI man pages. Here are some frequently used commands:` + os.EOL)
  for (var key in helpObj) {
		console.log(whitespace(20), chalk.cyan.bold(key), whitespace(10), chalk.cyan(helpObj[key]), verticalpadding())
	}
})
		var array = ['help', 'man', 'list users', 'exit', 'date', 'stats'];


var cli = {};
	var width = process.stdout.columns;
	// console.log(width)

	// To print horizontally
	function hrline() {
		var newWidth = '';
		for(var i=0; i<width; i++) {
			newWidth += '-'
		}
		console.log(newWidth)
	}

	var str = "CLI Commands"
	var len = (str.length)
	var padding = Math.floor((width - len)/2);
	// console.log(padding);

	hrline()
	verticalpadding()
	verticalpadding()
	// Function declaration
	function verticalpadding() {
		var space = '';
		for (var j=0; j<padding; j++) {
			space += ' '
		}
		console.log(space)
		return ''
		// console.log(space)
	}

	// To center element
	centerelement()
	function centerelement() {
		var space = '';
		for (var j=0; j<padding; j++) {
			space += ' '
		}
	console.log(space + chalk.red.bold(str))
	return ''
	}

	verticalpadding()
	verticalpadding()
	hrline()

	// function leftpadding() {
	// 	var space = '';
	// 	for (var k=0; k<30; k++) {
	// 		space += ' ' 
	// 	}
	// 	 console.log(space)
	// 	 return space;
	// 	}	

		function whitespace(len,key) {
			var pad = ''
			for (var i=0; i<len; i++) {
				pad += ' '
			}
			console.log(pad)
			return pad;
		}
	
	for (var key in mainObj) {
		console.log(whitespace(40), chalk.green.bold(key), whitespace(40), chalk.green(mainObj[key]), verticalpadding())
	}

	cli.commandsArray = () => {
		var array = ['help', 'man', 'list users', 'exit', 'date', 'stats'];
	}

	cli.processInput = (val) => {
		var matchFound = false;
		var array = ['help', 'man', 'list users', 'exit', 'date', 'stats'];

		array.some(input => {
			if(val.toLowerCase().indexOf(input) > -1) {
				matchFound = true;
				e.emit(input, val)
			}
		})
		if(!matchFound) { 
			console.log('match not found')
		}
	}

	verticalpadding()
	cli.init = () => {
		cli.commandsArray()
	  // console.log('CLI is running');
		const rl = readline.createInterface({ //this is an event emitter
			input: process.stdin,
			output: process.stdout,
			prompt: "Enter the predefined key:"
		})
		rl.prompt()
		rl.on('line', (input) => {
			cli.processInput(input)
			// console.log(`Received: ${input}`);
			rl.prompt()
		})

	};

module.exports = cli;