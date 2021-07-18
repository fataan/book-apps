const STORAGE_KEY = 'BOOKSHELF_APPS';

let books = [];

function checkStorage(){
    if(typeof(Storage) === undefined){
        return false
    }
    return true;
}

function saveData(){
    const parse = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parse)
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);

    if(data !== null){
        books = data
    }

    document.dispatchEvent(new Event('ondataloaded'))
}

function updateDataToStorage(){
    if(checkStorage){
        saveData()
    }
}

function findBook(todoId){
    for(book of books){
        if(book.id == todoId){
            return book
        }
    }
    return null
}

function findBookIndex(bookId){
    let index = 0;
    for(book of books){
        if(book.id == bookId){
            return index;
        }
        
        index++;
    }
    return -1
}

function composeBookObject(title, author, year, isCompleted){
    return{
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    }
}

function refreshDataFromTodo() {
    const listUncompleted = UNCOMPLETE_BOOK_LIST;
    const listCompleted = COMPLETE_BOOK_LIST;

    for(let book of books){
        const newBook = makeList(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            listCompleted.append(newBook);
        } else{
            listUncompleted.append(newBook)
        }
    }
}