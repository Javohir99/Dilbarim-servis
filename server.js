const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
const mysql      = require('mysql');
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
  res.render(CreatePath('registration'),{date});
});

app.delete('/registration/:id', async (req, res) => {
  const id = req.params.id;
  processingQueue.push(id);

  if (processingQueue.length === 1) {
    await processNextRequest();
  }

  res.sendStatus(200);
});


app.get('/addstudent', (req, res) => {
    res.render(CreatePath('addstudent'));
});
app.post('/addstudent',(req,res)=>{
    connection.query(`INSERT RIGISTRATION(LastName,FirstName,Phone,Course,Advertising,Adress,Status) VALUES('${req.body.secondname}','${req.body.firstname}','["${req.body.phone}","${req.body.phone2}"]','${req.body.course}','${req.body.adv}','${req.body.adress}','Регистрирован');`,(err)=>{
      console.log(err);
    });
    /*"INSERT (LastName,FirstName,Advertising,Adress,Status) VALUES('Shavkatov','Javoxir','Баннер','Farobiy-76','Регестрирован')";*/
    res.render(CreatePath('index'));
});

app.listen(PORT,()=>{
    console.log('start!');
});
