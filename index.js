// index.js
// where your node app starts

// init project
const express = require('express');
const dayjs = require('dayjs')
const app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
    let response = new Date(Date.now())
    //convert response to unix
    responseUnix = Math.floor(response.getTime())
    //convert unix to utc
    const responseUtc = dayjs(responseUnix).format('ddd, DD MMM YYYY hh:mm:ss') + ' GMT'

    res.json({
        unix: responseUnix,
        utc: responseUtc
        })
})

app.get("/api/:date", function (req, res) {
    let unixTimestamp
    if (!parseInt(req.params.date)) {
        return res.json(
            {error: 'Invalid Date'}
        )
    }
    if (req.params.date) {
        unixTimestamp = req.params.date
    } else {
        unixTimestamp = new Date(Date.now())
    }
     //in milliseconds
    const date = new Date(unixTimestamp / 1000) //in seconds
    const dateString = dayjs(date).format('ddd, DD MMM YYYY hh:mm:ss') + ' GMT'
    const successfulDate = {
        unix: unixTimestamp,
        utc: dateString
    }
  res.json(successfulDate)
})

// OK Waiting: A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// OK Waiting: A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
// OK Waiting: A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// ?? Waiting: Your project can handle dates that can be successfully parsed by new Date(date_string)
// Waiting: If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }
// OK Waiting: An empty date parameter should return the current time in a JSON object with a unix key
// OK Waiting: An empty date parameter should return the current time in a JSON object with a utc key

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
