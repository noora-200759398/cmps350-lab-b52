import fs from "fs-extra";

// const readJSON = (path) => new Promise((resolve, reject) => {
//   fs.readJSON(path, (err, data) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve(data);
//     }
//   });
// });

// fs.readJSON("data/course.json")
//   .then(courses => {
//     console.log(courses);
//
//     fs.readJSON("data/staff.json")
//       .then(staff => {
//         console.log(staff);
//
//         // we have access to courses and staff
//         // add instructor name to courses
//
//         for (const c of courses) {
//           const s = staff.find(s => s.staffNo === c.instructorId);
//           c.instructorName = s.firstname + " " + s.lastname;
//         }
//
//         console.log(courses);
//       })
//       .catch(error => console.error(error));
//   })
//   .catch(error => console.error(error));

// const p1 = fs.readJSON("data/course.json");
// const p2 = fs.readJSON("data/staff.json");

// const output = fs.readJSON("data/course.json").then(courses =>
//     fs.readJSON("data/staff.json").then(staff => {
//       // console.log(courses);
//       // console.log(staff);
//
//       for (const c of courses) {
//         const s = staff.find(s => s.staffNo === c.instructorId);
//         c.instructorName = s.firstname + " " + s.lastname;
//       }
//
//       // console.log(courses);
//       return courses;
//     })
//   )
//   .catch(error => console.error(error));
//
// output.then(result => console.log(result));

// const cb1 = n => console.log("Resolve:", n);
// const cb2 = n => console.log("Reject:", n);
//
// const p = new Promise((resolve, reject) => {
//   if (Math.random() > 0.5) {
//     // if (true) {
//     try {
//       // throw "Sample Error";
//       resolve(1);
//     } catch (error) {
//       reject(error);
//     }
//   } else {
//     reject(0);
//   }
// });
//
// p
//   .then(result => cb1(result))
//   // .then(result => cb1(result))
//   .catch(error => cb2(error));

/******************************************************************************/

function getCourses() {
  return fs.readJSON("data/course.json");
}

function setInstructorName(courses) {
  return fs.readJSON("data/staff.json").then(staff => {
    for (const c of courses) {
      const s = staff.find(s => s.staffNo === c.instructorId);
      c.instructorName = s.firstname + " " + s.lastname;
    }
    return courses;
  });
}

getCourses()
  .then(courses => setInstructorName(courses))
  .then(courses => console.log(courses))
  .catch(error => console.error(error));
