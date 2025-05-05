const bookLibrary = [];
const tableView = document.querySelector(".tableView");
let tableHead = [];
const table = document.createElement("table");
const addBook = document.querySelector("#addBook");
function Book(id, title, author, genre) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.genre = genre;
}

// console.log(`id = ${crypto.randomUUID()}`);
function addBookToLibrary(title, author, genre) {
  let id = crypto.randomUUID();
  // console.log(`id = ${id}`);
  const newBook = new Book(id, title, author, genre);
  // console.log(newBook.valueOf());
  tableHead = Object.keys(newBook);
  bookLibrary.push(newBook);
}
addBookToLibrary(
  "Fundamentals of Applied Thaumaturgy, 3rd Edition",
  "Professor Eldrune Grimshaw",
  "Fantasy"
);
addBookToLibrary(
  "Introduction to Temporal Mechanics",
  "Dr. Aris Thorne",
  "Science Fiction"
);
addBookToLibrary("Potions & Elixirs", "Seraphina Blackwood", "Fantasy");

// function displayBooks() {
//   for (const book of bookLibrary) {
//     console.log(
//       `ID: ${book.id}, Title:${book.title}, Author:${book.author}, Genre:${book.genre}`
//     );
//   }
// }
// displayBooks();
function createTable() {
  // table.style.width = "500px";
  table.style.borderTop = "1px solid red";
  table.style.borderRight = "1px solid red";

  const tr = document.createElement("tr");

  if (!table.querySelector("thead")) {
    const thead = document.createElement("thead");
    for (const head of tableHead) {
      let th = document.createElement("th");
      th.style.borderLeft = "1px solid red";
      th.style.borderBottom = "1px solid red";
      th.appendChild(document.createTextNode(head));
      tr.appendChild(th);
      thead.appendChild(tr);
      table.appendChild(thead);
    }
  }
  let tbody = table.querySelector("tbody");
  if (!tbody) {
    tbody = document.createElement("tbody");
    table.appendChild(tbody);
  }
  tbody.innerHTML = "";
  bookLibrary.forEach((book) => {
    const tr = document.createElement("tr");

    Object.values(book).forEach((value) => {
      const td = document.createElement("td");
      td.style.borderBottom = "1px solid red";
      td.style.borderLeft = "1px solid red";
      td.appendChild(document.createTextNode(value));
      tr.appendChild(td);
    });
    const removeCell = tr.insertCell();
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete Row";
    removeBtn.className = "delete";
    removeCell.appendChild(removeBtn);
    tbody.appendChild(tr);
    // table.appendChild(tbody);
  });

  tableView.appendChild(table);
}
createTable();
// new window to add new Book()
const dialog = document.createElement("dialog");
dialog.id = "dialog";
const form = document.createElement("form");
const titlePara = document.createElement("p");
const titleLabel = document.createElement("label");
titleLabel.textContent = "Title: ";
const authorPara = document.createElement("p");
const authorLabel = document.createElement("label");
authorLabel.textContent = "Author: ";
const genrePara = document.createElement("p");
const genreLabel = document.createElement("label");
genreLabel.textContent = "Genre: ";
const title = document.createElement("input");
title.type = "text";
title.className = "title";
const author = document.createElement("input");
author.type = "text";
author.className = "genre";
const genre = document.createElement("input");
genre.type = "text";
genre.className = "genre";
const dialogDiv = document.createElement("div");
dialogDiv.id = "dialogBtn";
const cancelBtn = document.createElement("button");
const confirmBtn = document.createElement("button");
cancelBtn.value = "cancel";
cancelBtn.formMethod = "dialog";
cancelBtn.textContent = "Cancel";
confirmBtn.id = "confirmBtn";
confirmBtn.value = "default";
confirmBtn.textContent = "Confirm";

titlePara.appendChild(titleLabel);
titleLabel.appendChild(title);
authorPara.appendChild(authorLabel);
authorLabel.appendChild(author);
genrePara.appendChild(genreLabel);
genreLabel.appendChild(genre);
form.appendChild(titlePara);
form.appendChild(authorPara);
form.appendChild(genrePara);
dialogDiv.appendChild(cancelBtn);
dialogDiv.appendChild(confirmBtn);
form.appendChild(dialogDiv);
dialog.appendChild(form);
document.body.appendChild(dialog);
addBook.addEventListener("click", () => {
  dialog.showModal();
});
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, genre.value);
  createTable();
  title.value = "";
  author.value = "";
  genre.value = "";
  //another way to insert rows and columns
  // const newRow = table.insertRow();
  // const idRow = newRow.insertCell();
  // const titleRow = newRow.insertCell();
  // const authorRow = newRow.insertCell();
  // const genreRow = newRow.insertCell();
  // const delRow = newRow.insertCell();
});
for (const key of bookLibrary) {
  console.log(key);
}
// console.log(bookLibrary[1].id);

// const deleteBtn = document.querySelectorAll(".delete");
// deleteBtn.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     const row = e.target.closest("tr");
//     // row.remove();
//     console.log(row);
//   });
// });
table.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    // Check if the clicked element has the class "delete"
    const row = event.target.closest("tr"); // Find the closest table row
    if (row) {
      const bookId = row.cells[0].textContent; // Get the book ID from the first cell (assuming ID is the first column)
      // removeBook(bookId);  Remove the book
      console.log(bookId);
    }
  }
});
// * Remove the book from the `bookLibrary` array.
// * Remove the corresponding row from the HTML table.

function removeBook(bookId) {
  // 1. Remove from bookLibrary
  const index = bookLibrary.findIndex((book) => book.id === bookId); //Find the index of the book with the matching ID
  if (index !== -1) {
    bookLibrary.splice(index, 1); // Remove the book from the array
  }

  // 2. Remove from the table (Efficient way)
  //renderBookList();  Re-render the whole table.  This is often the simplest approach.
  //createTable in my case
}

//addBookToLibrary(title.value, author.value, genre.value)
// Textbook Name: The Gentleman's Guide to Victorian Social Etiquette and Supernatural Encounters
// Author: Mrs. Evangeline Penwright
// Genre: Historical Fantasy (Humorous/Instructional)

// Textbook Name: Xenolinguistics: Deciphering Extraterrestrial Communication
// Author: Dr. Jian Li
// Genre: Science Fiction (Academic/Instructional)

// Textbook Name: Potions & Elixirs: A Comprehensive Compendium for the Aspiring Alchemist
// Author: Seraphina Blackwood
// Genre: Fantasy (Academic/Instructional)
