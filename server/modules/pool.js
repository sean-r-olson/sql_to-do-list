// require 
const pg = require( 'pg' );
const url = require('url');

//globals
const Pool = pg.Pool;

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
  
    config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: true, // heroku requires ssl to be true
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
  } else {
    config = {
      host: 'localhost', // Server hosting the postgres database
      port: 5432, // env var: PGPORT
      database: 'weekend-to-do-app', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
  }
  

const pool = new Pool( config );

// db connection
pool.on( 'connect', ()=>{
console.log( 'connected to db' );
}) // end db error
        
pool.on( 'error', ( err )=>{
console.log( 'ERROR connecting to BD:', err );
}) //end db error
        
// exports
module.exports = pool;