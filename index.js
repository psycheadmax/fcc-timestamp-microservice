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

const dateFormat = 'ddd, DD MMM YYYY HH:mm:ss [GMT]'

app.get("/api", function (req, res) {
    const date = new Date()
    const responseUnix = dayjs(date).valueOf()
    const responseUtc = dayjs(date).format(dateFormat)

    res.json({
        unix: responseUnix,
        utc: responseUtc
        })
})

app.get("/api/:date?", function (req, res) {
    const paramDate = req.params.date
    const isUnixDate = /^\d+$/.test(paramDate)
    let unixTimestamp
    let dateString

    if (!parseInt(paramDate)) {
        return res.json(
            {error: 'Invalid Date'}
        )}

    if (isUnixDate) {
        unixTimestamp = parseInt(paramDate)
        dateString = dayjs(new Date(unixTimestamp)).format(dateFormat)
    } else {
        unixTimestamp = dayjs(paramDate).valueOf()
        dateString = dayjs(paramDate).format(dateFormat)
    }

    const successfulDate = {
        unix: unixTimestamp,
        utc: dateString
    }

  res.json(successfulDate)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
