let matrix = [
    [2, 3],
    [34, 89],
    [55, 101, 34],
    [34, 89, 34, 99],
];

console.log(matrix);
matrix = matrix.flat();
let anotherMatrix = matrix.reduce((x, xs) => [ ...x, xs ], []);
console.log(anotherMatrix);
console.log(matrix);

let flatArray = matrix.flat();
let maximum = flatArray.reduce((xs, x) => x > xs ? x : xs, -Infinity);

function sum(m, a) {
    return m + a;
}

let sumValue = 0;
for (let i = 0; i < flatArray.length; i += 1) {
    sumValue = sum(sumValue, flatArray[i]);
}

function max(m, a) {
    if (a > m) {
        return a;
    } else {
        return m;
    }
}

let maxValue = -Infinity;
for (let i = 0; i < flatArray.length; i += 1) {
    maxValue = max(maxValue, flatArray[i]);
}

let sortedArray = flatArray.sort((a, b) => a - b);
let squareArray = flatArray.map((a) => a * a);

// map
function square(a) {
    return a * a;
}

for (let i = 0; i < flatArray.length; i += 1) {
    // flatArray[i] = flatArray[i] * flatArray[i];
    flatArray[i] = square(flatArray[i]);
}

console.log(squareArray);
console.log("Average:", sumValue / flatArray.length);

function concatenate(m, a) {
    return [ ...m, a ]; // m.push(a);
}

function concatenateWithoutDuplicates(m, a) {
    if (m.indexOf(a) === -1) {
        return [ ...m, a ];
    } else {
        return m;
    }
}

let list = [];

// [] [ 1, ... 10]
//
// 1 [ 2, ... 10 ]
// [ ...[], 1 ] = [ 1 ]
//
// 2 [ 3, ... 10 ]
// [ ...[ 1 ], 2] = [ 1, 2 ]

for (let i = 0; i < flatArray.length; i += 1) {
    list = concatenateWithoutDuplicates(list, flatArray[i]);
}

let withDuplicated = flatArray.reduce((xs, x) => [ ...xs, x ] , []);
let withoutDuplicated = flatArray.reduce((xs, x) => xs.indexOf(x) === -1 ? [ ...xs, x ] : xs , []);

console.log(list);
console.log(withoutDuplicated);

console.log(withoutDuplicated
    .filter((a) => a > 40)
    .reduce((s, a) => s + a)
);
