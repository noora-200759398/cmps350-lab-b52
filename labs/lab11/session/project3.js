import fs from "fs-extra";

// fs.readJSON("data/student.json")
//   .then(students => console.log(students))
//   .catch(error => console.error(error));

/******************************************************************************/

function getStudents(callback) {
  return fs.readJSON("data/student.json");
}

getStudents()
  .then(students => console.log(students))
  .catch(error => console.error(error));
