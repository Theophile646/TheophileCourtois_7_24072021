const express = require('express');
const bodyParser = require('body-parser');
//const helmet = require("helmet");
//const cookieSession = require('cookie-session');



const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');


const app = express();

// Access to the API from any origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  /*
// Setting up cookies in http only
app.use(cookieSession ({
  secret: "s3Cur3",
  cookie: {
    secure: true,
    httpOnly: true, 
    domain: 'http://localhost:3000'
  }
})
);
*/

// Parsing of request sent by the client
app.use(bodyParser.json());

// Add extra response header for more security 
//app.use(helmet());

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);



module.exports = app;