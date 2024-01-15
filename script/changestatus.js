const delbtn = document.querySelectorAll('#delete');
const restorebtn = document.querySelectorAll('#restore');
const checkblock = document.querySelector('#checker');
const close = document.querySelector('#change');
const success = document.querySelector('#success');
const comment = document.querySelector('#comment');

close.addEventListener('click',()=>{
    checkblock.style.display = 'none';
});

restorebtn.forEach(btn=>{
    btn.addEventListener('click',restorebtnevent);
});

for(btn of delbtn){
    btn.addEventListener('click',e=>{
        deletebtnevent(e);
    });
}

function restorebtnevent(e){
    fetch('registration/' + e.target.parentElement.parentElement.dataset.id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status:'R'}),
    });
    e.target.parentElement.parentElement.classList.replace('D','R');

    const delbtn = document.createElement('button');
    delbtn.classList.add('col-4','btn','p-3','delete');
    delbtn.type = 'button';
    delbtn.id = 'delete';

    const btn = document.createElement('button');
    const checkbox = document.createElement('input');

    checkbox.classList.add('select');
    checkbox.type = 'checkbox';
    btn.classList.add('col-4','btn','px-0','checker');

    delbtn.addEventListener('click',e=>{
        deletebtnevent(e);
    });
    checkbox.addEventListener('change',check);
    btn.append(checkbox);
    e.target.parentElement.prepend(btn);

    e.target.parentElement.append(delbtn);
    e.target.parentElement.parentElement.style.display = 'none';

    e.target.remove();
}

function deletebtnevent(e){
    checkblock.style.display = 'flex';
    let input = e.target;
    let block = input.parentElement;
    let row = block.parentElement;
    if (block && block.parentElement) {
        success.onclick = ()=>{
            console.log(row.dataset.id);
            fetch('registration/' + row.dataset.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({comment:comment.value,status:'D'}),
            }).then(()=>{
                row.classList.replace('R','D');
                row.classList.remove('chacked');
                const restorebtn = document.createElement('button');
                restorebtn.classList.add('col-4','btn','p-3','restore');
                restorebtn.type = 'button';
                restorebtn.id = 'restore';
                restorebtn.addEventListener('click',restorebtnevent);
                block.append(restorebtn);
                block.firstElementChild.remove();
                row.style.display = 'none';
                input.remove();
                checkblock.style.display = 'none';
            })
        };
      } else {
        console.log("Родительский элемент не найден");
    }
}