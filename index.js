

const login=()=>{
const userName=document.getElementById("userName").value;
const pass=document.getElementById("pass").value;
if(userName=="admin" && pass=="admin123"){
   

    window.location.href="index.html";
    

}

else
    alert("wrong credencials enter again");


}



const loadCards=(id)=>{
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const container=document.getElementById("card-container");
    container.innerHTML="";

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
data.data.forEach(element => {
    if(id=="btn-open"){
        if(element.status=="open")
            displayCard(element,"add-border-green");



    }
    else if(id=="btn-close"){
        if(element.status=="closed")
            displayCard(element,"add-border-purple");


    }
    else{
         if(element.status=="open")
            displayCard(element,"add-border-green");
        else  if(element.status=="closed")
            displayCard(element,"add-border-purple");
    }

    
});
const count=document.getElementById("count");
count.innerText=container.children.length;

const x=document.getElementById("btn-all");
x.classList.remove("btn-active");
const y=document.getElementById("btn-open");
y.classList.remove("btn-active");
const z=document.getElementById("btn-close");
z.classList.remove("btn-active");
const btn=document.getElementById(id);
btn.classList.add("btn-active");


})
 

}



const displayCard=(data,border)=>{

    const div=document.createElement("div");
    div.innerHTML=`
    <div class="flex flex-col  shadow-md p-6 rounded-2xl bg-white space-y-3">
        <div class="flex justify-between items-center">
        <img src="assets/Open-Status.png" alt="">
        <p class="bg-[#FEECEC] p-2 rounded-xl">${data.priority}</p>
    </div>
    <h2 class=" font-semibold text-[16px]">${data.title}</h2>
    <p class="font-medium text-[12px] text-[#6474BB]">${data.description}</p>
<div class="flex gap-x-3">
   
</div>
<hr>
<p>#${data.id} by ${data.author}</p>
<p> ${data.createdAt}</p>
    </div>
    
    `
loadLabela(data.labels);

 const container=document.getElementById("card-container");
 div.classList.add(border)
 container.append(div);

}



loadCards("btn-all");
