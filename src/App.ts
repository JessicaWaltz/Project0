import express,{Request,Response, Router, response} from 'express';
//looks at request if it has mine type  then convert to javascript to use later
//import session from 'express-session';
import staticRouter from './routers/static-router';
import userRouter from './routers/user-router';
import loginRouter from './routers/login-router';
import reimbursementsRouter from './routers/reimbursements-router';
import bodyParser from 'body-parser';
import { request } from 'https';
import path from 'path';
import { connect } from 'http2';
//let role = 0;
//import catRouter from './routers/cat-router';
var session = require('express-session');


//const db = require('./queries');


//var express = require('express');
var cors = require('cors');
//create an instance of express by calling express method
const app = express();
//assigning the port number where the server will run
const port = 3000;


 
app.use(cors());

app.use(bodyParser.urlencoded({extended : true}));
//lets you add a body in post man
app.use(bodyParser.json());

app.use(session({
    resave: false,
    saveUitialized:true,
    secret: 'my-secret',
    cookie: { secure: false }
}));

app.use('/users',userRouter);
app.use('/login',loginRouter);
app.use('/reimbursements',reimbursementsRouter);
app.use('/',staticRouter);
app.use(express.static(path.join(__dirname,'../Project1')));




app.listen(port, ()=>{
    console.log(`App Started on port: `+ port);
});
