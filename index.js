
const loadLabels=(label)=>{
    const htmlElements=label.map(ele=>`<span class="bg-yellow-400 p-2 rounded-xl">${ele}</span>
`)
return htmlElements.join(" ");
}


const manageSpinner=(status)=>{
    if(status==true){
        const container=document.getElementById("card-container").classList.add("hidden");
        const spinner=document.getElementById("spinner").classList.remove("hidden");

    }
    else{
        const container=document.getElementById("card-container").classList.remove("hidden");
        const spinner=document.getElementById("spinner").classList.add("hidden");
    }
}

// modal data display

const showModalData=(id)=>{

const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
fetch(url)
.then(res=>res.json())
.then(data=>{

    const element=data.data;
     const modal=document.getElementById("my_modal_1");
    modal.showModal();
    const modalDetails=document.getElementById("modalDetails");
    modalDetails.innerHTML=`
    
    <div class="flex flex-col p-2.5 gap-y-2.5">
<h1 class="font-bold text-2xl">${element.title}</h1>
<div class="flex gap-x-2">
    <p class="bg-green-400 p-1 text-white rounded-full">${element.status}</p>
    <p class="text-[#64748B]">${element.status} by ${element.author}</p>
    <p class="text-[#64748B]">${element.createdAt}</p>
</div>
<div>
${loadLabels(element.labels)}
</div>
<p class="text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
<div class="flex gap-x-40">
<p class="text-[#64748B]">Assignee: <br> <span class="font-bold text-xl">Fahim Ahmed  </span></p>
<p class="text-[#64748B]">Priority: <br> <span class="bg-red-500 p-1 rounded-full text-black">High</span></p>

</div>
</div>
    
    `



})



   


}

const login=()=>{
const userName=document.getElementById("userName").value;
const pass=document.getElementById("pass").value;
if(userName=="admin" && pass=="admin123"){
   

    window.location.href="home.html";
    

}

else
    alert("wrong credencials enter again");


}



const loadCards=(id)=>{
    manageSpinner(true);
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
     manageSpinner(false);


})
 

}



const displayCard=(data,border)=>{

    const div=document.createElement("div");
    div.innerHTML=`
    <div class="flex flex-col  shadow-md p-6 rounded-2xl bg-white space-y-3" onclick="showModalData('${data.id}')"">
        <div class="flex justify-between items-center">
        <img src="assets/Open-Status.png" alt="">
        <p class="bg-[#FEECEC] p-2 rounded-xl">${data.priority}</p>
    </div>
    <h2 class=" font-semibold text-[16px]">${data.title}</h2>
    <p class="font-medium text-[12px] text-[#6474BB]">${data.description}</p>
<div class="flex gap-x-3">

   ${loadLabels(data.labels)}
</div>
<hr>
<p>#${data.id} by ${data.author}</p>
<p> ${data.createdAt}</p>
    </div>
    
    `


 const container=document.getElementById("card-container");
 div.classList.add(border)
 container.append(div);


}



loadCards("btn-all");
