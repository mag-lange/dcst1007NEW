import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=?, course_id=? WHERE id=?',
      [student.name, student.email, student.courseId, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      },
    );
  }

  addStudent(student, success) {
    pool.query(
      'INSERT INTO Students (name, email, course_id) VALUES (?, ?, ?)',
      [student.name, student.email],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      },
    );
  }

  deleteStudent(id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

class CourseService {
  getcourses(success) {
    console.log("GetCourses Method was called, attempting to get courses")
    pool.query('SELECT * FROM study_program', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
}

  getcourse(id, success) {
    pool.query('SELECT * FROM study_program WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getStudents(courseId, success) {
    pool.query('SELECT * FROM Students WHERE course_id = ?', [courseId], (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      success(results);
    });
  }

  updatecourse(course, success) {
    pool.query(
      'UPDATE study_program SET course_id=?, course_code=?, course_name=?, student_leader_id=? WHERE course_id=?',
      [course.name, course.description, course.image, course.leader, course.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      },
    );
  }

  addcourse(course, success) {
    pool.query(
      'INSERT INTO study_program (name, description, image, leader) VALUES (?, ?, ?, 0)',
      [course.name, course.description, course.image],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      },
    );
  }

  deletecourse(id, success) {
    pool.query('DELETE FROM study_program WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

export let studentService = new StudentService();
export let courseService = new CourseService();