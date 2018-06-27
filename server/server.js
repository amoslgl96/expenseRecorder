
const path=require('path');

const express=require('express');
const app=express();

const publicPath=path.join(__dirname,'..','public')

const port=process.env.PORT || 3000;
//this is to get access to the port Heroku provides
//if no port provided by heroku, we use 3000 -> for local machine


app.use(express.static(publicPath));



app.get('*', (req,res)=>{
    res.sendFile(path.join(publicPath,'index.html'))
})


//3000: static port -> is ok for local machine 
//however static port is not gonna work on heroku
//Heroku provides a dynamic port, an environment variable
//heroku is the server, they determien the port to use
//so we need to fetch that port 

app.listen(port,()=>{
    console.log('Server is up!');
})

