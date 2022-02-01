const express = require("express");
const exphbs = require ('express-handlebars');

require ('dotenv').config();

const app = new express ();

app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

// Parsing middleware
app.use (express.urlencoded ({ extended: false }));

// Parse application/json
app.use (express.json ());

// Template Engine
app.engine ('hbs', exphbs.engine ( {
    extname: '.hbs'
}));
app.set ('view engine', 'hbs');

// router
const routes = require ('./server/routes/user');
app.use ('/', routes);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});