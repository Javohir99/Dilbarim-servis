const telephone = document.querySelector('#phone');
const adv = document.querySelector('#adv');
const course = document.querySelector('#course');
const address = document.querySelector('#adress');
const submit = document.querySelector('#btn');
const lastname = document.querySelector('#lastname');
const firstname = document.querySelector('#firstname');
const form = document.querySelector('#form');
const checker = document.querySelector('#checker');
const success = document.querySelector('#success');
const change = document.querySelector('#change');
const reset = document.querySelectorAll('#reset');
const addphone = document.querySelector('#add');
const header = document.querySelector('header');
const check = {
    firstname: document.querySelector('#check-firstname'),
    lastname: document.querySelector('#check-lastname'),
    address: document.querySelector('#check-adress'),
    course: document.querySelector('#check-course'),
    telephone: document.querySelector('#check-phone'),
    adv: document.querySelector('#check-adv'),
    checketc: function (block) {
        if (block.value === 'etc') {
            return block.parentElement.nextElementSibling.querySelector('input').value;
        }
        return block.value;
    }
}

addphone.addEventListener('click', (event) => {
    if(event.target.parentElement.parentElement.nextElementSibling?.querySelector('input')?.name !== 'phone2'){
        [row, label, input, innerrow] = createRow(event);
        const del = document.createElement('button');
    
        del.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        });
        input.addEventListener('input', phoneinput);
        
    
        del.classList.add('col-4', 'delete', 'btn', 'offset-2');
    
        input.placeholder = "+998 (99) 999-99-99";
        input.name = 'phone2';
        label.innerHTML = '<i>Телефон</i>';
    
        del.setAttribute('type','button');
    
        innerrow.append(del);
        row.append(label);
        row.append(input);
        row.append(innerrow);
        event.target.parentElement.parentElement.after(row);
    }
})
adv.addEventListener('change', etc);
course.addEventListener('change', etc);
submit.addEventListener('click', checkinput);
for (let btn of reset) {
    btn.addEventListener('click', resetinput);
}

// telephone.addEventListener('focus', phonefocus);
success.addEventListener('click', () => {
    form.submit();
});
change.addEventListener('click', () => {
    checker.style.display = 'none';
    form.inert = false;
    header.inert = false;
});
telephone.addEventListener('input', phoneinput);



function createRow(event) {
    const row = document.createElement('div');
    const innerrow = document.createElement('div');
    const res = document.createElement('button');
    const label = document.createElement('label');
    const input = document.createElement('input');

    res.addEventListener('click', resetinput)

    innerrow.classList.add('row', 'col-1', 'gx-0', 'py-1');
    row.classList.add('row', 'py-3');
    res.classList.add('col-4', 'reset', 'btn');
    label.classList.add('col-3', 'text-center', 'offset-1');
    input.classList.add('col-3', 'offset-4');

    res.setAttribute('type','button');
    input.setAttribute('type', 'text');
    innerrow.append(res);
    return [row, label, input, innerrow];
}
function etc(event) {
    if (event.target.value == 'etc') {
        [row, label, input, innerrow] = createRow(event);

        input.name = event.target.name + 'etc';
        label.innerHTML = '<i>' + event.target.previousElementSibling.innerHTML + '</i>';
        
        row.append(label);
        row.append(input);
        row.append(innerrow);
        event.target.parentElement.after(row);
    }
    else {
        const nextElement = event.target.parentElement.nextElementSibling;
        if (nextElement.firstElementChild.innerHTML == '<i>' + event.target.previousElementSibling.innerHTML + '</i>') {
            nextElement.remove();
        }
    }
}
function resetinput(event) {
    event.target.parentElement.previousElementSibling.value = "";
}
function empty(block) {
    if (block == submit) {
        return true;
    }
    if(block.name == 'phone' || block.name == 'phone2'){
        const regex = /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
        if (!regex.test(block.value)) {
            console.log('KUKU!');
            if(!block.previousElementSibling.classList.contains('warning')){
                const div = document.createElement('div');
                div.classList.add('warning');
                block.before(div);
                }
                return false;
            }
    }
    if (block.value == '')  {
        if(!block.previousElementSibling.classList.contains('warning')){
        const div = document.createElement('div');
        div.classList.add('warning');
        block.before(div);
        }
        return false;
    }
    else {
        if (block.previousElementSibling.classList.contains('warning')) {
            console.log(block.previousElementSibling);
            block.previousElementSibling.remove();
            return true;
        }
    }
    return true;
}
function checkinput() {
    let wrong = true;
    for (let input of document.getElementsByTagName('input')) {
        wrong = (empty(input) && wrong);
    }
    if (wrong) {
        check.address.innerHTML = address.value;
        check.telephone.innerHTML = telephone.value;
        check.lastname.innerHTML = lastname.value;
        check.firstname.innerHTML = firstname.value;
        check.adv.innerHTML = check.checketc(adv);
        check.course.innerHTML = check.checketc(course);
        checker.style.display = 'flex';
        form.inert = true;
        header.inert = true;
    }
}

function phoneinput(event) {
    event.target.value = event.target.value.replace(/[^\d+\-()\s]/g, '');
    switch (event.target.value.length) {
        case 1:
            event.target.value = value = '+998 (' + event.target.value;
            break
        case 8:
            event.target.value = value = event.target.value + ') ';
            break;
        case 13:
            event.target.value = event.target.value + '-';
            break;
        case 16:
            event.target.value = event.target.value + '-';
            break;
        case 20:
            event.target.value = event.target.value.slice(0,-1);
    }
}