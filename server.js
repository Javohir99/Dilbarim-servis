const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = 4000;
const mysql = require('mysql');
const methodOverride = require('method-override');

let course = '';

fs.readFile('./date/course.json', 'utf8', (err, data) => {
  if(err){
    console.log(err);
  }
  course = JSON.parse(data);
});
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'javoxir',
  password : '9393',
  database : 'students'
});
connection.connect((err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log('Охуенно!');
  }
})
app.set('veiw engine','ejs');

/*logic error не проработан*/

const CreatePath = (file) => path.resolve(__dirname,'views',file + '.ejs');

app.use('/style',express.static(__dirname + '/style'));
app.use('/script', express.static(__dirname + '/script'));
app.use('/img', express.static(__dirname + '/img'));

app.use(methodOverride('_method'));

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
  connection.query(`SELECT * FROM REGISTRATION;`,(error, results, fields)=>{
    if(error){
      console.log(error);
    }
    res.render(CreatePath('registration'),{results,course});
  });
  
});

app.get('/addstudent', (req, res) => {
    res.render(CreatePath('addstudent'),{course});
});


app.delete('/registration/:id', async (req, res) => {
  connection.query('DELETE FROM REGISTRATION WHERE ID=?',[req.params.id],(error,results,fields)=>{
    if(error){
      console.log(error);
    }
    res.sendStatus(200);    
  });

});

app.get('/edit/:id',(req,res)=>{
    let student;
    connection.query(`SELECT * FROM REGISTRATION WHERE ID = ${req.params.id};`,(error,results,fields)=>{
      if(error){
        console.log(error);
      }
      res.render(CreatePath('editstudent'),{results,course});  
    });
    
})
app.post('/addstudent',(req,res)=>{
    connection.query(`INSERT INTO REGISTRATION SET 
      LastName = ?, 
      FirstName = ?, 
      Phone = ?, 
      Course = ?,
      Advertising=?, 
      Adress = ?, 
      Status=?,
      Comment=?
      `,
      
      [
        String(req.body.lastname).toLowerCase(),
        String(req.body.firstname).toLowerCase(),
        JSON.stringify([req.body.phone,req.body.phone2]),
        req.body.course=='etc'?req.body.courseetc:req.body.course,
        req.body.adv == 'etc'?req.body.advetc:req.body.adv,
        req.body.adress,
        'R',
        req.body.comment
      ],
      (err,result,fields)=>{
      if(err){
        console.log(err);
      }
    });  
    res.render(CreatePath('index'));
});

app.listen(PORT,()=>{
    console.log('start!');
});