const express = require('express');
const path = require('path');
const app = express();
const DB = require('./DB.js');
const PORT = 2222;

app.set('veiw engine','ejs');

/*logic error не проработан*/

const CreatePath = (file) => path.resolve(__dirname,'views',file + '.ejs');

app.use(express.static('style'));
app.use(express.static('script'));
app.use(express.static('img'));

app.use(express.urlencoded({extended:false}));

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
    const date = DB.ShowAll(); 
    res.render(CreatePath('registration'),{date});
});

app.get('/addstudent', (req, res) => {
    res.render(CreatePath('addstudent'));
});

app.post('/addstudent',(req,res)=>{
    DB.WriteDate(req.body);
    res.render(CreatePath('index'));
});

app.listen(PORT,'localhost',()=>{
    console.log('start!');
});
