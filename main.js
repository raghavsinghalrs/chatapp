const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res,next)=>{
    fs.readFile('file.txt', (err, data)=>{
        if(err){
            console.log(err);
            data = "No message exists"
        }
        res.send(`${data}<form method="post" action="/" onsubmit="document.getElementById('name').value=localStorage.getItem('name')"><input type="text" name="message" id="message" placeholder="message"><input type="hidden" name="name" id="name"><button type="submit">submit</button></form>`);
    })
});

app.post('/', (req, res, next) => {
    try {
        if(req.body.message != undefined) {
            console.log(req.body.name, req.body.message);
            fs.appendFileSync('file.txt', ` ${req.body.name}: ${req.body.message}`);
        }
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/login',(req,res,next) => {
    res.send('<form onsubmit="localStorage.setItem(`name`,document.getElementById(`name`).value)" method="post" action="/"><input type="text" name="name" id="name"><button type="submit">submit</button></form>')
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});