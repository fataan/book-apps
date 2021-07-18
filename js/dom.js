const UNCOMPLETE_BOOK_LIST = document.getElementById('incompleteBookshelfList');
const COMPLETE_BOOK_LIST = document.getElementById('completeBookshelfList');
const BOOK_ITEMID = 'itemId';

function makeList(title, author, year, isComplete){
    const textTitle = document.createElement('h3');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerHTML = `Penulis: <span>${author}</span>`;

    const textYear = document.createElement('p');
    textYear.innerHTML = `Tahun: <span>${year}</span>`;

    const info = document.createElement('div');
    info.classList.add('info');
    info.append(textTitle, textAuthor, textYear)

    const action = document.createElement('div');
    action.classList.add('action');

    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(info,action);
    
    action.append(removeButton())
    if(isComplete){
        action.append(uncompleteButton())
    } else {
        action.append(completeButton())
    }

    return container;
}

function addList(){
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
    const uncomlete = UNCOMPLETE_BOOK_LIST;
    const complete = COMPLETE_BOOK_LIST;
    const book = makeList(title, author, year, isComplete);
    const bookObject = composeBookObject(title, author, year, isComplete);
    
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);


    if(isComplete){
        complete.append(book);
    } else{
        uncomlete.append(book);
    }

    updateDataToStorage();
}

function toUncompleteList(taskElement){
    const listUncomplete = UNCOMPLETE_BOOK_LIST;
    const title = taskElement.querySelector("h3").innerText;
    const author = taskElement.querySelectorAll('span')[0].innerText;
    const year = taskElement.querySelectorAll('span')[1].innerText;

    const newBook = makeList(title, author, year, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id
    listUncomplete.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function toCompleteList(taskElement){
    const bookComplete = COMPLETE_BOOK_LIST;
    const title = taskElement.querySelector("h3").innerText;
    const author = taskElement.querySelectorAll('span')[0].innerText;
    const year = taskElement.querySelectorAll('span')[1].innerText;

    const newBook = makeList(title, author, year, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true
    newBook[BOOK_ITEMID] = book.id;

    bookComplete.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTask(taskElement){
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();

    updateDataToStorage();
}

function createButton(typeButton, event ){
    const button = document.createElement('button');
    button.classList.add(typeButton);
    button.addEventListener('click', event);
    return button;
}

function removeButton(){
    return createButton('trash', function(event){
        if (confirm('Yakin ingin di hapus?')){
            removeTask(event.target.parentElement.parentElement);
        }
    })
}

function uncompleteButton(){
    return createButton('uncomplete_book',function(event){
        toUncompleteList(event.target.parentElement.parentElement)
    })
}

function completeButton(){
    return createButton('complete_book',function(event){
        toCompleteList(event.target.parentElement.parentElement)
    })
}

const searchBook = document.getElementById('searchBookTitle');
searchBook.addEventListener('keyup', function(e){
    const books = document.querySelectorAll('.info');
    const search = e.target.value.toUpperCase();

    books.forEach(function(item){
        const book = item.firstChild.textContent.toUpperCase();

        if(book.indexOf(search) != -1){
            item.parentElement.setAttribute('style', 'display: grid');
        } else {
            item.parentElement.setAttribute('style', 'display: none !important')
        }
    })

})