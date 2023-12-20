const delbtn = document.querySelectorAll('#delete');
for(btn of delbtn){
    btn.addEventListener('click',(e)=>{
        fetch('registration/' + e.target.parentElement.parentElement.dataset.id, {
            method: 'DELETE'
        });
        e.target.parentElement.parentElement.remove();
    });
}