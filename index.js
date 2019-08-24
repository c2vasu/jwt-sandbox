'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');

let express = require('express');
let app = express();

app.use('/', express.static('public'))

// PAYLOAD
let payload = {
  data1: "Srini",
  data2: "age-23",
  data3: "notes",
  data4: "my deep secret value",
};

// PRIVATE and PUBLIC key
// Generated from http://travistidwell.com/jsencrypt/demo/
let privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
let publicKEY = fs.readFileSync('./public/public.key', 'utf8');

let i = 'Sodaletam Incorporation'; // issuer
let s = 'srinivasa@sodavaram.com'; // Subject
let a = 'http://srinivasa.info'; // Audience

let e = "120000"; //expiration time

/**
 * Sign Options
 */
let signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: e,
  algorithm: "RS256"
};

/*
 * JWT Verify Options exactly the same as SignOptions above
*/
let verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: e,
  algorithm: ["RS256"]
};

/**
 * Function USE
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.json());


/**
 *  Method get GENTOKEN
 */
app.get('/genToken', function (req, res) {
  // Generate a token with the PRIVATE KEY
  let token = jwt.sign(payload, privateKEY, signOptions);
  res.json({token});
});

/**
 *  Method get VERIFY
 */ 
app.get('/verify', function (req, res) {

  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (typeof token === "undefined") {
    return res.json({ success: false, message: 'Auth token is not supplied' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, publicKEY, verifyOptions, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Auth token is not valid: ' + err.message });
      } else {
        //req.decoded = decoded;
        return res.json({ success: true, token: decoded});
      }
    }
    );

  } else {
    return res.json({ success: false, message: 'Auth token is not supplied' });
  }
});

/*
 * Method Post LOGIN with request body as payload
 */
app.post('/login', function (req, res) {

  let username = req.body.username;
  let password = req.body.password;

  // call the database to validate password
  let mockUsername = "srini";
  let mockPassword = "mypassword";

  if (typeof username === "undefined" || typeof password === "undefined") {
    return res.status(400).json({ success: false, message: 'Missing required parameters username and password' });
  }

  if (username && password) {
    if (username === mockUsername && password === mockPassword) {
      let token = jwt.sign({ username: username }, privateKEY, signOptions);
      return res.status(200).json({
        success: true,
        message: 'Authentication successful!',
        token: token
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  }
});


// Listen port : 3000
app.listen(3000, function () {
  console.log('My JSON WEB TOKEN listening on port 3000!');
});