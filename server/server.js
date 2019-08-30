//requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = process.env.PORT || 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
})

//routes: GET, POST, PUT, DELETE

//setup GET route:
//SELECT query
//send rows of data
app.get ('/tasks', (req,res) => {
    console.log( 'in /tasks GET:');
    const query = `SELECT * FROM "tasks";`;
    pool.query(query)
    .then((results) => {
        res.send(results.rows);
    }).catch((err) => {
        console.log('error with SELECT', err);
        res.sendStatus(500);
    })
})

//setup POST route: 
//INSERT INTO query
//send 201 status
app.post( '/tasks', (req,res) => {
    console.log( 'in /tasks POST', req.body);
    const query = `INSERT INTO "tasks" ("tasks") VALUES ($1);`;
    const values = [req.body.tasks];
    pool.query(query, values)
    .then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('error with INSERT:', err);
        res.sendStatus(500);
    })
})

//setup PUT route: 
//UPDATE query
//send 200 status
app.put('/tasks/:id', (req,res)=>{
    console.log('/tasks/:id:', req.params.id, req.body);
    const query = `UPDATE "tasks" SET status=$1 WHERE id=$2;`;
    const values = [req.body.newStatus, req.params.id];
    pool.query(query,values)
    .then((results) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log('error with UPDATE:', err);
        res.sendStatus(500);
    })
})

//setup DELETE route:
//DELETE query
//send 200 status
app.delete( '/tasks/:id', ( req, res )=>{
    console.log( 'in /tasks DELETE:', req.params.id );
    const query = `DELETE FROM "tasks" WHERE id=$1;`;
    const values = [ req.params.id ];
    pool.query( query, values ).then( ( response )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with DELETE:', err );
        res.sendStatus( 500 );
    })
})

