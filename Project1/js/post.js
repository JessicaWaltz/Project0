const postReimbursement = document.getElementById("post-btn");
if(postReimbursement){
    postReimbursement.addEventListener("click", postReimbursementFunction);
}
function postReimbursementFunction(){
    const reimbursementAmount = document.getElementById('post-amount');
    const reimbursementDescription = document.getElementById('post-description');
    const reimbursementType = document.getElementById('post-type');
    const location = document.getElementById("post-result");
    console.log(`Good so far... ${reimbursementAmount.value}, ${reimbursementDescription.value}, ${reimbursementType.value}`);

    if(reimbursementAmount.value && reimbursementDescription.value && reimbursementType.value){
        console.log("All information is good...")
        document.getElementById("post-result").innerHTML = "posting reimbursement please wait...";
        const Http = new XMLHttpRequest();
        const url = `http://localhost:3000/reimbursements`;
        const data = {
            amount: reimbursementAmount.value,
            description: reimbursementDescription.value,
            type: reimbursementType.value
        }
        console.log(JSON.stringify(data));
    
        Http.open("POST",url);
        Http.setRequestHeader("Content-Type","application/json");
        Http.send(JSON.stringify(data));
        Http.onload = function(){
            console.log("onload");
        }
        Http.onreadystatechange=function(){
            const response = JSON.parse(Http.responseText);
            if(this.readyState === 4){
                if(this.status === 400){
                    location.innerHTML = JSON.parse(Http.responseText).message;
                }
                else if(this.status === 401){
                    location.innerHTML = JSON.parse(Http.responseText).message;
                }
                else{
                    location.innerHTML = `Your reimbursement has been submited: <br>
                                            Reimbursement Id: ${response.reimbursementId}<br>
                                            Author Id: ${response.author}<br>
                                            Amount: ${response.amount}<br>
                                            Description: ${response.description} <br>
                                            Date Submited: ${response.dateSubmitted}<br>
                                            Date Resolved: ${response.deateResolved || 'un-resolved'}<br>
                                            Resolver: ${response.resolver ||'un-resolved'}<br>
                                            Status: ${response.status}<br>
                                            type: ${response.type}<br>`;
                }
            }
        }
    }
    else{
        location.innerHTML = "Please fill out all required fields";
    }
}