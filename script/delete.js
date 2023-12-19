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
    const deleteRequests = IDstudents.map(async (id) => {
        await fetch('registration/' + id, {
            method: 'DELETE'
        });
        console.log(id);
    });
    await Promise.all(deleteRequests);
});