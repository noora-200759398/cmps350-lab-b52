import promptSync from "prompt-sync";
const prompt = promptSync();

let n = prompt("Age please? ");
console.log(n);

let students = [];
for (let i = 0; i < 5; i += 1) {
    let nameInput = prompt("Student name: ");
    let genderInput = prompt("Student gender: ");

    students[i] = {
        name: nameInput,
        gender: genderInput,
        age: Math.random() * (35 - 17) + 17,
        grade: Math.random() * (100 - 0) + 0,
    };
}

console.log(students);