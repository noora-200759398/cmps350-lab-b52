// let samples = [];
let db = new Localbase('census');
// db.collection("samples").delete();

document.addEventListener("DOMContentLoaded", async () => {
    let form = document.querySelector("#form");
    form.addEventListener("submit", event => submitForm(event));

    let limit = document.querySelector("#noOfRows");
    limit.addEventListener("change", loadTable);
    await loadTable();
});

async function loadTable() {
    document.querySelector("#countries").innerHTML = "";
    let limitValue = parseInt(document.querySelector("#noOfRows").selectedOptions[0].value);
    // let samples = await db.collection('samples').orderBy("country", "desc").limit(limitValue).get();
    let samples = await db.collection('samples').limit(limitValue).get();
    samples.forEach(sample => createRowHTML(sample));
}

async function submitForm(event) {
    event.preventDefault();
    const formElement = document.querySelector("#form");
    const data = new FormData(formElement);

    // const entries = {};
    // for (const [key, value] of data.entries()) {
    //     entries[key] = value;
    // }
    // return entries;

    const sample = Object.fromEntries(data.entries());
    // const samples = await db.collection('samples').get();

    if (document.querySelector("#add-btn").dataset.mode === "update") {
        // const index = samples.map(sample => sample.id).indexOf(sample.id);
        // samples[index] = sample;
        await db.collection("samples").doc({ id: sample.id }).get();
        updateRowHTML(sample);
        formElement.reset();
    } else {
        sample.id = Date.now();
        // samples.push(sample);
        await db.collection("samples").add(sample);
        createRowHTML(sample);
        formElement.reset();
    }
}

function createRowHTML(sample) {
    // const sampleHTML = ``;
    // let countries = document.querySelect("#countries");
    // countries.innerHTML += sampleHTML;

    let tableHeader = document.querySelector("#countries > th");
    if (!tableHeader) {
        tableHeader = document.createElement("th");
        let nameHeader = document.createElement("td");
        let populationHeader = document.createElement("td");
        nameHeader.innerText = "Country";
        populationHeader.innerText = "Population";
        tableHeader.appendChild(nameHeader);
        tableHeader.appendChild(populationHeader);
        document.querySelector("#countries").appendChild(tableHeader);
    }

    let sampleRow = document.createElement("tr");
    sampleRow.dataset.id = sample.id;
    let countryName = document.createElement("td");
    countryName.innerText = sample.country;
    sampleRow.appendChild(countryName);

    let countryPopulation = document.createElement("td");
    countryPopulation.innerText = sample.population;
    sampleRow.appendChild(countryPopulation);

    let countryActions = document.createElement("td");
    let editAction = document.createElement("button");
    editAction.innerText = "Edit";
    editAction.addEventListener("click", event => editRow(event, sample));

    let deleteAction = document.createElement("button");
    deleteAction.innerText = "Delete";
    deleteAction.addEventListener("click", event => deleteRow(event, sample));

    countryActions.appendChild(editAction);
    countryActions.appendChild(deleteAction);
    sampleRow.appendChild(countryActions);

    document.querySelector("#countries").appendChild(sampleRow);
}

function updateRowHTML(sample) {
    const sampleRow = document.querySelector(`#countries > tr[data-id="${sample.id}"]`);
    sampleRow.children[0].innerText = sample.country;
    sampleRow.children[1].innerText = sample.population;

    document.querySelector("#add-btn").value = "Add";
    document.querySelector("#add-btn").dataset.mode = "add";
}

async function editRow(event, sample) {
    // load sample details in form inputs
    sample = await db.collection('samples').doc( { id: sample.id }).get();
    const inputID = document.querySelector("#id");
    const inputName = document.querySelector("#country");
    const inputPopulation = document.querySelector("#population");

    inputID.value = sample.id;
    inputName.value = sample.country;
    inputPopulation.value = sample.population;

    document.querySelector("#add-btn").value = "Update";
    document.querySelector("#add-btn").dataset.mode = "update";
}

async function deleteRow(event, sample) {
    // samples = samples.filter(sample => sample.id != id);
    await db.collection('samples').doc({ id: sample.id }).delete();

    try {
        document.querySelector(`#countries > tr[data-id="${sample.id}"]`).remove();
    } catch (e) { }

    // check if the table is empty and remove the headers
    const samples = await db.collection('samples').get();
    if (!samples.length) {
        document.querySelector("#countries > th").remove();
    }
}
