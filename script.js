function Book (title, author, totalPages, currentPage, url, read){
    this.title = title
    this.author = author
    this.totalPages = parseInt(totalPages)
    if (currentPage == ""){
        this.currentPage = 0
        console.log(this.currentPage)
        } else {
            this.currentPage = parseInt(currentPage)
        }
    this.url = url
    this.read = read 
    this.id = 1
    this.info = function(){
        return(`${this.title} by ${this.author} has ${this.pages} pages, ${this.read}`)
        }   
}

let myLibrary = []


function addBooktoLibrary(title, author, totalPages, currentPage, url, read){
    const titleInput = document.getElementById("title")
    const authorInput = document.getElementById("title")
    const totalPageNumber = document.getElementById("totalPages")
    const currentPageNUmber = document.getElementById("currentPage")
    const markAsRead = document.getElementById("read")


    if (!titleInput.validity.valid){
        titleInput.reportValidity()
    } else if(!authorInput.validity.valid) {
        authorInput.reportValidity()
    } else if (!totalPageNumber.validity.valid) {
        totalPageNumber.reportValidity()
    } else if(parseInt(currentPage) > parseInt(totalPages)){
        currentPageNUmber.setCustomValidity("Total page values must be more than current page values.")
        currentPageNUmber.reportValidity()
    } else if (currentPage != 0 && read == true){
        markAsRead.setCustomValidity("Book cannot be marked as read as there is a current page number value.")
        markAsRead.reportValidity()
    } else {

    //    if (title == '' || author == '' ){
    //    alert("Missing Title or Author Values")
    //    } else if (totalPages < 1) {
    //        alert("Invalid Total Page Number")
    //        } else if(currentPage > totalPages){
    //            console.log(currentPage+totalPages)
    //            alert("Current Page Number Should be Less than the total number of pages")
    //            } else if (currentPage != 0 && read == true){
    //                alert("Book cannot be marked as read as there is a page number")
    //            } else {

        createBooks(title, author, totalPages, currentPage, url, read)
        closeForm()

        
            
            console.table(myLibrary)
        }

    }

    function createBooks(title, author, totalPages, currentPage, url, read){

        const book = new Book(title, author, totalPages, currentPage, url, read)
        book.id = myLibrary.length
        const library = document.querySelector(".library")
        //creates main book element
        const bookdiv = document.createElement("div")
        bookdiv.setAttribute("class", "bookElement")
        bookdiv.setAttribute("data-id", `${book.id}`)
        bookdiv.setAttribute("onClick",`showBookDetail(${book.id})`)
        library.appendChild(bookdiv)
        // adds background image
        function checkURL(url) {
            return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
        }
        if (url === ""|| checkURL(url) == false){
            const backgroundImage = document.createElement("img")
            backgroundImage.setAttribute("src","./Assets/bg1.jpg")
            backgroundImage.setAttribute("class","placeholderImage")
            bookdiv.appendChild(backgroundImage)
            book.url = "./Assets/bg1.jpg"
        } else {
            const backgroundImage = document.createElement("img")
            backgroundImage.setAttribute("src",`${url}`)
            bookdiv.appendChild(backgroundImage)
        }
        //creates title 
        const titlediv = document.createElement("p")
        titlediv.innerHTML = book.title
        bookdiv.appendChild(titlediv)
        myLibrary.push(book)
        // creates a read icon on book element if the book is marked as read
        if (book.read == true){
            markBookAsRead(book.id)
            // creates a currently reading icon on book element if the book is marked as currently reading
            } else if (book.currentPage > 0){
                markBookAsCurrenlyReading(book.id, book.currentPage)
            }
            
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
    //checks if book is previously being read and removes the currently reading icon
    const bookdiv = document.querySelector(`[data-id="${id}"]`)
    const bookArray = myLibrary.filter(e => e.id === id)
    if(bookdiv.querySelector("object") != null){
        bookdiv.querySelector("object").remove()}
    //adds "book is read" icon
    const readIcon = document.createElement('object')
    readIcon.setAttribute("data", "./Assets/read.svg")
    readIcon.setAttribute("class", "readIcon")
    readIcon.setAttribute("style", "width: 25px")
    readIcon.setAttribute("height", "height: 25px")
    bookdiv.appendChild(readIcon)
    //Also changes the array object's read properties to true and sets current page to the last page
    bookArray[0].currentPage = bookArray[0].totalPages
    bookArray[0].read = true
    closeBookDetail()
    console.log(bookArray)
    console.table(myLibrary)
    }



