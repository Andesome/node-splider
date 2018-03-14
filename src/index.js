const http = require("http");

const url = 'http://blog.liaolunling.top';

http.get(url,(res)=>{
  let data = "";

 // A chunk of data has been recieved.
  res.on('data',(chunk)=>{
    data += chunk;
  })


  res.on('end',()=>{
    console.log(data);
  })

}).on('error',(err)=>{
  console.log('Error:err.message');
})
