import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, studyprogramservice } from './services';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/study_programs" activeStyle={{ color: 'darkblue' }}>
          Study Programs
        </NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={'/students/' + student.id + '/edit'}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudyProgramList extends Component {
  study_programs = [];
  render() {
    return (
      <ul>
        {this.study_programs.map((study_program) => (
          <li key={study_program.course_id}>
            {study_program.course_id +
              ': ' +
              study_program.course_code +
              ' --- ' +
              study_program.course_name +
              '   '}
            <NavLink to={'/study_programs/' + study_program.course_id + '/edit'}>{'Edit'}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studyprogramservice.getStudyPrograms((study_programs) => {
      this.study_programs = study_programs;
    });
  }
}

class StudyProgramEdit extends Component {
  study_program = null;
  render() {
    if (!this.study_program) return null;
    return (
      <div>
        {' '}
        <div>
          Name:{' '}
          <input
            type="text"
            value={this.study_program.course_name}
            onChange={(event) => (this.study_program.course_name = event.currentTarget.value)}
          />
          Course Code:{' '}
          <input
            type="text"
            value={this.study_program.course_code}
            onChange={(event) => (this.study_program.course_code = event.currentTarget.value)}
          />
          <button type="button" onClick={this.save}>
            Save
          </button>
          <button type="button" onClick={this.delete}>
            Delete Program (CAUTION)
          </button>
        </div>
      </div>
    );
  }

  mounted() {
    studyprogramservice.getOneProgram(this.props.match.params.course_id, (study_program) => {
      this.study_program = study_program;
    });
  }

  save() {
    studyprogramservice.updateCourse(this.study_program, () => {
      history.push('/study_programs');
    });
  }

  delete() {
    studyprogramservice.deleteCourse(this.study_program.course_id, () => {
      history.push('/study_programs');
    });
  }
}

class StudentEdit extends Component {
  student = null;
  co = null;
  render() {
    if (!this.student) return null;
    if (!this.co) return null;
    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.student.name}
          onChange={(event) => (this.student.name = event.currentTarget.value)}
        />
        Email:{' '}
        <input
          type="text"
          value={this.student.email}
          onChange={(event) => (this.student.email = event.currentTarget.value)}
        />
        <button type="button" onClick={this.save}>
          Save
        </button>
        <button type="button" onClick={this.delete}>
          Delete student (CAUTION)
        </button>
        <br></br>
        <br></br>
        <h3>Enrolled in the following course: </h3>
        {this.co.course_code + '---' + this.co.course_name}
      </div>
    );
  }
  mounted() {
    studentService.getEnrolledProgram(this.props.match.params.id, (co) => {
      this.co = co;
    });
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }
  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students');
    });
  }

  delete() {
    studentService.deleteStudent(this.student.id, () => {
      history.push('/students');
    });
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route path="/students/:id/edit" component={StudentEdit} />
    <Route exact path="/study_programs" component={StudyProgramList} />
    <Route path="/study_programs/:course_id/edit" component={StudyProgramEdit} />
  </HashRouter>,
);
