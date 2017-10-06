var express = require('express');
var http = require('http');
var strftime = require('strftime');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var port = 3000;
var dateObj = {'unix': undefined, "natural": undefined};
//load static index page
app.get('/', (req,res)=>{
	res.sendFile(path.join(__dirname + '/public/index.html'));
	res.end();
})
//request for unix timestamp
app.get('/:unixdate([0-9]*)', (req,res)=> {
	dateObj.unix = new Date(req.params.unixdate * 1000);
	dateObj.natural = strftime('%B %d %Y', new Date(dateObj.unix));
	res.end(JSON.stringify(dateObj));
});
//request for natural timestamp
app.get('/:natDate(((January|Febuary|March|April|May|June|July|August|September|October|November|December)%20[0-9][0-9]%20[0-9][0-9][0-9][0-9]))', (req,res)=>{
	dateObj.natural = req.params.natDate.split('%20').join(" ");
	dateObj.unix = new Date(dateObj.natural).getTime() /1000;
	res.end(JSON.stringify(dateObj));
});
app.get('/[a-zA-Z0-9_ ]*', (req,res)=>{
	dateObj.unix = "undefined";
	dateObj.natural = "undefined";
	res.end(JSON.stringify(dateObj));
})
app.listen(port, ()=>{
	console.log('app listening to port ' + port.toString() + '.');
});