const bookLibrary = [];
const tableView = document.querySelector(".tableView");
let tableHead = [];
const table = document.createElement("table");
const addBook = document.querySelector("#addBook");
function Book(id, title, author, genre, pages, readStatus) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this["read status"] = readStatus;
}

//**************Adding Books to Library**********/
function addBookToLibrary(title, author, genre, pages, readStatus) {
  let id = crypto.randomUUID();
  // console.log(`id = ${id}`);
  const newBook = new Book(id, title, author, genre, pages, readStatus);
  // console.log(newBook.valueOf());
  tableHead = Object.keys(newBook);
  bookLibrary.push(newBook);
}
addBookToLibrary(
  "Fundamentals of Applied Thaumaturgy, 3rd Edition",
  "Professor Eldrune Grimshaw",
  "Fantasy",
  "250",
  "yes"
);
addBookToLibrary(
  "Introduction to Temporal Mechanics",
  "Dr. Aris Thorne",
  "Science Fiction",
  "300",
  "no"
);
addBookToLibrary(
  "Potions & Elixirs",
  "Seraphina Blackwood",
  "Fantasy",
  "450",
  "yes"
);

//****************Create Table***************/
function createTable() {
  const tr = document.createElement("tr");

  if (!table.querySelector("thead")) {
    const thead = document.createElement("thead");
    for (const head of tableHead) {
      let th = document.createElement("th");
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
    let arr = Object.keys(book);
    let num = 0;

    Object.values(book).forEach((value) => {
      const td = document.createElement("td");
      td.className = arr[num];
      td.appendChild(document.createTextNode(value));
      tr.appendChild(td);
      num++;
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
  const status = document.querySelectorAll(".read");
  // console.log(status);
  status.forEach((st) => {
    // console.log(st);
    // console.log(`in create table ${st.textContent}`);
    createToggleSwitch(st);
  });
}
createTable();
//************ new window (dialog) to add new Book()****************//
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
const pagesPara = document.createElement("p");
const pagesLabel = document.createElement("label");
pagesLabel.textContent = "No. of Pages: ";
const readPara = document.createElement("p");
const readLabel = document.createElement("label");
readLabel.textContent = "Read Status: ";
readLabel.htmlFor = "status";
readLabel.className = "statusLabel";
readPara.className = "readStatus";
const title = document.createElement("input");
title.type = "text";
title.className = "title";
const author = document.createElement("input");
author.type = "text";
author.className = "genre";
const genre = document.createElement("input");
genre.type = "text";
genre.className = "genre";
const pages = document.createElement("input");
pages.type = "number";
pages.className = "pages";

const readSelect = document.createElement("select");
readSelect.name = "status";
readSelect.id = "status";
const disableOption = document.createElement("option");
const yesOption = document.createElement("option");
const noOption = document.createElement("option");
disableOption.disabled = true;
disableOption.selected = true;
disableOption.innerHTML = "--Read Status--";
yesOption.innerHTML = "Yes";
noOption.innerHTML = "No";
readSelect.appendChild(disableOption);
readSelect.appendChild(yesOption);
readSelect.appendChild(noOption);

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
pagesPara.appendChild(pagesLabel);
pagesLabel.appendChild(pages);
readPara.appendChild(readLabel);
readPara.appendChild(readSelect);

// readLabel.appendChild(readStatus);
form.appendChild(titlePara);
form.appendChild(authorPara);
form.appendChild(genrePara);
form.appendChild(pagesPara);
form.appendChild(readPara);

dialogDiv.appendChild(cancelBtn);
dialogDiv.appendChild(confirmBtn);
form.appendChild(dialogDiv);
dialog.appendChild(form);
document.body.appendChild(dialog);
addBook.addEventListener("click", () => {
  dialog.showModal();
});
//********************End of creating dialog********************/

//***Confirm Button****//
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(
    title.value,
    author.value,
    genre.value,
    pages.value,
    readSelect.value.toLowerCase()
  );
  for (const key of bookLibrary) {
    console.log(key);
  }
  createTable();
  title.value = "";
  author.value = "";
  genre.value = "";
  pages.value = 0;
  readSelect.value = "";

  //another way to insert rows and columns
  // const newRow = table.insertRow();
  // const idRow = newRow.insertCell();
  // const titleRow = newRow.insertCell();
  // const authorRow = newRow.insertCell();
  // const genreRow = newRow.insertCell();
  // const delRow = newRow.insertCell();
});
// for (const key of bookLibrary) {
//   console.log(key);
// }
// console.log(bookLibrary[1].id);

// const deleteBtn = document.querySelectorAll(".delete");
// deleteBtn.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     const row = e.target.closest("tr");
//     // row.remove();
//     console.log(row);
//   });
// });

//************Remove Row with a click of a button*********** */
table.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const row = e.target.closest("tr"); // Find the closest table row
    // console.log(row);
    if (row) {
      const bookId = row.cells[0].textContent; // Get the book ID from the first cell (assuming ID is the first column)
      removeBook(bookId); //Remove the book
      // console.log(bookId);
    }
  }
});

// *********** Remove the book from the `bookLibrary` array and
// ...the corresponding row from the HTML table**********/
function removeBook(bookId) {
  // 1. Remove from bookLibrary
  const index = bookLibrary.findIndex((book) => book.id === bookId); //Find the index of the book with the matching ID
  if (index !== -1) {
    bookLibrary.splice(index, 1); // Remove the book from the array
  }
  createTable();
}

//***************Create a toggle switch*****************/
function createToggleSwitch(td) {
  let rowStatus = td.textContent;
  const label = document.createElement("label");
  label.className = "toggle-switch";
  const input = document.createElement("input");
  input.type = "checkbox";
  const span = document.createElement("span");
  span.className = "slider";
  if (rowStatus === "yes") {
    input.checked = true;
  } else {
    input.checked = false;
  }
  td.innerHTML = "";
  label.appendChild(input);
  label.appendChild(span);
  td.appendChild(label);
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
