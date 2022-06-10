function Book (title, author, totalPages, currentPage, read){
    this.title = title
    this.author = author
    this.totalPages = parseInt(totalPages)
    if (currentPage == ""){
        this.currentPage = 0
        console.log(this.currentPage)
        } else {
            this.currentPage = parseInt(currentPage)
        }
    this.read = read 
    this.id = 1
    this.info = function(){
        return(`${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`)
        }   
}

let myLibrary = []


function addBooktoLibrary(title, author, totalPages, currentPage, read){
    if (title == '' || author == '' || totalPages < 1 || currentPage > totalPages || (currentPage != 0 && read == true)){
            console.log("false" + author + title + totalPages)
            alert("Please check form inputs and try again")
    } else {

    closeForm()
    const book = new Book(title, author, totalPages, currentPage, read)
    myLibrary.push(book)
    book.id = myLibrary.length
    console.log(book)
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
        } else if (book.currentPage > 0){
            markBookAsCurrenlyReading(book.id, book.currentPage)
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
    bookArray[0].currentPage = bookArray[0].totalPages
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
    bookArray[0].currentPage = 0
    closeBookDetail()
    console.log(bookArray)
    console.table(myLibrary)
}

function markBookAsCurrenlyReading(id, currentPage){

    const bookdiv = document.querySelector(`[data-id="${id}"]`)
    const currentlyReadingIcon = document.createElement('object')
    currentlyReadingIcon.setAttribute("data", "./Assets/CurrentlyReading.svg")
    currentlyReadingIcon.setAttribute("class", "currentlyReadingIcon")
    currentlyReadingIcon.setAttribute("style", "width: 25px")
    currentlyReadingIcon.setAttribute("height", "height: 25px")
    bookdiv.appendChild(currentlyReadingIcon)
    //Also changes the array object's read properties to false
    const bookArray = myLibrary.filter(e => e.id === id)
    bookArray[0].read = false
    bookArray[0].currentPage = currentPage
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
    //add current pages
    const currentPage = document.querySelector("#bookDetailCurrentPage")
    if (bookArray[0].currentPage > 0 ){
        currentPage.textContent = `Current Page: ${bookArray[0].currentPage}`
    } else {
        currentPage.textContent = "Currently Not Reading"
    }
    //add total pages
    const totalPages = document.querySelector("#bookDetailPages")
    totalPages.textContent = `Total Pages: ${bookArray[0].totalPages}`
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



addBooktoLibrary("Harry Potter", "JK Rowling", 300, 0, true)
addBooktoLibrary("The Lightning", "Lorem Ipsum", 100,20,false)



