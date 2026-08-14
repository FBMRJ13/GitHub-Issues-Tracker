

const login=()=>{
const userName=document.getElementById("userName").value;
const pass=document.getElementById("pass").value;
if(userName=="admin" && pass=="admin123"){
   

    window.location.href="index.html";
    

}

else
    alert("wrong credencials enter again");


}