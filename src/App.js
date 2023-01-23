import './App.css';
import React,{ useState,useEffect } from 'react';
import { BiEdit  } from "react-icons/bi";
import { FiTrash2  } from "react-icons/fi";

 
 
const getdata =()=>{
  let getdata = localStorage.getItem('list')
   
  if(getdata){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return[];
  }
}

function App() {
  
  const [User,setUser] =  useState({
    Name:"",
    email:"",
    password:"",
    phone:"" });

    const[data,setdata] = useState(getdata());
    const[togglebtn,settogglebtn] = useState(true);
    const[updatedata,setupdatedata] = useState(null);


    useEffect(() => {
       localStorage.setItem('list',JSON.stringify(data));
    }, [data])
    


    let Name,Value;
const handleInput = (e) =>{
  Name = e.target.name;  
  Value = e.target.value;
  setUser({...User,[Name]:Value});
  
 
}
 

const click = (e) =>{
  e.preventDefault();
  if(!(User.Name,User.email,User.password,User.phone)){
    alert('please fill the data')
  }
  else if((User.Name,User.email,User.password,User.phone) && !togglebtn){
    setdata(
      data.map((elem)=>{
        if(elem.id===updatedata){
          return{...elem,Name:User.Name,Email:User.email,Password:User.password,Phone:User.phone};
        }
        return elem;
      })
    )
    settogglebtn(true);
  setUser({Name:'',email:'',password:'',phone:''}); 
  setupdatedata(null);
 }
  else{
  const newdata = {id:new Date().getTime().toString(), Name:User.Name,Email:User.email,Password:User.password,Phone:User.phone};
  setdata([...data,newdata]);

   setUser({Name:"",
   email:"",
   password:"",
   phone:"" })
  }

}

const deletefn = (id)=>{
  
   let updatedata = data.filter((ele)=>{
    return(ele.id!==id);
  

  })
  
  setdata(updatedata);
  
}



const editfn = (id)=>{
   
  let  editdata = data.find((e)=>{
    return(e.id===id);

  })
  console.log(editdata)
  settogglebtn(false);
  setUser({Name:editdata.Name,email:editdata.Email,password:editdata.Password,phone:editdata.Phone});
   
  setupdatedata(id);
}



  return (
   <>
  
  <h1 className = "login"> Admin Login</h1>

<div className = "big-container">
<form action="" onSubmit={click}   title = 'Submit'>
<div className ="form">
<label htmlFor="text" className = "emailaddress">Name</label>
<input type="text" name="Name" id = "Name" autoComplete='on'
   value = {User.Name} onChange = {handleInput} placeholder = "Enter your name" />
</div>
<div className ="form">
<label htmlFor="text" className = "emailaddress">Email Address</label>
<input type="email" name="email" id = "Email" autoComplete='off'
    value = {User.email} onChange = {handleInput}  placeholder = "Enter your email" />
</div>
<div className ="form">
<label htmlFor="text" className = "emailaddress">Password</label>
<input type="password" name="password" id = "password" autoComplete='off'
    value = {User.password} onChange = {handleInput}  placeholder = "Enter your password" />
</div>
<div className ="form">
<label htmlFor="text" className = "emailaddress">Mobile No.</label>
<input type="mobile" name="phone" id = "phone"  autoComplete='off'
    value = {User.phone} onChange = {handleInput}  placeholder = "Enter your Phone no." />
</div>
  {
   togglebtn?<button className = "login-button" >LogIn</button>:<button className = "login-button" >Update</button>
  }

</form>



<div className = "data-container">
 <div className='smalldatacontainer'>
  {
     data.map((elem)=>{
    return( <><div className='datalist' key = {elem.id}>
  <ul><li><span className='DataHeading'>Name </span>: {elem.Name} , <span className='DataHeading'>Email </span> : {elem.Email} , <span className='DataHeading'>Password </span> : {elem.Password} , <span className='DataHeading'>Phone </span> : {elem.Phone}</li></ul>
  <span className='Edit' title='Edit' onClick={()=>editfn(elem.id,elem.Name,elem.Email,elem.Password,elem.Phone)}><BiEdit/></span>
   <span  className='delete' title='Delete' onClick={()=>deletefn(elem.id)}><FiTrash2/></span>
  </div>
  
   </>
    )
     })
  }
  </div>
</div>
</div>`
   </>
  );
}

export default App;
