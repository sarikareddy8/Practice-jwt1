const express=require('express');
const jwt=require("jsonwebtoken")
//init express
const app=express();

//routes
app.get("/api",(req,res)=>{
    res.json({
        message:'welcome',
        name:'Sarika'
    });
});
//to protect this particular route use jwt
//authData will have user data
app.post("/api/posts",verifytoken,(req,res)=>{
    jwt.verify(req.token,"secretkey",(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({authData,message:"Posts Created"})
        }
    });

});

app.post("/api/login",(req,res)=>{
    const user={
        id:1,
        name:"sarika",
        email:"sarika.k@gmail.com"
    }
    jwt.sign({user},"secretkey",{expiresIn: '30s'},(err,token)=>{
        if(err){
            res.json("forbidden");
        }
        else{
        res.json({token});
        }
    });
});
//format of token
//authorization: Bearer token

//middleware function called verifytoken
function verifytoken(req,res,next){
    //get header
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== "undefined"){
        const bearer=bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token=bearerToken;
        //next middleware
        next();
    }
    else{
        res.sendStatus(403);
    }
   
}

app.listen(5000,()=>console.log("server running at port 5000"))