import fs from "fs-extra";

// const p1 = fs.readJSON("data/course.json");
// const p2 = fs.readJSON("data/staff.json");
// const p3 = fs.readJSON("data/student.json");

// const output =
//   fs.readJSON("data/course.json")
//   .then(courses => {
//     console.log("read courses");
//
//     fs.readJSON("data/staff.json")
//       .then(staff => {
//         console.log("read staff");
//
//         for (const course of courses) {
//           const stf = staff.find(s => s.staffNo === course.instructorId);
//           course.instructorName = stf.firstname + " " + stf.lastname;
//         }
//
//         // console.log(courses);
//
//         fs.readJSON("data/student.json")
//           .then(students => {
//             console.log("read students");
//             for (const course of courses) {
//               course.studentCount = 0;
//             }
//
//             for (const student of students) {
//               for (const courseId of student.courseIds) {
//                 courses.find(c => c.crn === courseId).studentCount += 1;
//               }
//             }
//
//             console.log(courses);
//             return courses;
//           })
//           .catch(error => console.error(error));
//       })
//       .catch(error => console.error(error));
//   })
//   .catch(error => console.error(error));

// fs.readJSON("data/course.json")
//   .then(courses => {
//     // courses is accessible
//     return fs.readJSON("data/staff.json")
//   })
//   .then(staff => {
//     // courses is inaccessible
//     return fs.readJSON("data/student.json")
//   })
//   .then(students => {
//     // return populated courses with instructor name and student count
//   })
//   .catch(e => console.error(e));

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

function setStudentCount(courses) {
  return fs.readJSON("data/student.json").then(students => {
    return courses.map(course => {
      return {
        ...course,
        studentCount: students.reduce(
          (count, student) => count + (student.courseIds.indexOf(course.crn) !== -1 ? 1 : 0), 0
        )
      };
    });
  });
}

getCourses()
  .then(courses => setInstructorName(courses))
  .then(courses => setStudentCount(courses))
  .then(courses => console.log(courses))
  .catch(error => console.error(error));
