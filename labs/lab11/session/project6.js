import fs from "fs-extra";

// async function output() {
// const output = async () => {
//   try {
//     const courses = await fs.readJSON("data/course.json");
//     const staff = await fs.readJSON("data/staff.json");
//
//     for (const c of courses) {
//       const s = staff.find(s => s.staffNo === c.instructorId);
//       c.instructorName = s.firstname + " " + s.lastname;
//     }
//
//     return courses;
//   } catch (e) {
//     console.error(e);
//   }
// }

// const output = async () => {
//   let courses;
//   let staff;
//
//   return fs.readJSON("data/course.json")
//     .then(result => {
//       courses = result;
//       return fs.readJSON("data/staff.json");
//     })
//     .then(result => {
//       staff = result;
//
//       for (const c of courses) {
//         const s = staff.find(s => s.staffNo === c.instructorId);
//         c.instructorName = s.firstname + " " + s.lastname;
//       }
//
//       return courses;
//     })
//     .catch(e => console.error(e));
// }
//
// console.log(await output());

// p.then(result => console.log(result));
// console.log(await p.then(result => result).catch(error => error));

/******************************************************************************/

async function getCourses() {
  return await fs.readJSON("data/course.json");
}

async function setInstructorName(courses) {
  const staff = await fs.readJSON("data/staff.json");

  for (const c of courses) {
    const s = staff.find(s => s.staffNo === c.instructorId);
    c.instructorName = s.firstname + " " + s.lastname;
  }
  return courses;
}

try {
  let courses = await getCourses();
  courses = await setInstructorName(courses);
  console.log(courses);
} catch (error) {
  console.error(error);
}
