import fs from "fs-extra";
import fetch from "node-fetch";

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

async function setStudentCount(courses) {
  // const response = await fetch("https://cmps356s19.github.io/data/student.json");
  const response = await fetch("http://localhost:3000/data/student.json");
  const students = await response.json();

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
