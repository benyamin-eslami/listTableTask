let myList = [
  { id: "fname", title: "fname", type: "text", DefaultValue: "firstname" },
  { id: "rr", title: "rr", type: "password", DefaultValue: "1" },
  { id: "+18", title: "+18", type: "checkbox", defaultValue: "." },
];

const formCreator = (myList) => {
  const formContainer = document.createElement("div");
  const form = document.createElement("form");
  formContainer.className = "formContainer";
  document.body.append(formContainer);
  formContainer.append(form);
  myList.forEach((input) => {
    form.insertAdjacentHTML(
      "afterbegin",
      `
      <label for=${input.id}>
      ${input.title}
        <input value=${input.DefaultValue} name=${input.id} type=${input.type} id=${input.id}
      /></label>
  `
    );
  });
  form.insertAdjacentHTML(
    "beforeend",
    `
    <br><br>
   <input type="submit" />
  `
  );
};

const formDataToTable = () => {
  let isTheadElementsCreated;
  let inputs = document.querySelectorAll("input:not([type='submit']");
  let labels = document.querySelectorAll("label");
  let dataTableContainer = document.createElement("div");
  let table = document.createElement("table");
  let form = document.querySelector("form");
  dataTableContainer.className = "dataTableContainer";
  document.body.append(dataTableContainer);
  dataTableContainer.append(table);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let trMain, deleteBtn;
    if (!isTheadElementsCreated) {
      const headTr = document.createElement("tr");
      let th;
      labels.forEach((label) => {
        th = document.createElement("th");
        th.innerHTML = label.getAttribute("for");
        headTr.append(th);
      });

      table.append(headTr);
      isTheadElementsCreated = true;
    }
    deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = "delete";

    trMain = document.createElement("tr");
    let td, checkboxState;
    inputs.forEach((input) => {
      td = document.createElement("td");
      if (input.type !== "checkbox") {
        td.innerHTML = input.value;
      } else {
        checkboxState = input.checked;
        td.innerHTML = `${input.name}:${checkboxState}        
        `;
      }
      trMain.append(td, deleteBtn);
      if (input.type !== "submit") {
        input.value = "";
      }
    });

    table.append(trMain);

    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", deleteFunc);
    });
    function deleteFunc(e) {
      e.target.parentElement.remove();
    }
  });
};

formCreator(myList);

formDataToTable();