function markBookAsUnread(id){
    //removes all icons
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
    document.getElementById("CurrentPageNumber").value = ""
    const bookdiv = document.querySelector(`[data-id="${id}"]`)
    const bookArray = myLibrary.filter(e => e.id === id)
     //checks if book is read
    if ( !(currentPage >= bookArray[0].totalPages) && !(currentPage < 1)){
         //removes previous icon if it exists
        if(bookArray[0].read == true || bookdiv.querySelector("object") != null){
            console.log("attaempting to remove icon")
            bookdiv.querySelector("object").remove()
        }
        console.log(bookArray[0].read)
        const currentlyReadingIcon = document.createElement('object')
        currentlyReadingIcon.setAttribute("data", "./Assets/CurrentlyReading.svg")
        currentlyReadingIcon.setAttribute("class", "currentlyReadingIcon")
        currentlyReadingIcon.setAttribute("style", "width: 25px")
        currentlyReadingIcon.setAttribute("height", "height: 25px")
        bookdiv.appendChild(currentlyReadingIcon)
            //Also changes the array object's read properties to false
        bookArray[0].read = false
        bookArray[0].currentPage = currentPage
        closeBookDetail()
        console.log(bookArray)
        console.table(myLibrary)
    } else if (currentPage > bookArray[0].totalPages || currentPage == bookArray[0].totalPages ) {
        markBookAsRead(id)
        } else if (currentPage < 1){
            markBookAsUnread(id)
        }
   

}

function showBookDetail(id){
    const bookDetailContainer = document.querySelector(".bookDetail")
    bookDetailContainer.setAttribute("style","display:grid")
    const bookArray = myLibrary.filter(e => e.id === id)
    console.log(bookArray)
    // references the id values in a hidden part of the popup which is used later for the "mark book as reading" function argument
    const booknumber = document.querySelector("#bookDetailID")
    booknumber.textContent = id
    //add book cover
    const bookCover = document.querySelector("#bookCover")
    bookCover.setAttribute("src",`${bookArray[0].url}`)
    //add title
    const title = document.querySelector("#bookDetailTitle")
    title.textContent = bookArray[0].title
    //add author
    const author = document.querySelector("#bookDetailAuthor")
    author.textContent = `Author: ${bookArray[0].author}`
    //add total pages
    const totalPages = document.querySelector("#bookDetailPages")
    totalPages.textContent = `Total Pages: ${bookArray[0].totalPages}`
    //add current page number
    const currentPage = document.querySelector("#bookDetailCurrentPage")
    currentPage.style.fontSize = "2rem"
    if (bookArray[0].currentPage == bookArray[0].totalPages){
        currentPage.textContent = "COMPLETED"
    } else if (bookArray[0].currentPage > 0){
        currentPage.textContent = `Current Page: ${bookArray[0].currentPage}`
    } else {
        currentPage.textContent = "Currently Not Reading"
    }
    //add "Remove Book" Button
    const removeBookButton = document.querySelector("#removeBookButton")
    removeBookButton.setAttribute("onClick",`removeBook(${id})`)
    // add "Mark as Read" Button
    const markAsreadButton = document.querySelector("#markAsReadButton")
    markAsreadButton.setAttribute("onClick",`markBookAsRead(${id})`)
    // add "Mark As Unread" Button"
    const markAsUnreadButton = document.querySelector("#markAsUnreadButton")
    markAsUnreadButton.setAttribute("onClick",`markBookAsUnread(${id})`)  
    // add  "Mark Page as read" Button
    document.querySelector("#markPageAsReadButton").setAttribute("onClick", `markBookAsCurrenlyReading(${id}, ${(bookArray[0].currentPage + 1)})`)
  
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
    const listContainer = libraryStats.querySelector("#bookStatList")
    const list = listContainer.querySelectorAll("li")
    if (libraryStats.style.width == "600px"){
        libraryStats.classList.toggle("expand")
        //listContainer.classList.toggle("expand")
        list.forEach(list => list.classList.toggle("expand") )
        
        //libraryStats.style.width = "200px"
       // libraryStats.style.height = "50px"
        //list.style.display = "none"
    } else {
        libraryStats.classList.toggle("expand")
        //listContainer.classList.toggle("expand")
        list.forEach(list => list.classList.toggle("expand") )
        //list.style.display = "flex"
        //libraryStats.style.width = "600px"
        //libraryStats.style.height = "200px"

        const totalbooks = document.querySelector("#totalNumberOfBooks")
        totalbooks.textContent = `Total number of books owned: ${myLibrary.length}`
        const totalbooksread = document.querySelector("#totalNumberOfBooksRead")
        totalbooksread.textContent =`Total number of books read: ${myLibrary.reduce((total, book) =>{
        return total + Number(book.read == true)},0)}`
        const totalBooksCurrentlyReading = document.querySelector("#totalNumberOfBooksCurrentlyReading")
        totalBooksCurrentlyReading.textContent = `Total number of books currently reading: ${myLibrary.reduce((total,book) =>{
            return total + Number(book.currentPage != 0 && book.currentPage != book.totalPages)},0)}`
        }

        
        console.table(myLibrary)
    }
