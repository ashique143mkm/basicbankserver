//server creation
//1.import express
const express=require('express')
const dataservice=require('./service/dataservice')
//import jsonwebtoken
const jwt=require('jsonwebtoken')
//2.create an app using express
const app=express()
//to parse json from
app.use(express.json())
//Application specific middleware
const appMiddleware=(req,res,next)=>
{
    console.log("Application specific middleware");
    next()
}
app.use(appMiddleware)

//4.resolving http request
//GET request-Read data
app.get('/',(req,res)=>{
    res.send("get method")
})
//POST request-Read data
app.post('/',(req,res)=>{
    res.send("post method")
})
//PATCH request-
app.patch('/',(req,res)=>{
    res.send("patch method")
})
//PUT request-
app.put('/',(req,res)=>{
    res.send("put method")
})
//DELETE request

app.delete('/',(req,res)=>{
    res.send("patch method")
})


//3.create port no
app.listen(3000,()=>{
    console.log("Server started at port 3000");
})
console.log(".............");
console.log("Bank Server");
//jwtmiddleware
const jwtmiddleware=(req,res,next)=>{
    try{
    console.log("Router specific middleware");
    const token = req.headers['x-access-token']
    //validate-verify()
    console.log(token);
    const data = jwt.verify(token,'supersecretkey12345')
    console.log(data);
    next()
    }
    catch{
        res.status(422).json({
            statuscode:422,
            status:false,
            message:'please login'
        })
    }
}
//login
app.post('/login',(req,res)=>{
    console.log(req.body);
    const result=dataservice.login(req.body.acno,req.body.pswd)
    res.status(result.statuscode).json(result)
    
    })
//register API-post
//making JSON data request using thunderclient
app.post('/register',(req,res)=>{
console.log(req.body);
const result=dataservice.register(req.body.acno,req.body.username,req.body.password)
res.status(result.statuscode).json(result)
})

//deposit
app.post('/deposit',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result=dataservice.deposit(req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statuscode).json(result)
    })
//withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result=dataservice.withdraw(req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statuscode).json(result)
    })
//transaction history
app.post('/getTransaction',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    const result=dataservice.getTransaction(req.body.acno)
    res.status(result.statuscode).json(result)
    })
//delete
