document.addEventListener('DOMContentLoaded', function(){
    const submit = document.getElementById('inputBook')
    submit.addEventListener('submit', function(event) {
        event.preventDefault();
        addList();
    });

    if(checkStorage()){
        loadDataFromStorage();
    }
});

document.addEventListener('ondataloaded', () => {
    refreshDataFromTodo();
});
