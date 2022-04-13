import fs from "fs";

// doesn't work. courses is inaccessible
// const cb1 = (err, data) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		const courses = JSON.parse(data);
//
// 		setInstructorNames(courses, cb2);
// 	}
// };
//
// const cb2 = (err, data) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		const staff = JSON.parse(data);
//
// 		const coursesWithInstructors = [];
//
// 		for (const c of courses) {
// 			const s = staff.find(s => s.staffNo === c.instructorId);
// 			coursesWithInstructors.push({
// 				name: c.courseName,
// 				instructor: s.firstname + " " + s.lastname,
// 			});
// 		}
//
// 		console.log(coursesWithInstructors);
// 	}
// };

// works. courses is in scope
// const cb1 = (err, data) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		const courses = JSON.parse(data);
//
// 		setInstructorNames(courses, (err, data) => {
// 			if (err) {
// 				console.error(err);
// 			} else {
// 				const staff = JSON.parse(data);
//
// 				for (const c of courses) {
// 					const s = staff.find(s => s.staffNo === c.instructorId);
// 					c.instructorName = s.firstname + " " + s.lastname;
// 				}
//
// 				console.log(courses);
// 			}
// 		});
// 	}
// };

// getCourses(cb1);

/******************************************************************************/

function getCourses(callback) {
	fs.readFile("data/course.json", function(err, data) {
		if (err) {
			callback(err);
		} else {
			const courses = JSON.parse(data);
			setInstructorName(courses, callback);
		}
	});
}

function setInstructorName(courses, callback) {
	fs.readFile("data/staff.json", function(err, data) {
		if (err) {
			callback(err);
		} else {
			const staff = JSON.parse(data);

			for (const c of courses) {
				const s = staff.find(s => s.staffNo === c.instructorId);
				c.instructorName = s.firstname + " " + s.lastname;
			}

			callback(null, courses);
		}
	});
}

getCourses(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});
