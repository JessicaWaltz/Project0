
const getLocation = document.getElementById('get-result');

/*************
 * GET USERS *
 *************/
const getUsers = document.getElementById('users-btn');
if(getUsers){
    console.log("herp derp");
    getUsers.addEventListener("click", getUsersFunction);
}
function getUsersFunction(){
    console.log("hoop doop");
    const Http = new XMLHttpRequest();
    const url = `http://localhost:3000/users`;
    Http.open("GET",url,true);
    Http.setRequestHeader("Content-Type","application/json");
    Http.send();
    Http.onload = function(){
        console.log("onload");
    }
    Http.onreadystatechange=function(){
        console.log("hap dap");
        const response = JSON.parse(Http.responseText);
        getLocation.innerHTML= "Attempting to get all users...";
        if(this.readyState === 4){
            if(this.status === 200){
                let temp =
                `<div class="table-holder"><table id="users-display">
                    <tr>
                        <th> User ID </th>
                        <th> Username </th>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Email </th>
                        <th> Role </th>
                    </tr>
                `;
                for(let obj of response){
                    let rolename = ""
                    switch(obj.role){
                        case 1:
                            rolename = "Admin";
                            break;
                        case 2:
                            rolename = "Finance Manager";
                            break;
                        default:
                            rolename = "Default";
                    }
                    console.log("HEY! THE OBJ.ROLE IS " + obj.role + "AND THE ROLENAME IS " + rolename);
                    temp +=
                    `<tr>
                        <td> ${obj.userId} </td>
                        <td> ${obj.username} </td>
                        <td> ${obj.firstName} </td>
                        <td> ${obj.lastName} </td>
                        <td> ${obj.email} </td>
                        <td> ${rolename}</td>
                    </tr>
                    `;
                }
                temp += `</table></div>`
                getLocation.innerHTML = temp;
            }
            else{
                getLocation.innerHTML = JSON.parse(Http.responseText).message;
            }
        }
    }

}
const getUserById = document.getElementById("users-id-btn");
if(getUserById){
    getUserById.addEventListener("click", getUserByIdFunction);
}
function getUserByIdFunction(){
    const Http = new XMLHttpRequest();
    const idNum = document.getElementById("get-by-id").value;
    const url = `http://localhost:3000/users/${idNum}`;
    console.log(url);
    Http.open("GET",url,true);
    Http.setRequestHeader("Content-Type","application/json");
    Http.send();
    Http.onreadystatechange=function(){
        const response = JSON.parse(Http.responseText);
        if (this.readyState === 4){
            if(this.status === 200){
                let rolename = ""
                switch(response.role){
                    case 1:
                        rolename = "Admin";
                        break;
                    case 2:
                        rolename = "Finance Manager";
                        break;
                    default:
                        rolename = "Default";
                }
                getLocation.innerHTML =
                `<div class="table-holder"><table id="users-display">
                    <tr>
                        <th> User ID </th>
                        <th> Username </th>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Email </th>
                        <th> Role </th>
                    </tr>
                    <tr>
                        <td> ${response.userId} </td>
                        <td> ${response.username} </td>
                        <td> ${response.firstName} </td>
                        <td> ${response.lastName} </td>
                        <td> ${response.email} </td>
                        <td> ${rolename} </td>
                    </tr>
                </table></div>`;
            }
            else{
                getLocation.innerHTML = response.message;
            }
        }
    }

}

