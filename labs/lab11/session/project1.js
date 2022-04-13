import fs from "fs";

// let students;

// function callback(err, data) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(data);
//     students = data;
//   }
// }

// function logStudents(students) {
//   for (const student of students) {
//     console.log(student.studentId);
//   }
// }

// console.log(students);
// setTimeout(() => console.log(students), 100);

/******************************************************************************/

// let increase = num => num + 1;
// let double = num => num * num;
//
// let callback = () => console.log("Timeout");
//
// function perform(x, operation) {
//   return operation(x);
// }
//
// let x = 9;
// x = perform(x, double);
// console.log(x);
//
// let wait = (n) => setTimeout(callback, n);
// wait(1000);

// element.addEventListener("click", callback);
// element.addEventListener("change", callback);

/******************************************************************************/

function getStudents(callback) {
  fs.readFile("data/student.json", function(err, data) {
    if (err) {
      callback(err);
    } else {
      const students = JSON.parse(data);
      callback(null, students);
    }
  });
}

getStudents(function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
