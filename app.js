const express = require("express");
const app = express();
const twitter = require("twitter");
const fs = require("fs");
const client = new twitter(JSON.parse(fs.readFileSync("secret.json","utf-8")));
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

const params = {screen_name: 'klavier_piano', count:4};
var tweetsKlavier;

console.log("@" + params.screen_name);
client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
        tweetsKlavier = tweets;
    }
    else {
        console.error(error);
    }
});

app.get("/", (req, res) => {
    res.render('top.ejs', {tweet: tweetsKlavier});
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});