const getReimbursementsByStatusId = document.getElementById("reimbursement-status-btn");
if(getReimbursementsByStatusId){
    getReimbursementsByStatusId.addEventListener("click", getReimbursementsByStatusIdFunction);
}
function getReimbursementsByStatusIdFunction(){
    const Http = new XMLHttpRequest();
    const statusId = document.getElementById("get-status").value;
    const url = `http://localhost:3000/reimbursements/status/${statusId}`;
    console.log(url);
    Http.open("GET",url,true);
    Http.setRequestHeader("Content-Type","application/json");
    Http.send();
    Http.onreadystatechange=function(){
        const response = JSON.parse(Http.responseText);
        if (this.readyState === 4){
            if(this.status === 200){
                let temp =
                `<div class="table-holder"><table id="reimbursements-display">
                    <tr>
                        <th> ID </th>
                        <th> Author ID </th>
                        <th> Amount </th>
                        <th> Description </th>
                        <th> Submitted </th>
                        <th> Resolved </th>
                        <th> Resolver </th>
                        <th> Status </th>
                        <th> type </th>
                    </tr>
                `;
                for(let obj of response){
                    console.log(obj.userId);
                    let reimbursementType = '';
                    switch(obj.type){
                        case 1:
                            reimbursementType = "Lodging";
                            break;
                        case 2:
                            reimbursementType = "Travel";
                            break;
                        case 3:
                            reimbursementType = "Food";
                            break;
                        default:
                            reimbursementType = "Other";
                    }
                    let statusName = "";
                    switch(obj.status){
                        case 1:
                            statusName = "Pending";
                            break;
                        case 2:
                            statusName = "Approved";
                            break;
                        default:
                            statusName = "Denied";
                    }
                    temp +=
                    `<tr>
                        <td> ${obj.reimbursementId} </td>
                        <td> ${obj.author} </td>
                        <td> ${obj.amount} </td>
                        <td> ${obj.description} </td>
                        <td> ${obj.dateSubmitted} </td>
                        <td> ${obj.dateResolved || 'un-resolved'} </td>
                        <td> ${obj.resolver || 'un-resolved'} </td>
                        <td> ${statusName} </td>
                        <td> ${reimbursementType} </td>
                    </tr>
                    `;
                }
                temp += `</table></div>`
                getLocation.innerHTML = temp;
            }
            else{
                getLocation.innerHTML = response.message;
            }
        }
    }

}

const getReimbursementsByAuthorId = document.getElementById("author-id-btn");
if(getReimbursementsByAuthorId){
    getReimbursementsByAuthorId.addEventListener("click", getReimbursementsByAuthorIdFunction);
}
function getReimbursementsByAuthorIdFunction(){
    const Http = new XMLHttpRequest();
    const authorId = document.getElementById("author-id").value;
    const url = `http://localhost:3000/reimbursements/author/userId/${authorId}`;
    Http.open("GET",url,true);
    Http.setRequestHeader("Content-Type","application/json");
    Http.send();
    Http.onreadystatechange=function(){
        const response = JSON.parse(Http.responseText);
        if (this.readyState === 4){
            if(this.status === 200){
                let temp =
                `<div class="table-holder"><table id="reimbursements-display">
                    <tr>
                        <th> ID </th>
                        <th> Author ID </th>
                        <th> Amount </th>
                        <th> Description </th>
                        <th> Submitted </th>
                        <th> Resolved </th>
                        <th> Resolver </th>
                        <th> Status </th>
                        <th> type </th>
                    </tr>
                `;
                for(let obj of response){
                    console.log(obj.userId);
                    let reimbursementType = '';
                    switch(obj.type){
                        case 1:
                            reimbursementType = "Lodging";
                            break;
                        case 2:
                            reimbursementType = "Travel";
                            break;
                        case 3:
                            reimbursementType = "Food";
                            break;
                        default:
                            reimbursementType = "Other";
                    }
                    let statusName = "";
                    switch(obj.status){
                        case 1:
                            statusName = "Pending";
                            break;
                        case 2:
                            statusName = "Approved";
                            break;
                        default:
                            statusName = "Denied";
                    }
                    temp +=
                    `<tr>
                        <td> ${obj.reimbursementId} </td>
                        <td> ${obj.author} </td>
                        <td> ${obj.amount} </td>
                        <td> ${obj.description} </td>
                        <td> ${obj.dateSubmitted} </td>
                        <td> ${obj.dateResolved || 'un-resolved'} </td>
                        <td> ${obj.resolver || 'un-resolved'} </td>
                        <td> ${statusName} </td>
                        <td> ${reimbursementType} </td>
                    </tr>
                    `;
                }
                temp += `</table></div>`
                getLocation.innerHTML = temp;
            }
            else{
                getLocation.innerHTML = response.message;
            }
        }
    }
}
/*
 <div class = "Get" id = "Get">
        <div class = "title">Get User/Reimbursement</div>

        <form class="get-reimbursement-by-author-form">
            Reimbursement By Author ID: <input id="author-id"type="number" min="1" step="1" value= "1"  />
                                        <input type="submit" id="author-id-btn" value="Search">
        </form>


        <p id = "get-result"><p>
    </div><!--End Class Get-->
 */