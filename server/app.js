const express = require('express');
const app = express();
const configRoutes = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
var path = require('path');
const { decodeToken } = require('./middleware');

const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(cors());


app.use(session({
  name: 'AuthCookie',
  resave: false,
  secret: "Secret",
  saveUninitialized: true
})
);

/**
 * Dummy Validation of session
 */

var public = path.join(__dirname, '/public');
app.use("/public", express.static(public));

/**
 * Middleware Functionality for validating the token
 */
app.use('/services', decodeToken);
app.use('/login', decodeToken);
app.use('/signup', decodeToken);
// app.use('/changeUserPW', decodeToken);
// app.use('/changeUserInfo', decodeToken);

configRoutes(app);

app.listen(port, ()=>{
  console.log(`We've now got a server! on port ${port}`);

});
