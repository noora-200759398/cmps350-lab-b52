import { BankAccount } from "./bank-account.js";
import { SavingAccount } from "./saving-account.js";
import { CurrentAccount } from "./current-account.js";
import { Bank } from "./bank.js";

let account = new BankAccount();
// console.log(account.accountNo);

account.deposit(100);
account.deposit(-100);
console.log(account.toString());

// let accounts = [
//     new BankAccount(1000, 123),
//     new BankAccount(4000, 234),
//     new BankAccount(3500, 345),
// ];

const accountInfos = [
    [123, 1000],
    [234, 4000],
    [345, 3500],
];
const accounts = accountInfos.map((ele => new BankAccount(ele[1], ele[0])));
const savingAccounts = accountInfos.map((ele => new SavingAccount(ele[1], ele[0], 500)));
const currentAccounts = accountInfos.map((ele => new CurrentAccount(ele[1], ele[0], 10)));

console.log(accounts.forEach(ele => console.log(ele.toString())));
console.log(savingAccounts.forEach(ele => console.log(ele.toString())));
console.log(currentAccounts.forEach(ele => console.log(ele.toString())));

// default arguments
let savingAccount = new SavingAccount();
console.log(savingAccount.toString());

/*
let w = { a: 0,
    c: 1,
    e: {
        f: {
            g: 0,
        },
    },
};
let s = JSON.stringify(w);
let v = JSON.parse(s);

console.log(w);
console.log(s);
console.log(v);

let pack = JSON.parse('{\n' +
    '  "name": "lab-06",\n' +
    '  "version": "1.0.0",\n' +
    '  "description": "",\n' +
    '  "main": "app.js",\n' +
    '  "type": "module",\n' +
    '  "scripts": {\n' +
    '    "start": "node app.js",\n' +
    '    "test": "echo \\"Error: no test specified\\" && exit 1"\n' +
    '  },\n' +
    '  "author": "",\n' +
    '  "license": "ISC"\n' +
    '}\n');

console.log(pack);
*/

let bank = new Bank();
bank.add(new SavingAccount(500, 123, 1000));
bank.add(new CurrentAccount(4000, 234, 10));
console.log(bank.accounts);

console.log("Balance:", bank.totalBalance());

for (account of bank.accounts) {
    if (account.type === "Current") {
        account.deductFee();
        // console.log(account.toString());
    }

    if (account.type === "Saving") {
        account.distributeBenefit(0.05);
        // console.log(account.toString());
    }
}
console.log("Balance:", bank.totalBalance());

console.log(bank);
console.log(bank.toJSON());

let s = bank.toJSON();
let b = new Bank(bank.fromJSON(s));
console.log(b);
console.log(b.toJSON());