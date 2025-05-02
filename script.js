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

  for (const head of tableHead) {
    let th = document.createElement("th");
    th.style.borderLeft = "1px solid red";
    th.style.borderBottom = "1px solid red";
    th.appendChild(document.createTextNode(head));
    tr.appendChild(th);
    table.appendChild(tr);
  }
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
    table.appendChild(tr);
  });

  tableView.appendChild(table);
}
createTable();
// function addNewBook() {}
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
//
document.body.appendChild(dialog);
addBook.addEventListener("click", () => {
  dialog.showModal();
});
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let id = crypto.randomUUID();
  addBookToLibrary(id, title.value, author.value, genre.value);
  // const newRow = table.insertRow();
  // const idRow = newRow.insertCell();
  // const titleRow = newRow.insertCell();
  // const authorRow = newRow.insertCell();
  // const genreRow = newRow.insertCell();
  // const delRow = newRow.insertCell();
  // idRow.style.border = "1px solid red";
  // titleRow.style.border = "1px solid red";
  // authorRow.style.border = "1px solid red";
  // genreRow.style.border = "1px solid red";
  // delRow.style.border = "1px solid red";

  // idRow.textContent = id;
  // titleRow.textContent = title.value;
  // authorRow.textContent = author.value;
  // genreRow.textContent = genre.value;
  // const delBtn = document.createElement("button");
  // delBtn.textContent = "Delete Row";
  // delBtn.className = "delete";
  // delRow.appendChild(delBtn);
  // delBtn.addEventListener("click", (e) => {
  //   const row = e.target.closest("tr");
  //   row.remove();
  // });
  // table.innerHTML = "";
  createTable();
  title.value = "";
  author.value = "";
  genre.value = "";
  // for (const key of bookLibrary) {
  //   console.log(key);
  // }
});
// for (const key of bookLibrary) {
//   console.log(key);
// }
// console.log(bookLibrary[1].id);

const deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    row.remove();
  });
});

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
