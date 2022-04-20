import CourseRepository from "../repository/course-repository.js";
const courseRepository = new CourseRepository();

export default class CourseService {
  constructor() {}

  async getPrograms(req, res) {
    try {
      const programs = await courseRepository.getPrograms();
      res.json(programs);
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async getCourses(req, res) {
    try {
      const programCode = req.params.programCode;
      const courses = await courseRepository.getCourses(programCode);
      res.json(courses);
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async renderHome(req, res) {
    try {
      res.render("home", {
        // layout: "alt",
        title: "Home",
      });
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async renderCourses(req, res) {
    try {
      res.render("courses", {
        title: "Courses",
        programs: await courseRepository.getPrograms(),
      });
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async renderCoursesPerProgram(req, res) {
    const programCode = req.params.programCode;
    try {
      const courses = await courseRepository.getCourses(programCode);
      res.render("courses-per-program", {
        layout: false,
        courses,
      });
    } catch (e) {
      res.send(500).send(e);
    }
  }
}
