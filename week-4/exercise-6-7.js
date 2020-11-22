(function createTable() {
  const theadCaptions = ["Evidence Rating", "Effect", "Efficacy", "Consensus", "Comments"];
  const tbodyRows = [
    ["A", "Power Output", "3 Stars", "80% 18 studies", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto blanditiis comque doloribus, eius enim est exercitationem harum italique iure iusto magni nam nobis? Alias aspernatur deleniti deserunt ea veniam!"],
    ["B", "Weight", "4 Stars", "100% 65 studies", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad corposit comque, dignissimos eaque excepturi fuga in ipsa laudantium mollitia obcaecati"]
  ];

  let divContainer = document.createElement("div");
  divContainer.style.width = "90%";
  divContainer.style.margin = "10px auto";

  let table = document.createElement('table');
  let tableCaption = document.createElement('caption');
  
  tableCaption.innerText = "Table caption";
  table.appendChild(tableCaption);

  let tableHead = document.createElement("thead");
  let tableHeadTr = document.createElement("tr");

  for (let columnCaption of theadCaptions) {
    let theadCaption = document.createElement("th");
    theadCaption.innerText = columnCaption;
    tableHeadTr.appendChild(theadCaption);
  }

  tableHead.appendChild(tableHeadTr);
  table.appendChild(tableHead);

  let tableBody = document.createElement("tbody");

  for (let row of tbodyRows) {
    let tbodyTr = document.createElement("tr");
    for (let cell of row) {
      let cellTd = document.createElement("td");
      cellTd.innerText = cell;
      tbodyTr.appendChild(cellTd);
    }
    tableBody.appendChild(tbodyTr);
  }

  table.appendChild(tableBody);
  divContainer.appendChild(table);

  let button = document.createElement("button");
  button.type = "button";
  button.innerText = "Reverse rows";
  button.style.margin = "10px auto";
  button.style.float = "right";

  button.onclick = function () {
    let table = document.getElementsByTagName("table")[0];
    let tableBody = table.getElementsByTagName("tbody")[0];
    let tableRows = tableBody.getElementsByTagName("tr");
    let newTableBody = document.createElement("tbody");

    let rowsArray = [...tableRows];
    rowsArray = rowsArray.reverse();
    for (let row of rowsArray) {
      newTableBody.appendChild(row);
    }
    table.replaceChild(newTableBody, tableBody);
  }

  divContainer.appendChild(button);
  document.body.appendChild(divContainer);
})();

function changeTableRows() {
  let table = document.getElementsByTagName("table")[0];
  let tableBody = table.getElementsByTagName("tbody");

  let tableRows = tableBody.getElementsByTagName("tr");
  let newTableBody = document.createElement("tbody");

  for (let rowIndex = tableRows.lenght; rowIndex > 0; rowIndex--) {
    newTableBody.appendChild(tableRows[rowIndex - 1]);
  }

  table.replaceChild(newTableBody, tableBody);
}