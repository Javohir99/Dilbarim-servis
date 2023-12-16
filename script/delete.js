const delbtn = document.querySelectorAll('#delete');
const IDstudents = [];
for(btn of delbtn){
    btn.addEventListener('click',(e)=>{
         IDstudents.push(e.target.parentElement.parentElement.dataset.id);
         console.log(IDstudents);
         e.target.parentElement.parentElement.remove();
    });
}
window.addEventListener('beforeunload', async () => {
    IDstudents.sort((a, b) => b - a);
    for (let i = 0; i < IDstudents.length; i++) {
        await fetch('registration/' + IDstudents[i], {
            method: 'DELETE'
        });
        console.log(IDstudents[i]);
    }
});