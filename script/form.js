const telephone = document.querySelector('#phone');
const adv = document.querySelector('#adv');
const course = document.querySelector('#course');
/* нужно проработать маску для телефоных номеров*/
const mask = '+998 (__) ___-__-__';

adv.addEventListener('change',etc);
course.addEventListener('change',etc);

telephone.addEventListener('focus',()=>{
    telephone.value = '+998 (';
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
function empty(){

}