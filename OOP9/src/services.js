import { pool } from './mysql-pool';
//---------------Imported from my services.js file from OOP8--------------//
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
      console.log(results);

      success(results[0]);
    });
  }
  getStudentsEnrolled(course_id, success) {
    pool.query('SELECT name FROM Students WHERE course_id = ?;', [course_id], (error, results) => {
      if (error) return console.error(error);
      console.log(results)
      success(results[0]) //!
    })
  }

  deleteStudent(id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error) => {
      if (error) return console.error(error);
      console.log('Student deleted');
      success();
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);
        success();
      },
    );
  }

  getEnrolledProgram(id, success) {
    //I know this is supposed to be a many-to-many relation, meaning that I should make an extra table to map
    console.log('getting name of course_programs');
    pool.query(
      'SELECT c.course_name, c.course_code, c.course_id FROM study_program c JOIN Students s ON c.course_id = s.course_id WHERE s.id = ?',
      [id],
      (error, results) => {
        if (error) return console.error(error);
        console.log(results);
        success(results[0]);
      },
    );
  }
}
export let studentService = new StudentService();

class StudyProgramService {
  getStudyPrograms(success) {
    pool.query('SELECT * FROM study_program', (error, results) => {
      console.log("Getting all study programs")
      if (error) return console.error(error);
      success(results);
    });
  }
  getOneProgram(course_id, success) {
    pool.query('SELECT * FROM study_program WHERE course_id=?', [course_id], (error, results) => {
      console.log("Getting one program")
      console.log(results)
      if (error) return console.error(error);
      success(results[0]);
    });
  }
  getLeader(course_id, success) {
    pool.query('SELECT s.name FROM Students s JOIN study_program c ON s.id = c.student_leader_id WHERE c.student_leader_id = (SELECT student_leader_id FROM study_program WHERE course_id = ?); ',
  [course_id], (error, results) => {
    if (error) return console.error(error);
    console.log("getting leader")
    console.log(results)
    success(results[0])
  })
  }
  updateCourse(course, success) {
    pool.query(
      'UPDATE study_program SET course_name=?, course_code=? WHERE course_id=?',
      [course.course_name, course.course_code, course.course_id],
      (error, results) => {
        if (error) return console.error(error);
        success();
      },
    );
  }
  deleteCourse(course_id, success) {
    pool.query('DELETE FROM study_program WHERE course_id=?', [course_id], (error) => {
      if (error) return console.error(error);
      console.log('Program deleted');
      success();
    });
  }
}
export let studyprogramservice = new StudyProgramService();
