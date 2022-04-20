import express from "express";
import CourseService from "./service/course-service.js";
const courseService = new CourseService();

const router = express.Router();

router.get("/", courseService.renderHome);
router.get("/courses", courseService.renderCourses);

router.get("/api/programs", courseService.getPrograms);
router.get("/api/courses/:programCode", courseService.getCourses);

router.get("/api/courses/:programCode/html", courseService.renderCoursesPerProgram);

export default router;