function sortBooks(value){
    const sortBooks = document.querySelector("#sortbooktext")
    if (value == 'read'){
        const booksread = myLibrary.filter(book => book.read == true)
        booksread.forEach(book => {document.querySelector(`[data-id="${book.id}"]`).setAttribute("style", "order: -1")})
        const myLibrarydiff = myLibrary.filter( value => !(booksread.includes(value)))
        myLibrarydiff.forEach(book => {document.querySelector(`[data-id="${book.id}"]`).setAttribute("style", "order: 0")})

    } else if (value == 'currentlyReading'){
        //filters the array to looks for book with current pages that are more than 0 and less than the total number of pages
        const booksread = myLibrary.filter(book => (book.currentPage != 0 && book.currentPage != book.totalPages))
        booksread.forEach(book => {document.querySelector(`[data-id="${book.id}"]`).setAttribute("style", "order: -1")})
        //filters the array to look for the other books that are not previously filtered
        const myLibrarydiff = myLibrary.filter( value => !(booksread.includes(value)))
        myLibrarydiff.forEach(book => {document.querySelector(`[data-id="${book.id}"]`).setAttribute("style", "order: 0")})
        //sorts the array from the largest to the smallest number of pages
        } else if (value == "totalPages"){
            console.log(myLibrary)
            const totalpages = myLibrary.sort(function(bookA, bookB){ if(bookA.totalPages > bookB.totalPages){
                console.log(myLibrary)
                return -1 } else {
                    return 1
                }
             })
            for (let i = 0; i < totalpages.length; ++i){
            // goes through each index of the array and queryselect each of the book elements and giving them a descending value flex order
            book = document.querySelector(`[data-id="${totalpages[i].id}"]`)
            book.setAttribute("style", `order:${(i - totalpages.length)}`)
            }

        } else if (value == "currentPages") {
            const currentPages = myLibrary.sort(function(bookA, bookB){ if(bookA.currentPage > bookB.currentPage){
                return -1 } else {
                    return 1
                }
             })
             for (let i = 0; i < currentPages.length; ++i){
                // goes through each index of the array and queryselect each of the book elements and giving them a descending value flex order
                book = document.querySelector(`[data-id="${currentPages[i].id}"]`)
                book.setAttribute("style", `order:${(i - currentPages.length)}`)
                }
        }
}

        
    




createBooks("Magpie", "Elizabeth Day", 336, 0, "https://images-na.ssl-images-amazon.com/images/I/41WayqYI+pL._SX321_BO1,204,203,200_.jpg", true)
createBooks("The Murder of Mr. Wickham", "Claudia Grey", 400,20,"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1639679719i/59089898.jpg",false)



