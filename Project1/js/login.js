let firstName = "";
let lastName = "";
let userID = 0;
let username = "";
let role = 0;//check role for what you should display
/**
 * role = 0 -- display only log in
 * role = 1 -- Admin display patch user, post reimbursement, get user by ID
 * role = 2 -- Finance Manager get users,user by id, 
 * role = 3 -- Default user
 */
var login = document.getElementById("login-btn");


const views = {};
views.login = document.getElementById("login-btn");
if(login){
    
    login.addEventListener("click", loginUser);
}
function loginUser() {
    document.getElementById("login-result").innerHTML = "loging you in please wait...";
    const Http = new XMLHttpRequest();
    const url = `http://localhost:3000/login`;
    const un = document.getElementById('login-username');
    const pw = document.getElementById('login-password');
    const data = {
        username: un.value,
        password: pw.value
    }
    console.log(JSON.stringify(data));
    
    Http.open("POST",url);
    Http.setRequestHeader("Content-Type","application/json");
    Http.send(JSON.stringify(data));
    Http.onload = function(){
        console.log("onload");
    }
    Http.onreadystatechange=function(){
        const location = document.getElementById("login-result");
        if(this.readyState === 4){
            if(this.status === 400){
                location.innerHTML = JSON.parse(Http.responseText).message;
            }
            else{
                userID = JSON.parse(Http.responseText).userId;
                firstName = JSON.parse(Http.responseText).firstName;
                lastName = JSON.parse(Http.responseText).lastName;
                location.innerHTML = `Welcome ${firstName} ${lastName} your ID is ${userID}`;
            }
        }
        
    }
}
