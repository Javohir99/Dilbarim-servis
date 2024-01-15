const checkbox = document.getElementsByClassName('select');
const createbtn = document.querySelector('#create');
const section = document.querySelector('#addgroup');
const checkboxButtons = document.querySelectorAll('input[name="btncheck"]');
const timecontainer = document.getElementById('time');
const successtime = document.querySelector('#successtime');
const closetime = document.querySelector('#changetime');
const time = {
    dayname:new Map().set('mon','Понедельник').set('tue','Вторник').set('wed','Среда').set('thu','Четверг').set('fri','Пятница').set('sat','Суббота').set('sun','Воскресенье'),
    all:{},
    createclock(day){
        const row = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        
        row.classList.add('row','py-3','weeks');
        row.id = day+'clock';
    
        label.classList.add('col-5','offset-1');
        label.innerHTML = this.dayname.get(day);
        
        input.type = 'time';
        input.id = 'appt';
        input.name = day;
        input.classList.add('col-5');
        input.addEventListener('change',(e)=>{
            time.settime(e.target);
        });
    
        row.append(label);
        row.append(input);
    
        timecontainer.append(row);
        overflow();
    },
    removeclock(day){
        row = timecontainer.querySelector(`#${day}clock`);
        delete this.all[time.dayname.get(day)];
        row.remove();
        overflow();
    },

    weekclockadder(btn){
        if(btn.checked){
            this.createclock(btn.value);
        }
        else{
            this.removeclock(btn.value);
        }
    },
    settime(btn){
        this.all[this.dayname.get(btn.name)] = btn.value;
    },
    get(){
        return this.all;
    },
}
const box = {
    SelectedStudents:[],
    SameCourse:new Set(),
    selectallchecked(){
        for(let i = 0; i < checkbox.length; i++){
            if(checkbox[i].checked){
                this.SelectedStudents.push(checkbox[i].parentElement.parentElement.parentElement.dataset.id);
                this.SameCourse.add(checkbox[i].parentElement.parentElement.parentElement.children[1].innerHTML);
            }
        }
        if(this.SameCourse.size > 1){
            alert('Бирхил курслар белгиланмаган');
        }
        else if(!this.SameCourse.size){
            alert('Группа яратиштан олдин окувчиларни белгиланг');
        }
        else{
            section.style.display = "flex";
        }
    },
    get(elem){
        if(elem === 'id'){
            return this.SelectedStudents;
        }
        else{
            return [...this.SameCourse][0];
        }
    }
}

createbtn.addEventListener('click',function(){
    box.selectallchecked();
});
successtime.addEventListener('click',()=>{
    save();
})
closetime.addEventListener('click',()=>{
    section.style.display = "none";
})
checkboxButtons.forEach(btn=>{
    btn.addEventListener('change',(e)=>{
        time.weekclockadder(e.target);
    })
});

for(let i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener('change',check);
}

function check(event){
    const target = event.target.parentElement.parentElement.parentElement;
    if(event.target.checked){
        target.classList.add('chacked');
    }
    else{
        target.classList.remove('chacked');
    }
} 
/*select end*/




function overflow(){
    if(timecontainer.scrollHeight >360){
        timecontainer.style.overflowY = 'scroll';
    }
    else{
        timecontainer.style.overflowY = 'hidden';
    }
}
function save(){
    const json = new Object;
    json.weeks = time.get();
    json.id = box.get('id');
    json.course = box.get('course');
    request(JSON.stringify(json));
}

function request(json){
    fetch('/addgroup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: json
    }).then(()=>{
        window.location.href = '/group';
    })
}