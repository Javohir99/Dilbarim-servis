const checkbox = document.getElementsByTagName('input');
function check(event){
    const target = event.target.parentElement.parentElement;
    if(event.target.checked){
        target.classList.add('chacked');
    }
    else{
        target.classList.remove('chacked');
    }
} 
for(let i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener('change',check);
}