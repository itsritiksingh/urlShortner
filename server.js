const express = require("express");
var fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload());
app.use(express.urlencoded({extended:false}))
app.use(express.static("./public"));
app.use(express.json());

const BitlyClient = require("bitly").BitlyClient;
const bitly = new BitlyClient("a57af3cd3c6478a0880ea3390ec1d1245e3b1555");

app.post("/generateLink", (req, res) => {
  const url = req.body.url;

  bitly
    .shorten(url)
    .then(function(result) {
        console.log(result)
       res.json(result);
    })
    .catch(function(error) {
      return res.json(error);
    });
});

app.get('*',(req,res)=>{
    var html = fs.createReadStream('public/index.html');
    html.pipe(res);
})

app.listen(port,()=> console.log('server started'));