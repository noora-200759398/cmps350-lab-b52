import { Repository } from './repository.js';

const repository = new Repository();

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  }
  document.querySelector("#theme").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const accountsTypeElement = document.querySelector("#accounts-type");
  if (accountsTypeElement) {
    fetchRenderAccounts(accountsTypeElement.value);
    accountsTypeElement.addEventListener("change", async () => {
      await fetchRenderAccounts(accountsTypeElement.value);
    });
  }

  const newAccountFormElement = document.querySelector("#new-account-form");
  if (newAccountFormElement) {
    newAccountFormElement.addEventListener("submit", async (event) => await createAccount(event));
    document.querySelector("#account-type").addEventListener("change", (event) => changeAccountType(event))
  }
});

function changeAccountType(event) {
  const value = document.querySelector("#account-type").value;
  document.querySelector("#account-monthly-fee-label").hidden = value !== "current";
  document.querySelector("#account-monthly-fee").hidden = value !== "current";
  document.querySelector("#account-monthly-fee").required = value === "current";
  document.querySelector("#account-minimum-balance-label").hidden = value !== "savings";
  document.querySelector("#account-minimum-balance").hidden = value !== "savings";
  document.querySelector("#account-minimum-balance").required = value === "savings";
}

async function createAccount(event) {
  event.preventDefault();

  const formData = new FormData(document.querySelector("#new-account-form"));
  const fields = Object.fromEntries(formData.entries());
  const account = {
    type: fields["account-type"],
    balance: fields["account-balance"],
    minimumBalance: fields["account-minimum-balance"],
    monthlyFee: fields["account-monthly-fee"],
  };

  const data = await repository.createAccount(account);
  document.querySelector("#new-account-form").reset();
}

async function deleteAccount(event, id) {
  const response = await repository.deleteAccount(id);
  document.querySelector(`tr[data-id="${id}"]`).remove();
}

async function fetchAccounts(type) {
  const data = await repository.readAccounts(type);
  return data;
}

async function fetchRenderAccounts(type) {
  const data = await fetchAccounts(type);
  document.querySelector("#accounts-table > tbody").replaceChildren();
  // document.querySelector("#accounts-table > tbody").innerHTML = "";
  data.forEach(renderAccount);
}

function renderAccount(account) {
  const accountElement = document.createElement("tr");
  accountElement.dataset.id = account.id;
  accountElement.classList.add("account");

  const fields = ["id", "type", "balance"];
  for (const key of fields) {
    const element = document.createElement("td");
    element.innerText = account[key];
    accountElement.appendChild(element);
  }

  // `<td>${account.id}</td><td>${account.type}</td><td>${account.balance}</td>`

  const actionsElement = document.createElement("td");
  actionsElement.classList.add("account-actions");

  const updateActionElement = document.createElement("i");
  updateActionElement.classList.add("account-action", "fa", "fa-edit");
  updateActionElement.addEventListener("click", async (event) => {});
  actionsElement.appendChild(updateActionElement);

  if (account.balance === 0) {
    const deleteActionElement = document.createElement("i");
    deleteActionElement.classList.add("account-action", "fa", "fa-trash");
    deleteActionElement.addEventListener("click", async (event) => { await deleteAccount(event, account.id) });
    actionsElement.appendChild(deleteActionElement);
  }

  accountElement.appendChild(actionsElement);

  document.querySelector("#accounts-table > tbody").appendChild(accountElement);
}
