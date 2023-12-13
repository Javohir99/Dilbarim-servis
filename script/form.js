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
const reset = document.querySelectorAll('#reset');
const addphone = document.querySelector('#add');

/*
                      <div class="row col-1 gx-0 py-1">
                          <div class="col-6 reset btn" id="reset"></div>
                          <div class="col-6 delete btn" id="delete"></div>
                      </div>
*/
/*
<div class="row py-3">
    <input type="tel" name="phone" id="phone" class="col-3 offset-4" placeholder="+998 (99) 999-99-99">
    <div class="row col-1 gx-0 py-1">
        <div class="col-6 reset btn" id="reset"></div>
        <div class="col-6 delete btn" id="add"></div>
    </div>
</div>
*/
const check = {
    firstname: document.querySelector('#check-firstname'),
    secondname: document.querySelector('#check-secondname'),
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

/* нужно проработать маску для телефоных номеров*/
const mask = '+998 (__) ___-__-__';

addphone.addEventListener('click', (event) => {
    [row, label, input, innerrow] = addrow(event);
    const del = document.createElement('div');
    del.classList.add('col-6', 'delete', 'btn');

    del.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
    });
    input.addEventListener('focus', phonefocus);
    input.addEventListener('input', phoneinput);
    
    input.placeholder = "+998 (99) 999-99-99";
    input.name = 'phone2';
    label.innerHTML = '<i>Телефон</i>';

    innerrow.append(del);
    row.append(label);
    row.append(input);
    row.append(innerrow);
    event.target.parentElement.parentElement.after(row);
})
adv.addEventListener('change', etc);
course.addEventListener('change', etc);
submit.addEventListener('click', checkinput);
for (let btn of reset) {
    btn.addEventListener('click', resetinput);
}

telephone.addEventListener('focus', phonefocus);
success.addEventListener('click', () => {
    form.submit();
});
change.addEventListener('click', () => {
    checker.style.display = 'none';
});
telephone.addEventListener('input', phoneinput);

function addrow(event) {
    const row = document.createElement('div');
    const innerrow = document.createElement('div');
    const res = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    innerrow.classList.add('row', 'col-1', 'gx-0', 'py-1');
    row.classList.add('row', 'py-3');
    res.classList.add('col-6', 'reset', 'btn');
    res.addEventListener('click', resetinput)
    label.classList.add('col-3', 'text-center', 'offset-1');
    input.classList.add('col-3', 'offset-4');

    input.setAttribute('type', 'text');
    innerrow.append(res);
    return [row, label, input, innerrow];
}
function etc(event) {
    if (event.target.value == 'etc') {
        [row, label, input, innerrow] = addrow(event);
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
    console.log(block);
    if (block.value == '') {
        const div = document.createElement('div');
        div.classList.add('warning');
        block.before(div);
        return false;
    }
    else {
        if (block.previousElementSibling.classList.contains('warning')) {
            block.previousElementSibling.remove();
            return true;
        }
    }
    return true;
}
function checkinput() {
    let wrong = true;
    for (let input of document.forms[0].elements) {
        wrong = (empty(input) && wrong);
    }
    if (wrong) {
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
function phonefocus(event) {
    event.target.value = '+998 (';
}
function phoneinput(event) {
    switch (event.target.value.length) {
        case 8:
            event.target.value = value = event.target.value + ') ';
            break;
        case 13:
            event.target.value = event.target.value + '-';
            break;
        case 16:
            event.target.value = event.target.value + '-';
            break;
    }
}