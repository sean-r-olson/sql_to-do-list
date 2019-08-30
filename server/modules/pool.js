// require 
const pg = require( 'pg' );

//globals
const Pool = pg.Pool;

config = {
    // Local config
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432,
        max: 12,
        idleTimeOutMillis: 30000
    } //end config

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