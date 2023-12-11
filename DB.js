const fs = require('fs');
/*JSON format for ragistration.json {"students":[]}*/
const DB = {
  DBpath: './date/registration.json',
  WriteDate: (date) => {
    fs.open(DB.DBpath, 'r+', (err, fd) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.read(fd, (err, bytesRead, buffer) => {
        if (err) {
          console.error(err);
          return;
        }
        const content = buffer.slice(0, bytesRead).toString();
        const jsonData = JSON.parse(content);
        date.data = new Date().toLocaleString();
        jsonData.students.push(date);
        const updatedContent = JSON.stringify(jsonData);
        fs.write(fd, updatedContent, 0, (err, bytesWritten, buffer) => {
          if (err) {
            console.error(err);
            return;
          }
          fs.close(fd, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      });
    });
  },
  ShowAll:()=>{
    return JSON.parse(fs.readFileSync(DB.DBpath,'utf-8'));    
  }
}
module.exports = DB;