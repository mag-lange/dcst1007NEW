import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, studyprogramservice } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/study_programs">Study-programs</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to StudAdm, the student database</Card>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <Card title="Students">
        {this.students.map((student) => (
          <Row key={student.id}>
            <Column>
              <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentDetails extends Component {
  student = null;
  program = null;

  render() {
    if (!this.student) return null;
    if (!this.program) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={2}>Course:</Column>
            <Column>{this.program.course_name}</Column>
          </Row>

        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
    studentService.getEnrolledProgram(this.props.match.params.id, (program) => {
      this.program = program
    })
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event) => (this.student.name = event.currentTarget.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event) => (this.student.email = event.currentTarget.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

//---------------------------------------------------------------------------//
class StudyList extends Component {
  study_programs = [];

  render() {
    return (
      <Card title="Study Programs">
        {this.study_programs.map((study_program) => (
          <Row key={study_program.course_id}>
            <Column>
              {study_program.course_id +
              ': ' +
              study_program.course_code +
              ' --- ' +
              study_program.course_name +
              '   '}
              <NavLink to={'/study_programs/' + study_program.course_id}>{'Details'}</NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    )
  }

  mounted() {
    studyprogramservice.getStudyPrograms((study_programs) => {
      this.study_programs = study_programs
    });
  }
}

class CourseDetails extends Component {
  study_program = null
  list_names = [];

  render() {
    if (!this.study_program) return null;
    if (!this.list_names) return null;
    return (
      <div> 
        <Card title={"Details for " + this.study_program.course_name}>
          <Row>
            <Column width={2}>Course Name: </Column>
            <Column>{this.study_program.course_name}</Column>
          </Row>
          <Row>
            <Column width={2}>Course code: </Column>
            <Column>{this.study_program.course_code}</Column>
          </Row>
          <Row>
            <Column width={2}>Course Description: </Column>
            <Column>{this.study_program.course_details}</Column>
          </Row>
        </Card>
        <Card title="Group Photo of the course: ">
          <img src= {this.study_program.image_link}></img>
        </Card>
        <Card title="Students in group: ">
          <Row>
            <Column width={2}>Group Leader:</Column>
            <Column>{this.leader.name} </Column>
          </Row>
          <Row>
          <Column width={2}>Students:</Column>
          <Column width={2}>{this.list_names.name}</Column>
          </Row>
        </Card>
      </div>
    )
  }

  mounted() {
    studyprogramservice.getLeader(this.props.match.params.course_id, (leader) => {
    this.leader = leader
    });
    studyprogramservice.getOneProgram(this.props.match.params.course_id, (study_program) => {
      this.study_program = study_program;
    });
    studentService.getStudentsEnrolled(this.props.match.params.course_id, (list_names)=> {
      this.list_names = list_names
    })
  }
}

createRoot(document.getElementById('root')).render(
  <div>
    <Alert />
    <HashRouter>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/study_programs" component={StudyList} />
      <Route exact path="/study_programs/:course_id" component={CourseDetails} />

    </HashRouter>
  </div>,
);
