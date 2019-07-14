let LoginID = 0;
let anumber:Number = 5;
export function getUID(){
    return LoginID;
}
export function setUID(id){
    if(typeof(id) === typeof(anumber) && id>0){
        LoginID = id;
    }
    else{
        LoginID = 0;
    }
    return;
}
