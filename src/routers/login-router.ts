import express, {Request, Response} from 'express';
import User from '../models/User';
import * as loginService from '../service/login-service';
const loginRouter = express.Router();
loginRouter.post('',async (request: Request, response: Response) => {
    console.log('Atempting to log in');
    const loginfo:Boolean = await loginService.login(request.body);
    if(loginfo){
        console.log('success?');
        response.status(201).json(loginfo);
    }
    else{
        console.log('you have no idea what you are doing do you?');
        response.sendStatus(500);
    }

});
export default loginRouter;