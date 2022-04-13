import fs from "fs-extra";

// async function output() {
// const output = async () => {
//   try {
//     const courses = await fs.readJSON("data/course.json");
//     const staff = await fs.readJSON("data/staff.json");
//     const students = await fs.readJSON("data/student.json");
//
//     // at this point, courses, staff, and students are all available to use
//
//     for (const c of courses) {
//       const s = staff.find(s => s.staffNo === c.instructorId);
//       c.instructorName = s.firstname + " " + s.lastname;
//     }
//
//     for (const course of courses) {
//       course.studentCount = 0;
//     }
//
//     for (const student of students) {
//       for (const courseId of student.courseIds) {
//         courses.find(c => c.crn === courseId).studentCount += 1;
//       }
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

async function setStudentCount(courses) {
  const students = await fs.readJSON("data/student.json");

  return courses.map(course => {
    return {
      ...course,
      studentCount: students.reduce(
        (count, student) => count + (student.courseIds.indexOf(course.crn) !== -1 ? 1 : 0), 0
      )
    };
  });
}

try {
  let courses = await getCourses();
  courses = await setInstructorName(courses);
  courses = await setStudentCount(courses);
  console.log(courses);
} catch (error) {
  console.error(error);
}
