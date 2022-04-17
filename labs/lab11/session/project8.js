import fs from "fs-extra";
import fetch from "node-fetch";

// const output = async () => {
//   try {
// //     let response = await fetch("https://cmps356s19.github.io/data/course.json");
// //     const courses = await response.json();
// //
// //     response = await fetch("https://cmps356s19.github.io/data/staff.json");
// //     const staff = await response.json();
//
//     const courses = await fetch("https://cmps356s19.github.io/data/course.json")
//       .then(result => result.json());
//     const staff = await fetch("https://cmps356s19.github.io/data/staff.json")
//       .then(result => result.json());
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
//
// console.log(await output());

/******************************************************************************/

async function getCourses() {
  // const response = await fetch("https://cmps356s19.github.io/data/course.json");
  const response = await fetch("http://localhost:3000/data/course.json");
  return await response.json();
}

async function setInstructorName(courses) {
  // const response = await fetch("https://cmps356s19.github.io/data/staff.json");
  const response = await fetch("http://localhost:3000/data/staff.json");
  const staff = await response.json();

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
