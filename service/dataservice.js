//import jsonwebtoken
const jwt=require('jsonwebtoken')
userDetails ={
  1000:{acno:1000,username:'Anjana',password:1000,balance:5000, transaction:[]},
  1001:{acno:1001,username:'Suneesh',password:1001,balance:5000,transaction:[]},
  1002:{acno:1002,username:'Rishita',password:1002,balance:5000,transaction:[]}
}
//register
const register=(acno,username,password)=>
  {
    
    if(acno in userDetails)
    {
      return {
        statuscode:401,
        status:false,
        message:'User already exist..Please login'
      }
    }
    else{
      userDetails[acno]={
        acno,
        username,
        password,
        balance :0,
        transaction:[]
      }
      
console.log(userDetails);

      return {
        statuscode:201,
        status:true,
        message:"Successfully registered"
      }
    }
  }
  //login
  const login=(acno,pswd)=>
  {
 
 if(acno in userDetails)
 {
  if(pswd==userDetails[acno].password)
  {
    currentuser=userDetails[acno].username
  currentAcno=acno
  //token generation
const token=jwt.sign({
  currentAcno:acno
},'supersecretkey12345')
 return {
  statuscode:201,
  status:true,
  message:"Successfully logged in",
  currentuser,
  currentAcno,
  token
 }
 }
  else
  {
    return {
      statuscode:401,
      status:false,
      message:'Password incorrect'
    }
  }
}
 else{
  
  return {
    statuscode:401,
    status:false,
    message:'Account does not exist'
  }
 }
}
//deposit
const deposit=(acno,pswd,amt)=>
{
  
  var amount=parseInt(amt)
  if(acno in userDetails)
  {
if(pswd==userDetails[acno].password)
{
  userDetails[acno].balance+=amount
  userDetails[acno]['transaction'].push({
    type:'credit' , 
      amount
  })
  
  console.log(userDetails);
  return {
    statuscode:201,
    status:true,
    message:`${amount}is credited and new balance is ${userDetails[acno].balance}`
  
   }
  }

else{
  
  return {
    statuscode:401,
    status:false,
    message:'Password incorrect'
  }
}

  }
  else{
    
    return {
      statuscode:401,
      status:false,
      message:'Account does not exist'
    }
  }
}
//withdraw
const withdraw=(acno,pswd,amt)=>{


  var amount=parseInt(amt)
  if(acno in userDetails)
  {
if(pswd==userDetails[acno].password)
{
  if(userDetails[acno].balance>amount)
  {
  userDetails[acno].balance-=amount
  userDetails[acno]['transaction'].push({
    type:'DEBIT' , 
      amount
  })
  
  console.log(userDetails);

  return {
    statuscode:201,
    status:true,
    message:`${amount}is debited and new balance is ${userDetails[acno].balance}`
  
   }
  
  
  }
else{
    
    return {
      statuscode:401,
      status:false,
      message:'Insufficient balance to withdraw'
    }
  }
}
  
else{
  
  return {
    statuscode:401,
    status:false,
    message:'Password incorrect'
  }
}
  }
else
{
    return{
    statuscode:401,
    status:false,
    message:'User does not exist'
  }
}
}
const getTransaction=(acno)=>
{
  if(acno in userDetails)
  {
  return {
    statuscode:201,
    status:true,
    transaction:userDetails[acno]['transaction']
  
   }}
   else{
    return{
      statuscode:401,
      status:false,
      message:'User does not exist'
   }
}}
  //export all function-last inside a file
  module.exports={register,
    login,
  deposit,
withdraw,
getTransaction}