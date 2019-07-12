import express,{Request,Response} from 'express';
//looks at request if it has mine type  then convert to javascript to use later
import userRouter from './routers/user-router';
import loginRouter from './routers/login-router';
import bodyParser from 'body-parser';

//import catRouter from './routers/cat-router';



//const db = require('./queries');



//create an instance of express by calling express method
const app = express();
//assigning the port number where the server will run
const port = 3000;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/users',userRouter);
app.use('/login',loginRouter);

//Starting a server on port 3000 accessable a localhost:3000
app.listen(port, ()=>{
    console.log(`App Started on port: `+ port);
});
