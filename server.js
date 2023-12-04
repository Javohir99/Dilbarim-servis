const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const CreatePath = (file) => path.resolve(__dirname,'views',file + '.ejs');  
app.use(express.static('style'));
app.use(express.static('script'));
app.use(express.static('img'));


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
app.listen(port,'localhost',()=>{
    console.log('start!');
})