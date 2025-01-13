import express from 'express'
const app=express()

app.get("/",(req,res)=>{
    res.send(" hlo babe")
})
app.get("/j",(req,res)=>{
    res.send(" hlo j")
})


app.listen(8080,()=>{
    console.log("listen 8080");
    
})
