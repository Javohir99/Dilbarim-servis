const telephone = document.querySelector('#phone');
const adv = document.querySelector('#adv');
const course = document.querySelector('#course');
const address = document.querySelector('#adress');
const submit = document.querySelector('#btn');
const secondname = document.querySelector('#secondname');
const firstname = document.querySelector('#firstname');
const form = document.querySelector('#form');
const checker = document.querySelector('#checker');
const success = document.querySelector('#success');
const change = document.querySelector('#change');
const check = {
    firstname:document.querySelector('#check-firstname'),
    secondname:document.querySelector('#check-secondname'),
    address:document.querySelector('#check-adress'),
    course:document.querySelector('#check-course'),
    telephone:document.querySelector('#check-phone'),
    adv:document.querySelector('#check-adv'),
    checketc:function(block){
        if(block.value === 'etc'){
            return block.parentElement.nextElementSibling.querySelector('input').value;
        }
        return block.value;
    }
}
console.log(form);

/* нужно проработать маску для телефоных номеров*/
const mask = '+998 (__) ___-__-__';

adv.addEventListener('change',etc);
course.addEventListener('change',etc);
submit.addEventListener('click',checkinput);


telephone.addEventListener('focus',()=>{
    telephone.value = '+998 (';
});
success.addEventListener('click',()=>{
    form.submit();
});
change.addEventListener('click',()=>{
    checker.style.display = 'none';
});
telephone.addEventListener('input',()=>{
    switch(telephone.value.length){
        case 8:
            telephone.value = value = telephone.value + ') ';
        break;
        case 13:
            telephone.value = telephone.value + '-';
            break;
        case 16:
            telephone.value = telephone.value + '-';
            break;
    }
});


function etc(event){
    const area = event.target;
    if(area.value == 'etc'){
            const row = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');

            row.classList.add('row','py-3');
            label.classList.add('col-3','text-center','offset-1');
            input.classList.add('col-3','offset-4');

            input.name = area.name + 'etc';
            label.innerHTML = '<i>'+area.previousElementSibling.innerHTML+'</i>';

            input.setAttribute('type','text');
            row.append(label);
            row.append(input);
            area.parentElement.after(row);
    }
    else{
        const nextElement = area.parentElement.nextElementSibling;
        if(nextElement.firstElementChild.innerHTML == '<i>'+area.previousElementSibling.innerHTML+'</i>'){
            nextElement.remove();
        }
    }
}
function rest(){

}
function empty(block){
    if(block.value == ''){
        console.log('pustoy block');
        const div = document.createElement('div');
        div.classList.add('warning');
        block.before(div);
        return false;
    }
    else{
        if(block.previousElementSibling.classList.contains('warning')){
            console.log('warning have');
            block.previousElementSibling.remove();
            return true;
        }
    }
    return true;
}
function checkinput(){
    if(empty(telephone) & empty(address) & empty(secondname) & empty(firstname)){
        console.log('form sucsses');
        check.address.innerHTML = address.value;
        check.telephone.innerHTML = telephone.value;
        check.secondname.innerHTML = secondname.value;
        check.firstname.innerHTML = firstname.value;
        check.adv.innerHTML = check.checketc(adv);
        check.course.innerHTML = check.checketc(course);
        checker.style.display = 'flex';
    }
}