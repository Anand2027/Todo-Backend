const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// const { log } = require('console');


app.set("view engine", "ejs");


app.use(express.json());       // to handle json file format
app.use(express.urlencoded({extended:true}));    // to handle form data

app.use(express.static(path.join(__dirname, "public")));     // to handle all images css and all stuff in public folder


// 🔹 express.json() — What does it mean?
// This is a built-in middleware function in Express.

// 👉 Middleware is like a helper function that runs before your route handler. It checks or modifies the request
// yaha par hum log ko views folder bhi banana hai  bhai log

app.get('/',(req,res)=>{
    fs.readdir(`./files`,function(err , files){
         res.render('index',{files: files});         // left of the files is array [nodemon1.txt , nodemon2.txt]   right side of the file is key
       
    });
    
});


app.get(`/file/:filename`, function(req,res){

    fs.readFile(`./files/${req.params.filename}`,"utf-8" ,function(err , filedata){
      res.render('show',{filename : req.params.filename , filedata : filedata});
       
    })
    
})


app.get(`/edit/:filename`, function(req,res){

      res.render('edit', {filename: req.params.filename});
       
})


app.post('/edit',function(req,res){
    // console.log(req.body);     //form ka sara data yha aa jaega guru
     fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}.txt`,function(err){
        res.redirect("/")
    })
})



app.post('/create',function(req,res){
    // console.log(req.body);     //form ka sara data yha aa jaega guru

    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, function(err){
        res.redirect("/")
    })
})





app.post('/delete', function(req, res) {
    const fileToDelete = `./files/${req.body.filename}`;
  
    fs.unlink(fileToDelete, function(err) {
     
      res.redirect('/');
    });
  });
  

app.listen(3001,()=>{
    console.log(`started working on port ${3001}`)
});
  
