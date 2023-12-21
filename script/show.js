const course = document.getElementById("course");
const table = document.getElementById("table");
const search = document.getElementById("search");
const btn = document.getElementById("btn-search");

btn.addEventListener('click',()=>{
    let searchRegex = new RegExp(search.value,"gim")
    for(let i=1;i<table.children.length;i++){
        let rowMatchesSearch = false;
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


course.addEventListener('change',()=>{
    for(let i=1;i<table.children.length;i++){
        if(course.value == "all"){
            table.children[i].style.display = "flex";
        }
        else{
            if(course.value != String(table.children[i].children[1].innerHTML).trim()){
                table.children[i].style.display = "none";
            }else{
                table.children[i].style.display = "flex";
            }
        }
    }
});
