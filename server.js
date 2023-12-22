const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = 4000;
const mysql = require('mysql');
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
  connection.query(`SELECT * FROM RIGISTRATION;`,(error, results, fields)=>{
    if(error){
      console.log(error);
    }
    res.render(CreatePath('registration'),{results,course});
  });
  
});

app.delete('/registration/:id', async (req, res) => {
  connection.query('DELETE FROM RIGISTRATION WHERE ID=?',[req.params.id],(error,results,fields)=>{
    if(error){
      console.log(error);
    }
    res.sendStatus(200);    
  });
  /*
  const id = req.params.id;
  processingQueue.push(id);

  if (processingQueue.length === 1) {
    await processNextRequest();
  }*/

});


app.get('/addstudent', (req, res) => {
    res.render(CreatePath('addstudent'),{course});
});


app.post('/addstudent',(req,res)=>{
    connection.query(`INSERT INTO RIGISTRATION SET 
      LastName = ?, 
      FirstName = ?, 
      Phone = ?, 
      Course = ?,
      Advertising=?, 
      Adress = ?, 
      Status=?`,
      [
        String(req.body.secondname).toLowerCase(),
        String(req.body.firstname).toLowerCase(),
        JSON.stringify([req.body.phone,req.body.phone2]),
        req.body.course=='etc'?req.body.courseetc:req.body.course,
        req.body.adv == 'etc'?req.body.advetc:req.body.adv,
        req.body.adress,
        'Регистрирован'
      ],
      (err,result,fields)=>{
      if(err){
        console.log(err);
      }
    });  
    /*"INSERT (LastName,FirstName,Advertising,Adress,Status) VALUES('Shavkatov','Javoxir','Баннер','Farobiy-76','Регестрирован')";*/
    res.render(CreatePath('index'));
});

app.listen(PORT,()=>{
    console.log('start!');
});