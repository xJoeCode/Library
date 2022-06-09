function Book (title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
    if(read == undefined){
       return this.read = false
    }
    this.id = 1
    this.info = function(){
        return(`${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`)
    }   
}

let myLibrary = []


function addBooktoLibrary(title, author, pages, read){
    if (title == "" || author == "" || pages < 0 || pages == ""){
        console.log("false" + author + title + pages)
        alert("Please check form inputs and try again")
        
    } else {

    closeForm()
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
    book.id = myLibrary.length
    const library = document.querySelector(".library")
    //creates main book element
    const bookdiv = document.createElement("div")
    bookdiv.setAttribute("id", `${book.title} book`)
    bookdiv.setAttribute("data-id", `${book.id}`)
    bookdiv.setAttribute("onClick",`showBookDetail(${book.id})`)
    library.appendChild(bookdiv)
    //creates title 
    const titlediv = document.createElement("p")
    titlediv.innerHTML = book.title
    bookdiv.appendChild(titlediv)
    console.log(book)
    // creates a read icon on book element if the book is marked as read
    if (book.read == true){
       const readIcon = document.createElement('object')
       readIcon.setAttribute("data", "./Assets/read.svg")
       readIcon.setAttribute("class", "readIcon")
       readIcon.setAttribute("style", "width: 25px")
       readIcon.setAttribute("height", "height: 25px")
       bookdiv.appendChild(readIcon)
    }

    }
}

function removeBook(id){
    //removes book element from html
    const bookForRemoval = document.querySelector(`[data-id="${id}"]`)
    bookForRemoval.remove()
    //also remove book from array
    myLibrary = myLibrary.filter(e => e.id !== id)
    closeBookDetail()
    console.table(myLibrary)
}

function showBookDetail(id){
    const bookDetailContainer = document.querySelector(".bookDetail")
    bookDetailContainer.setAttribute("style","display:flex")
    const bookArray = myLibrary.filter(e => e.id === id)
    console.log(bookArray)
    //add title
    const title = document.querySelector("#bookDetailTitle")
    title.textContent = bookArray[0].title
    //add author
    const author = document.querySelector("#bookDetailAuthor")
    author.textContent = `Author: ${bookArray[0].author}`
    //add pages
    const pages = document.querySelector("#bookDetailPages")
    pages.textContent = `Pages: ${bookArray[0].pages}`
    //add "Remove Book" Button
    const removeBookButton = document.querySelector("#removeBookButton")
    removeBookButton.setAttribute("onClick",`removeBook(${id})`)


    
}

function closeBookDetail(){
    document.getElementsByClassName("bookDetail")[0].style.display = "none"
}


function closeForm(){
    document.getElementsByClassName("form")[0].style.display = "none"
    document.getElementsByClassName("form")[0].reset()
}

function openForm(){
    document.getElementsByClassName("form")[0].style.display = "flex"

}





//const firstbook = new Book("Harry Potter", "JK Rowling", 300);
//firstbook.addBooktoLibrary()
//console.log(myLibrary)



addBooktoLibrary("Harry Potter", "JK Rowling", 300, true)
addBooktoLibrary("The Lightning", "Lorem Ipsum", 100)



