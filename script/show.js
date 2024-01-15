const course = document.querySelector("#course");
const search = document.querySelector("#search");
const btn = document.querySelector("#btn-search");
const table = document.querySelector('#table');
const radioButtons = document.querySelectorAll('input[name="btnradio"]');

radioButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.checked) {
            showrows();
        }
    });
});

course.addEventListener('change',()=>{
    showrows();
});

function checkstatus(){
    let value;
    radioButtons.forEach(button => {
            if (button.checked) {
                value = button.value;
                return;
            }
        });
    return value;
}

function showrows(){
    const chek = checkstatus(); 
    for(let i=1;i<table.children.length;i++){
        if(course.value === String(table.children[i].children[1].innerHTML).trim() && table.children[i].classList.contains(chek)){
            table.children[i].style.display = "flex";
        }
        else if(course.value == "all" && table.children[i].classList.contains(chek)){
            table.children[i].style.display = "flex";
        }
        else{
            table.children[i].style.display = "none";
        }
    }
}

btn.addEventListener('click',()=>{
    let searchRegex = new RegExp(search.value,"gim");
    for(let i=1;i<table.children.length;i++){
        for(let j=0;j<table.children[i].children.length;j++){
            if(searchRegex.test(table.children[i].children[j].innerHTML)){
                table.children[i].style.display = "flex";
                break;
            }else{
                table.children[i].style.display = "none";
            }
        }
    }
});

function showstudent(status){
    for(let i = 1;i<table.children.length;i++){
        if(table.children[i].classList.contains(status)){
            table.children[i].style.display = 'flex';
        }
        else{
            table.children[i].style.display = 'none';
        }
    }
}
showstudent('R');