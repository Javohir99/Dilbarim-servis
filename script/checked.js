const checkbox = document.getElementsByTagName('input');
const checkbtn = document.getElementsByClassName('checker');

function check(event){
    const target = event.target.parentElement.parentElement.parentElement;
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
