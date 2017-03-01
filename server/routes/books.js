// NOTE: The PG (Node Postgres) module sole purpose is to establish connections for SQL queries from Node  & get the response from SQL, Node and the Postgres server.

var express = require('express');
var router = express.Router();
var pg = require('pg'); // NOTE: requires PG
// NOTE: var config's purpose is to let the code know where to connect, which DB
var config = {
  database: 'phi', // NOTE: the name of the database, must use 'database:'
  host: 'localhost', // NOTE: where is your database
  port: 5432, // NOTE: the port number for your database (change here & in Postgres)
  max: 10, // NOTE: how many connections at one time
  idleTimeoutMillis: 30000 // NOTE: 30 seconds to try to connect
};

var pool = new pg.Pool(config); // NOTE: Coming from PG libriary and connects to the DB with '10' connections within this pool which passes in the var-config-object

router.get('/', function(req, res){ // NOTE: continued request from client.js for /books, through app.js, & now looking for '/' within this books // NOTE: Now will run this query to the DB.  Upon successful return, sends 'res.send(result.rows)' back to client.js.
  // NOTE: This will be replaced with a SELECT statement to SQL
  pool.connect(function(errorConnectingToDatabase, client, done){  // NOTE: normally error is'err'
    if(errorConnectingToDatabase) {  // NOTE: There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);  // NOTE: Error to terminal
    } else { // NOTE: We connected to the database!!!
      // NOTE: Query the DB for data
      // NOTE: When choosing a different query & replacing 'SELECT * FROM "books";', NOTE DON"T FORGET NOTE to update the INSERT $1 & $2 parameters.
      client.query('SELECT * FROM "books";', function(errorMakingQuery, result){  // NOTE: SQL statement returned goes here // normally error is 'err'
        done();  // NOTE: A function PG takes care of but if forget this line then will not close connection & DB will not be accessible after 'max: 10' connections reached.
        if(errorMakingQuery) {  // NOTE: If error making query
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          console.log(result);  // NOTE: Logs the entire DB object on terminal. (Comment out if not needed)
          res.send(result.rows);  // NOTE: Sends the DB object sorted in rows to client.js // NOTE: Object that has a property that is an array of objects
        } // NOTE: FOR: else
      }); // NOTE: FOR: client.query
    } // NOTE: FOR: else database connection
  }); // NOTE: FOR: pool.connect(function
}); // NOTE: FOR: router.get(

router.post('/new', function(req, res){
  // NOTE: This will be replaced with an INSERT statement to SQL
  var newBook = req.body; // NOTE: Data property on the app.js/app.post

  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // NOTE: There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // NOTE: We connected to the database!!!
      // NOTE: Now, we're gonna' git stuff!!!!!
      client.query('INSERT INTO books (title, author) VALUES ($1, $2);', [newBook.title, newBook.author], function(errorMakingQuery, result){ // NOTE: Insert into DB // NOTE: 1st parameter is ($1, $2) which 'sanitizes the query' & is there to protect the DB so a user can not delete the DB // NOTE: 2nd parameter is an array & needs to be in order of how you want $1 & $2 to be replaced.
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201); // NOTE: 201=created success // NOTE: sent back to client.js/newBookButton').on('click
        } // NOTE: FOR: else
      }); // NOTE: FOR: client.query(
    } // NOTE: FOR: else
  }); // NOTE: FOR: pool.connect(
}); // NOTE: FOR: router.post(

module.exports = router;
//////////////////////////////////////// NOTE: ///////////////////////////////////////////
// NOTE: Original Code is below //////////////////////////////////////////////////////////
//////////////////////////////////////// NOTE: //////////////////////////////////////////
// var express = require('express');
// var router = express.Router();
// var pg = require('pg');
// var config = {
//   database: 'phi', // the name of the database
//   host: 'localhost', // where is your database
//   port: 5432, // the port number for your database
//   max: 10, // how many connections at one time
//   idleTimeoutMillis: 30000 // 30 seconds to try to connect
// };
//
// var pool = new pg.Pool(config);
//
// router.get('/', function(req, res){
//   // This will be replaced with a SELECT statement to SQL
//   pool.connect(function(errorConnectingToDatabase, client, done){
//     if(errorConnectingToDatabase) {
//       // There was an error connecting to the database
//       console.log('Error connecting to database: ', errorConnectingToDatabase);
//       res.sendStatus(500);
//     } else {
//       // We connected to the database!!!
//       // Now, we're gonna' git stuff!!!!!
//       client.query('SELECT * FROM "books";', function(errorMakingQuery, result){
//         done();
//         if(errorMakingQuery) {
//           console.log('Error making the database query: ', errorMakingQuery);
//           res.sendStatus(500);
//         } else {
//           res.send(result.rows);
//         }
//       });
//     }
//   });
// });
//
// router.post('/new', function(req, res){
//   // This will be replaced with an INSERT statement to SQL
//   var newBook = req.body;
//
//   pool.connect(function(errorConnectingToDatabase, client, done){
//     if(errorConnectingToDatabase) {
//       // There was an error connecting to the database
//       console.log('Error connecting to database: ', errorConnectingToDatabase);
//       res.sendStatus(500);
//     } else {
//       // We connected to the database!!!
//       // Now, we're gonna' git stuff!!!!!
//       client.query('INSERT INTO books (title, author) VALUES ($1, $2);', [newBook.title, newBook.author], function(errorMakingQuery, result){
//         done();
//         if(errorMakingQuery) {
//           console.log('Error making the database query: ', errorMakingQuery);
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(201);
//         }
//       });
//     }
//   });
// });
//
// module.exports = router;
