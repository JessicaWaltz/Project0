import express,{Request,Response} from 'express';
//looks at request if it has mine type  then convert to javascript to use later
import userRouter from './routers/user-router';
import bodyParser from 'body-parser';

//import catRouter from './routers/cat-router';



//const db = require('./queries');



//create an instance of express by calling express method
const app = express();
//assigning the port number where the server will run
const port = 3000;

//Middleware 
//When requests are recieved by express they pass through layers of middleware
//essentially, express has an array of middleware functions
//when a request is recieved it creates the 'request' and 'response' objects
//then calls the first middleware function with the following parameters
//(request, response, next)
//next is the middleware function

//converts a request body of type application/json to 
//a javascript object and define that at request.body
app.use(bodyParser.json());

//Registering middleware
//app.use(/* middleware function */)
// if we want typing : npm install --only-dev @types/express
//cant do 'response' again without another 'request'
// request.url is /
app.use((request: Request, response: Response ,next) =>{ 
    console.log('Request recieved for' + request.url);
    //response.json({message: "Hello from middleware 1!"});
    next();
});
//another middleware
app.use((request: Request, response: Response ,next) =>{ 
    //response.json({message: "Hello from middleware 2!"});
    next();
});

//Routers - We eill register two routers with the routes: 'cats' and 'food'
//we need to remember to register the routes here
//creating a routers.ts
//app.use('/cats',catRouter);
app.use('/users',userRouter);//finance-manager is allowed role
//get user by id /users/:id

/*app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);*/






//app.use('/login',loginRouter);
//app.use('reimbursements/status',statusRouter);
//

//Starting a server on port 3000 accessable a localhost:3000
app.listen(port, ()=>{
    console.log(`App Started on port: `+ port);
});
//npm start then cntrl + c