let stuname = document.getElementById("name");
let stuid = document.getElementById("id");
let stuclass = document.getElementById("class");
let stuemail = document.getElementById("email");
let stucontact = document.getElementById("contactNo");
let addbtn = document.getElementById("addbtn");
let existingdiv = document.querySelector(".student-lists");
let clearbtn=document.querySelector(".clearall")
let btnparent=document.querySelector(".btn-section")
let newdiv;


// It is a ValiddateEmail Cheker Method check the valid email id
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// CLear All data once from the Webpage by using the clearbutton
clearbtn.addEventListener("click", function(){
  let userdata=JSON.parse(localStorage.getItem("studentDetails"))??[];
  userdata.splice(0)
    localStorage.setItem("studentDetails",JSON.stringify(userdata));
    location.reload();
})

// Add Student Details in Local Storage by click the Add Button 
function addStudentDetails(e) {
  if(!isNaN(stuname.value)){
    alert("You can't add a number in the name field,Try Again");
    return;
  }
  if((stucontact.value.length>10||stucontact.value.length<10)||stucontact.value===""){
    alert("Contact number should be 10 digits and Fill the Field,Try Again");
    return;
  }
  if(!validateEmail(stuemail.value)){
    alert("Invalid Email,Try Again");
    return;
  }
    if(stuname.value===""|| stuid.value===""|| stuclass.value===""|| stuemail.value===""||stucontact===""){
    alert("Please fill all the fields");
  }
  else{
    let studentDetails=JSON.parse(localStorage.getItem("studentDetails"))??[];
    studentDetails.push(
      {
        "name":stuname.value,
        "id":stuid.value,
        "class":stuclass.value,
        "email":stuemail.value,
        "contactNumber":stucontact.value
      }
    )

    localStorage.setItem("studentDetails",JSON.stringify(studentDetails));
  }
  location.reload();
  e.preventDefault();
}
// Add All StudentDetails in Screen By using the displayAllStudentDetails method
function displayAllStudentDetails(){
  let studentDetails=JSON.parse(localStorage.getItem("studentDetails"))??[];
  studentDetails.forEach((val,idx)=>{
    newdiv = document.createElement("div");
    newdiv.classList.add("student-lists","spanlist")
    for (const key in val) {
      newdiv.innerHTML += `<span>${val[key]}</span>`;
    }
    newdiv.innerHTML=newdiv.innerHTML+`<div class="icons-adjust"><span onclick=editItems(${idx})><i class="ri-pencil-line"></i></span><span onclick=removeItem(${idx})><i class="ri-delete-bin-fill dltbrn"></i></span></div>`
    existingdiv.after(newdiv);
  })
  
}


//call the  displayAllStudentDetails() method here
displayAllStudentDetails();

// Remove data by using the removeItem() method,by clicking the Delete symbol user can delete the particular data
function removeItem(idx)
{  
  let studata=JSON.parse(localStorage.getItem("studentDetails"))??[]; 
  studata.splice(idx,1)
  localStorage.setItem("studentDetails",JSON.stringify(studata));
  location.reload();
}

// Edit All Data By using the editItems() method,in this method when a user click the edit symbol one update button is craeted and whatever changes a user can do and just click the update button to update the data
function editItems(idx){
  let userdata=JSON.parse(localStorage.getItem("studentDetails"))??[];
  stuname.value=userdata[idx].name;
  stuclass.value=userdata[idx].class;
  stuid.value=userdata[idx].id;
  stuemail.value=userdata[idx].email;
  stucontact.value=userdata[idx].contactNumber;
  addbtn.style.display="none"
  let updatebtn=document.createElement("button")
  updatebtn.innerText="Update";
  updatebtn.classList.add("btn-style","reset-btn")
  btnparent.appendChild(updatebtn);
  updatebtn.addEventListener("click",(e)=>{
    if(!isNaN(stuname.value)){
      alert("You can't add a number in the name field,Edit Again");
      return;
    }
    if((stucontact.value.length>10||stucontact.value.length<10)||stucontact.value===""){
      alert("Contact number should be 10 digits and Fill the Field,Edit Again");
      return;
    }
    if(!validateEmail(stuemail.value)){
      alert("Invalid Email,Try Again");
      return;
    }
    if(stuname.value===""|| stuid.value===""|| stuclass.value===""|| stuemail.value===""||stucontact===""){
      alert("Please fill all the fields");
    }
    else{
      e.preventDefault();
      for(let el in userdata[idx]){
        if(el==="name")
        {
         console.log( userdata[idx].name=stuname.value);
        }
        if(el==="id")
        {
          console.log(userdata[idx].id=stuid.value);
        }
        if(el==="class")
        {
          console.log(userdata[idx].class=stuclass.value)
        }
        if(el==="email")
        {
         console.log( userdata[idx].email=stuemail.value)
        }
        if(el==="contactNumber")
        {
          console.log(userdata[idx].contactNumber=stucontact.value)
        }
      }
      localStorage.setItem("studentDetails",JSON.stringify(userdata));
      location.reload();
    }
  })

}


// Add btn by using this button add all data to the local Storage
addbtn.addEventListener("click", addStudentDetails);

