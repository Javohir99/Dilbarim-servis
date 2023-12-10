const clock = document.querySelector('.clock');
const date = document.querySelector('.date');
const month = ['янаварь',"февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];
console.log(date);
showdate();
function showdate(){
    const now = new Date();
    clock.innerHTML = zeroplacer(now.getHours()) + ':' + zeroplacer(now.getMinutes());
    date.innerHTML = now.getDate() + " " + month[now.getMonth()] + " " + now.getFullYear();
}
function zeroplacer(number){
    if(number<10){
        number = '0' + number;
    }
    return number;
}
setInterval(showdate,5000);