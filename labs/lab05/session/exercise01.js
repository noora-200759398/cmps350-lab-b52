let i = 1;
while (i <= 100) {
    if (i % 2 == 1) {
        console.log(i);
    }
    i += 1;
}

for (let i = 1; i <= 100; i += 1) {
    if (i % 2 == 1) {
        console.log(i);
    }
}

let a = [];
for (let i = 1; i <= 10; i += 1) {
    a[i] = i;
}
console.log(a);

a.forEach((x) => {
    if (x % 2 == 1) {
        console.log(x);
    }
});

// a = a.filter((x) => x % 2 == 1);
// a = a.map((x) => x / 2);

let b = a;

a = a
    .filter((x) => x % 2 == 1)
    .map((x) => x / 2);

sum = a.reduce((x, s) => x + s, 0);
product = a.reduce((x, s) => x * s, 1);
max = a.reduce((xs, x) => x > xs ? x : xs, -Infinity);
min = a.reduce((xs, x) => x < xs ? x : xs, +Infinity);

console.log("Sum: ", sum);
console.log("Sum: ", product);
console.log("Maximum: ", max);
console.log("Minimum: ", min);

console.log(b);
b = b.reduce((xs, x) => [ ...xs, x ] , []);
b = b.reduce((xs, x) => [ x, ...xs ] , []);
console.log(b);

// s = 0;
// [1, 2, ..., 100]
// 1 [ 2, ... 100]
// s = s + 1
// [ 2, ..., 100]
// 2 [ 3, ... 100 ]
// s = s + 2
// .
// .
// .
// 99 [ 100 ]
// s = s + 99
// 100 [ ]
// s = s + 100


b = b.reduce((xs, x) => [ ...xs, x ] , []);
console.log(b);

/*
console.table(a);
console.log(sum);

let c0 = [ 1, 10, 2, 3 ];
let c1 = [ 4, 5, 6 ];

let c2 = [ ...c0, ...c1 ];

let y = 'a';
c2.unshift(y);
c2.push(y);
c2.sort();
// c2 = [ y, ...c2 ];
console.log(c2);

let c3 = [ 1, 2, 3, 4, 5, 6, 8, -1, 10 ];
c3.sort((a, b) => a - b);
console.log(c3);

let cars = [ "Saab", "Volvo", "BMW" ];
// cars.push("Toyota");
// cars.unshift("Mercedes");

cars = [ ...cars, "Toyota" ];
cars = [ "Mercedes", ...cars ];
console.log(cars);

let ax = 1;
let bx = 2;
[ ax, bx ] = [ bx, ax ];
console.log(ax, bx);

let [ mer, saa, , , tyt ] = cars;
let arr = [ mer, saa, tyt ];
console.log(...arr);
*/

