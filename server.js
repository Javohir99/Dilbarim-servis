const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = 4000;
const mysql = require('mysql');
const methodOverride = require('method-override');
const { error, group } = require('console');
const { rejects } = require('assert');
const { reset } = require('nodemon');

let course = '';
let Adver = '';

fs.readFile('./date/course.json', 'utf8', (err, data) => {
  if(err){
    console.log(err);
  }
  course = JSON.parse(data);
});

fs.readFile('./date/adversting.json', 'utf8', (err, data) => {
  if(err){
    console.log(err);
  }
  Adver = JSON.parse(data);
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
app.use(express.json());

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.render(CreatePath('index'));
});

app.get('/chart', (req, res) => {
    res.render(CreatePath('chart'));
});

app.get('/group', (req, res) => {
    const Groups = new Array();
    connection.query(`SELECT * FROM onstudy JOIN REGISTRATION ON onstudy.ID = REGISTRATION.ID;`,(error, results, fields)=>{
      if(error){
        console.log(error);
      }
      connection.query('SELECT DISTINCT GROUPID FROM onstudy',(err,group,fd)=>{
        if(err){
          console.log(err);
        }
        for(let i = 0;i<group.length;i++){
          for(let k = 0;k<results.length;k++){
            if(group[i].GROUPID == results[k].GROUPID){
              Groups[i] = new Object();
              Groups[i].ID = group[i].GROUPID;
              Groups[i].Course = results[k].Course;
              Groups[i].TimeStart = results[k].TIMESTART;
              Groups[i].Times = results[k].TIME;
              break;
            }
          }
        }
        console.log(Groups);
        res.render(CreatePath('group'),{results,Groups,course});
      })
    });
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
    res.render(CreatePath('addstudent'),{course,Adver});
});

app.post('/registration/:id',(req, res) => {
  const {comment,status}= req.body;
  if(status == 'D'){
    connection.query('UPDATE REGISTRATION SET ? WHERE ID = ?',[{Comment:comment,Status:'D'},req.params.id],(error, results) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  }
  else{
    connection.query('UPDATE REGISTRATION SET ? WHERE ID = ?',[{Status:'R'},req.params.id],(error, results) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  }
  res.sendStatus(200);
});

app.get('/edit/:id',(req,res)=>{
    let student;
    connection.query(`SELECT * FROM REGISTRATION WHERE ID = ${req.params.id};`,(error,results,fields)=>{
      if(error){
        console.log(error);
      }
      res.render(CreatePath('editstudent'),{results,course,Adver});  
    });
    
});

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

app.put('/edit/:id',(req,res)=>{
  const newData = {
    LastName: String(req.body.lastname).toLowerCase(),
    FirstName: String(req.body.firstname).toLowerCase(),
    Phone: JSON.stringify([req.body.phone,req.body.phone2]),
    Course: req.body.course=='etc'?req.body.courseetc:req.body.course,
    Advertising: req.body.adv == 'etc'?req.body.advetc:req.body.adv,
    Adress: req.body.Adress,
    Comment: req.body.comment,
  };
  connection.query('UPDATE REGISTRATION SET ? WHERE ID = ?', [newData, req.params.id], (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
  });
 res.render(CreatePath('index'));
});


app.post('/addgroup', async (req, res) => {
  try {
    let {id,weeks,course} = req.body;
    let groupid = await watchlast();
    for (let i = 0; i < id.length; i++) {
      await updateStatus(id);
      await insertOnStudy(id[i], i,groupid,weeks);
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(PORT,()=>{
    console.log('start!');
});



function updateStatus(student) {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE REGISTRATION SET ? WHERE ID = ?', [{ STATUS: 'O' }, student], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function insertOnStudy(student, index,groupid,week) {
  return new Promise((resolve, reject) => {
    let studentinformation = {
      ID: student,
      GROUPID: groupid + '00',
      TIME: JSON.stringify(week),
      STATUS: "O",
      STUDENTID: groupid + (index<10?'0'+index:index)
    };
    connection.query('INSERT INTO ONSTUDY SET ?', [studentinformation], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function watchlast(){
  return new Promise((resolve,rejects)=>{
    connection.query(`SELECT * FROM onstudy ORDER BY TIMESTART DESC LIMIT 1`, (error,results,fields)=>{
      if(error){
        rejects(error);
      }
      try{
        resolve(incrementString(results[0].GROUPID.slice(0,-2)));
      }
      catch{
        resolve('0000');
      }
    });
  })
}

function incrementString(str) {
  const match = str.match(/(\d+)(.*)/);
  if (match) {
    const numStr = match[1]; 
    const rest = match[2];

    const incrementedNum = (parseInt(numStr, 10) + 1).toString().padStart(numStr.length, '0');

    return incrementedNum + rest;
  }

  return str;
}