import express, {Request, Response} from 'express';
import User from '../models/User';
import * as loginService from '../service/login-service';
//import session from 'express-session';
const loginRouter = express.Router();
/**
 * user submits username and password to log in 
 * respond with the user 
 */
loginRouter.post('',async (request: any, response: Response) => {
 
    const loginfo:User = await loginService.login(request.body);
    if(loginfo.userId){
        request.session.uid = loginfo.userId;
        loginfo.password = "***********";
        response.status(201).json(loginfo);
    }
    else{
        response.status(400).json({message: "Invalid Credentials"});
    }

});
export default loginRouter;