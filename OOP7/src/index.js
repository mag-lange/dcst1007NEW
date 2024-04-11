import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'green' }}>
          StudentList
        </NavLink>
        {' '}
        <NavLink to="/students" activeStyle={{ color: 'green' }}>
          Students
        </NavLink>
        <NavLink to="/study_program" activeStyle={{ color: 'green' }}>
          Study-Programs
        </NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>
      <h1>Welcome to Studentlists</h1>
      <b>Some clarifications and background</b>
      <p> <i>The following two scripts were used to build up the database can be found <a href="../public/studentdb.html"> here</a></i></p>
      </div>;
  
  }
}

class StudyProgram extends Component {
  study_program = [];

  render() {
    return (
            <ul>
            {this.study_program.map((study_program_entity) => ( // key is added to make the application faster
              <li key={study_program_entity.course_id}> 
                <NavLink to={'/study_program/' + study_program_entity.course_id}>{study_program_entity.course_code + ' ' + study_program_entity.course_name}</NavLink>
              </li>
            ))}
          </ul>
    )
  }

  mounted(){
    pool.query('SELECT course_id, course_code, course_name FROM study_program', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.study_program = results;
    });
  }
}

class CourseDetails extends Component {
  state = {
    study_program_entity: null,
    students: []
  };

  render() {
    const { study_program_entity, students } = this.state;
    if (!study_program_entity) return null;

    // Render the list of students
    const studentListItems = students.map(student => (
      <li key={student.id}>
        {student.id}, Name: {student.name}, Email: {student.email}
      </li>
    ));

    return (
      <div>
        <ul>
          <li>Identification Number: {study_program_entity.course_id}</li>
          <li>Course Code: {study_program_entity.course_code}</li>
          <li>Name: {study_program_entity.course_name}</li>
        </ul>
        <ul>
          <li>Students:</li>
          <ul>{studentListItems}</ul>
        </ul>
      </div>
    );
  }

  mounted() { //I am not sure what mounted() means, but I guess I will keep using it
    const courseId = this.props.match.params.course_id;
    pool.query(
      'SELECT course_id, course_code, course_name FROM study_program WHERE course_id=?',
      [courseId],
      (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        const studyProgramEntity = results[0];
        this.setState({ study_program_entity: studyProgramEntity }); //setState was recommended by ChatGPT

        // Fetch students for the course using the things we have learned from Databases
        //The problem with the structure of my database is that students to courses is a many-to-many relation, this means
        //I would need another table. For simplicity in this task, I am assuming that each student only is in one subject. 
        pool.query(
          'SELECT Students.id, Students.name, Students.email ' +
          'FROM Students ' +
          'JOIN study_program ON Students.course_id = study_program.course_id ' +
          'WHERE study_program.course_id = ?',
          [courseId],
          (error, results) => {
            if (error) {
              console.error('Error fetching students:', error);
              return;
            }
            this.setState({ students: results }); //setState() was recommended to me by ChatGPT when trying to fix Syntax errors
          }
        );
      }
    );
  }
}


class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map((student) => ( // key is added to make the application faster
          <li key={student.id}> 
            <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    pool.query('SELECT id, name FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    });

    pool.query('')
  }
}

class StudentDetails extends Component {
  state = {
    student: null,
    courseName: ''
  };
  render() {
    const { student, courseName } = this.state;
    if (!student) return null;
    return (
      <ul>
        <li>Name: {student.name}</li>
        <li>Email: {student.email}</li>
        <li>Enrolled in course: {courseName}</li>
      </ul>
    );
  }

  mounted() {
    const studentId = this.props.match.params.id;
    pool.query(
      'SELECT Students.name, Students.email, study_program.course_name ' +
      'FROM Students ' +
      'JOIN study_program ON Students.course_id = study_program.course_id ' +
      'WHERE Students.id = ?',
      [studentId],
      (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        const studentInfo = results[0];
        this.setState({ //This was also recommended to me by ChatGPT
          student: { name: studentInfo.name, email: studentInfo.email },
          courseName: studentInfo.course_name
        });
      }
    );
  }
}


createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/study_program" component={StudyProgram} />
      <Route exact path="/study_program/:course_id" component={CourseDetails} />
      <Route exact path="/students/:id" component={StudentDetails} /> 
    </div>
  </HashRouter>,
); //:id is the syntax for a variable path name
