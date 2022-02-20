/*
let i = 0;
const j = 10;

while (i < 10) {
    console.log('Number is:', i * j);
    i += 1;
}

for (let i = 0; i < 10; i += 1) {
    console.log('Number is:', i * j);
}

let s = "";

for (let i = 0; i < 10; i += 1) {
    s += " " + i * j;
}
console.log(s);


let a = [];

for (let i = 0; i < 10; i += 1) {
    a[i] = i * j;
}
console.log(a);
console.table(a);

a[10000] = 'a';
console.table(a);


a = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
// a[10000] = 'a';

for (let k in a) {
    console.log(k);
}

for (let k of a) {
    console.log(k);
}

console.table(a);
*/

/*
o = {
    name: "Jane Doe",
    age: 21,
    iq: 143,
    siblings: [
        {
            name: 'Foo',
        },
        {
            name: 'Bar',
        },
    ],
};

console.log(o);
console.log(o.name);
console.log(o.age);
console.log(o.iq);

console.table(o);
*/

/*
function min(a, b) {
    if (a > b){
        return a;
    } else {
        return b;
    }
}

let max = function (a, b) {
    if (a > b){
        return a;
    } else {
        return b;
    }
};

let avgFunction = function (a, b) {
    return (a + b) / 2;
}

let avgArrow = (a, b) => (a + b) / 2;

console.log(avgArrow(10, 11));
*/

let a = ['One', 1, true, 'Two', 'One', 'Three' ];
const printElement = function (x) {
    console.log(x);
}
a.forEach((x) => console.log(x));
a.forEach(printElement);

