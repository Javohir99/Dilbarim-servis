const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const JSONKA = `[{"secondname":"Shavkatov","firstname":"Javoxir","phone":"+998 (94) 608-24-42","course":"compyuter","adv":"familiar","adress":"Farobiy"}]`;
const obj = JSON.parse(JSONKA);
const PORT = 3000;

app.set('veiw engine','ejs');

/*logic error не проработан*/

const CreatePath = (file) => path.resolve(__dirname,'views',file + '.ejs');

const WriteDate = (date)=>{
    fs.open('./date/student.json', 'r+', (err, fd) => {
        if (err) {
          console.error(err);
          return;
        }
      
        fs.read(fd, (err, bytesRead, buffer) => {
        console.log(buffer.toString());
          if (err) {
            console.error(err);
            return;
          }
      
          const content = buffer.slice(0, bytesRead).toString();
          const jsonData = JSON.parse(content);
          jsonData.student.push(date);
          const updatedContent = JSON.stringify(jsonData);
      
          fs.write(fd, updatedContent,0,(err, bytesWritten, buffer) => {
            if (err) {
              console.error(err);
              return;
            }
      
            fs.close(fd, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log('Файл успешно закрыт.');
            });
          });
        });
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
