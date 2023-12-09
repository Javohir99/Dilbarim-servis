const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const PORT = 3000;

app.set('veiw engine','ejs');

/*logic error не проработан*/
const CreatePath = (file) => path.resolve(__dirname,'views',file + '.ejs');
const WriteDate = (date)=>{
    fs.open('./date/student.json','w',(err,fd)=>{
        if(err)console.log(err);
        fs.write(fd,date,(err,written,buffer)=>{
            if(err)console.log(err);
        })
        /*fs.read(fd,(err,bytesRead,DBdate)=>{            
            if(err)console.log(err);
            
        });*/
    });
}

app.use(express.static('style'));
app.use(express.static('script'));
app.use(express.static('img'));

app.use(express.urlencoded({extended:false}));

app.post('/addstudent',(req,res)=>{
    WriteDate(req.body)
    res.send(req.body);
});

app.get('/', (req, res) => {
    res.render(CreatePath('index'));
});

app.get('/chart', (req, res) => {
    res.render(CreatePath('chart'));
});

app.get('/students', (req, res) => {
    res.render(CreatePath('students'));
});

app.get('/registration', (req, res) => {
    res.render(CreatePath('registration'));
});

app.get('/addstudent', (req, res) => {
    res.render(CreatePath('addstudent'));
});

app.listen(PORT,'localhost',()=>{
    console.log('start!');
});
