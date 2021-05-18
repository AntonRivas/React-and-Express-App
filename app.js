const express = require('express')
const fs = require('fs')
const unirest = require('unirest')
const app = express()
const port = 3001


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/api/associations/:word', (req, res) => {
  const request = unirest("GET", "https://twinword-word-associations-v1.p.rapidapi.com/associations/");

  //getting the api key synchronously instead of async method
  try {
  const apikey = fs.readFileSync('./api-key.txt', 'utf8')

  console.log("Got this far") //Also Works

  //console.log(`The apikey is ${apikey}`) //This throws an error "apikey is not defined"
  console.log(typeof(apikey))

  request.query({ "entry": req.params.word });
  request.headers({
    "x-rapidapi-host": "twinword-word-associations-v1.p.rapidapi.com",
    "x-rapidapi-key": apikey.replace(/\s/g, ''),
    "useQueryString": true
  });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    res.json(response.body.associations_scored || {});
  });

  }
  catch (err) {
  console.error(err) //This works too
  }



});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
