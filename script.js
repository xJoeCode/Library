function Book (title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
    this.id = 1
    if(read == undefined){
       return this.read = false
    }
    this.info = function(){
        return(`${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`)
    }   
}

let myLibrary = []


function addBooktoLibrary(title, author, pages, read){
    if (title == "" || author == "" || pages < 1 || pages == ""){
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
    bookdiv.setAttribute("class", "bookElement")
    bookdiv.setAttribute("data-id", `${book.id}`)
    bookdiv.setAttribute("onClick",`showBookDetail(${book.id})`)
    library.appendChild(bookdiv)
    //creates title 
    const titlediv = document.createElement("p")
    titlediv.innerHTML = book.title
    bookdiv.appendChild(titlediv)
    // creates a read icon on book element if the book is marked as read
    if (book.read == true){
        markBookAsRead(book.id)
        }
    }
    console.table(myLibrary)
}

function removeBook(id){
    //removes book element from html
    const bookForRemoval = document.querySelector(`[data-id="${id}"]`)
    bookForRemoval.remove()
    //also removes book from array
    myLibrary = myLibrary.filter(e => e.id !== id)
    closeBookDetail()
    console.table(myLibrary)
}

function markBookAsRead(id){
    //adds icon to show that book is read
    const bookdiv = document.querySelector(`[data-id="${id}"]`)
    const readIcon = document.createElement('object')
    readIcon.setAttribute("data", "./Assets/read.svg")
    readIcon.setAttribute("class", "readIcon")
    readIcon.setAttribute("style", "width: 25px")
    readIcon.setAttribute("height", "height: 25px")
    bookdiv.appendChild(readIcon)
    //Also changes the array object's read properties to true
    const bookArray = myLibrary.filter(e => e.id === id)
    bookArray[0].read = true
    closeBookDetail()
    console.log(bookArray)
    console.table(myLibrary)
}


function markBookAsUnread(id){
    //adds icon to show that book is read
    const bookdiv = document.querySelector(`[data-id="${id}"]`)
    bookdiv.querySelector("object").remove()
    //Also changes the array object's read properties to false
    const bookArray = myLibrary.filter(e => e.id === id)
    bookArray[0].read = false
    closeBookDetail()
    console.log(bookArray)
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
    // add "Mark as Read" Button
    const markAsreadButton = document.querySelector("#markAsReadButton")
    markAsreadButton.setAttribute("onClick",`markBookAsRead(${id})`)
    // add "Mark As Unread" Button"
    const markasUnreadButton = document.querySelector("#markAsUnreadButton")
    markasUnreadButton.setAttribute("onClick",`markBookAsUnread(${id})`)  
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


function showLibraryStats(){
    console.table(myLibrary)
    const libraryStats = document.querySelector(".libraryStat")
    const list = libraryStats.querySelector("ul")
    if (libraryStats.style.width == "400px"){
        libraryStats.style.width = "100px"
        libraryStats.style.height = "50px"
        list.style.display = "none"
    } else {
        list.style.display = "flex"
        libraryStats.style.width = "400px"
        libraryStats.style.height = "200px"
        const totalbooks = document.querySelector("#totalNumberOfBooks")
        totalbooks.textContent = `Total number of books owned: ${myLibrary.length}`
        const totalbooksread = document.querySelector("#totalNumberOfBooksRead")
        totalbooksread.textContent =`Total number of books read: ${myLibrary.reduce((total, book) =>{
        return total + Number(book.read == true)},0)}`
        console.table(myLibrary)
    }
}



addBooktoLibrary("Harry Potter", "JK Rowling", 300, true)
addBooktoLibrary("The Lightning", "Lorem Ipsum", 100)



