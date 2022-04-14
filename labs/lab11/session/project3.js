import fs from "fs-extra";

// fs.readJSON("data/student.json")
//   .then(students => console.log(students))
//   .catch(error => console.error(error));

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// readFile("data/student.json")
//   .then(result => console.log(result))
//   .catch(error => console.error(error));

// const p1 = new Promise((resolve, reject) => {
//   if (Math.random() >= 0.5) {
//     resolve(1);
//   } else {
//     reject(0);
//   }
// });
//
// p1
//   .then(result => console.log("Resolve:", result))
//   .catch(error => console.error("Reject:", error));

/******************************************************************************/

function getStudents() {
  return fs.readJSON("data/student.json");
}

getStudents()
  .then(students => console.log(students))
  .catch(error => console.error(error));
