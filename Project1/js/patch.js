const patchUser = document.getElementById("patch-user-btn");
console.log("WHY?!");
if(patchUser){
    patchUser.addEventListener("click", patchUserFunction);
}
function patchUserFunction(){
    console.log("Yippie!");
}



const patchReimbursement = document.getElementById("patch-reimbursement-btn");
if(patchReimbursement){
    patchReimbursement.addEventListener("click", patchReimbursementFunction);
}
function patchReimbursementFunction(){
    console.log("Wahoo!");
}

/*
<div class = "Patch" id = "Patch">
            <div class = "title">Patch User/Reimbursement</div>

            <div><h3>User</h3> 
                <ul>
                    <li>User ID: <input type="number" min="1" step="1" value= "1"  /></li>
                    <li><input id="check-username" type ="checkbox">Username: <input id="patch-username" type="text"></li>
                    <li><input id="check-password" type ="checkbox">Password: <input id="patch-password" type="password"></li>
                    <li><input id="check-first-name" type ="checkbox">First Name: <input id="patch-first-name" type="text"></li>
                    <li><input id="check-last-name" type ="checkbox">Last Name: <input id="patch-last-name" type="text"></li>
                    <li><input id="check-email" type ="checkbox">Email: <input id="patch-email" type="email"></li>
                    <li><input id="check-role" type ="checkbox">role: <select id="patch-role" name="role">
                                                        <option value="1">Default</option>
                                                        <option value="2">Finance</option>
                                                        <option value="3">Admin</option>
                                                      </select></li>

                </ul>
                <input type="submit"name="patch-user-btn" value="Search">
            </div>
            <div><h3>Reimbursement</h3>
                <div>Reimbursement ID: <input type="number" min="1" step="1" value= "1"  /></div>
                <div>Status: <select name="Status">
                                <option value="1">Pending</option>
                                <option value="2">Approved</option>
                                <option value="3">Denied</option>
                             </select>
                </div>
                <input type="submit"name="patch-reimbursement-btn" value="Search">
            </div>
    </div> 
*/