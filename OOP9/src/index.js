import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService, courseService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Student Admin Center">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/courses">Courses</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to Student Admin Center</Card>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <div>
        <Card title="Students">
          {this.students.map((student) => (
            <Row key={student.id}>
              <Column>
                <NavLink to={'/students/' + student.id}>{student.name}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <Button.Success onClick={this.new}>New student</Button.Success>
      </div>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }

  new() {
    history.push('/new_student');
  }
}

class StudentDetails extends Component {
  student = null;
  courseName = '';

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={3}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={3}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={3}>Course:</Column>
            <Column>{this.courseName}</Column>
          </Row>
        </Card>
        <Row>
          <Column>
            <Button.Light onClick={this.edit}>Edit</Button.Light>
          </Column>
          <Column right>
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
      courseService.getcourse(this.student.courseId, (course) => (this.courseName = course.name));
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }

  delete() {
    studentService.deleteStudent(this.props.match.params.id, () => history.push('/students'));
  }
}

class StudentEdit extends Component {
  student = null;
  courses = [];

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
          <Form.Label>course:</Form.Label>
          <Form.Select
            value={this.student.courseId}
            onChange={(event) => (this.student.courseId = event.currentTarget.value)}
          >
            {this.courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
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
    courseService.getcourses((courses) => (this.courses = courses));
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

class StudentNew extends Component {
  student = { name: '', email: '', courseId: 1 };
  courses = [];

  render() {
    return (
      <div>
        <Card title="New student">
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
          <Form.Label>course:</Form.Label>
          <Form.Select
            value={this.student.courseId}
            onChange={(event) => (this.student.courseId = event.currentTarget.value)}
          >
            {this.courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.add}>Add</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    courseService.getcourses((courses) => (this.courses = courses));
  }

  add() {
    studentService.addStudent(this.student, (id) => {
      history.push('/students/' + id);
    });
  }

  cancel() {
    history.push('/students');
  }
}

class courseList extends Component {
    courses = []
    render() {
      return (
        <div>
          <Card title="Courses-Overview">
          {this.courses.map((course) => (
            <Row key={course.course_id}>
              <Column>
                <NavLink to={'/courses/' + course.course_id}>{course.course_name}</NavLink>
              </Column>
              
            </Row>
          ))}
          </Card>
        </div>
      );
    }
    mounted() {
      console.log("Getting courses")
      courseService.getcourses((courses) => {
        this.courses = courses;
      });
    }
  

  new() {
    history.push('/new_course');
  }
}


class courseDetails extends Component {
  course = null;
  students = [];
  leader = { name: '' };

  render() {
    if (!this.course) return null;

    return (
      <div>
        <Card title="course details">
          <Row>
            <Column width={3}>Name:</Column>
            <Column>{this.course.course_name}</Column>
          </Row>
          <Row>
            <Column width={3}>Course code:</Column>
            <Column>{this.course.course_code}</Column>
          </Row>
          <Row>
            <Column width={3}>student_leader_id:</Column>
            <Column>
              <img src={this.course.student_leader_id} />
            </Column>
          </Row>
          <Row>
            <Column width={3}>Students:</Column>
            <Column>
              {this.students.map((student) => (
                <Row key={student.id}>
                  <Column>{student.name}</Column>
                </Row>
              ))}
            </Column>
          </Row>
        </Card>
        <Row>
          <Column>
            <Button.Light onClick={this.edit}>Edit</Button.Light>
          </Column>
          <Column right>
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    courseService.getcourse(this.props.match.params.id, (course) => {
      this.course = course;
      studentService.getStudent(this.course.leader, (student) => {
        if (student) this.leader = student;
      });
    });
    courseService.getStudents(this.props.match.params.id, (students) => (this.students = students));
  }

  edit() {
    history.push('/courses/' + this.course.id + '/edit');
  }

  delete() {
    courseService.deletecourse(this.props.match.params.id, () => history.push('/courses'));
  }
}

class courseEdit extends Component {
  course = null;
  students = [];

  render() {
    if (!this.course) return null;

    return (
      <div>
        <Card title="Edit course">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.course.course_name}
            onChange={(event) => (this.course.course_name = event.currentTarget.value)}
          />
          <Form.Label>Course Code:</Form.Label>
          <Form.TextArea
            rows={5}
            value={this.course.course_code}
            onChange={(event) => (this.course.course_code = event.currentTarget.value)}
          />
          <Form.Label>Student Leader ID:</Form.Label>
          <Form.Input
            type="text"
            value={this.course.student_leader_id}
            onChange={(event) => (this.course.student_leader_id = event.currentTarget.value)}
          />
          <Form.Label>Leader:</Form.Label>
          <Form.Select
            value={this.course.leader}
            onChange={(event) => (this.course.leader = event.currentTarget.value)}
          >
            <option value={0} disabled></option>
            {this.students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Form.Select>
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
    courseService.getcourse(this.props.match.params.id, (course) => (this.course = course));
    courseService.getStudents(this.props.match.params.id, (students) => (this.students = students));
  }

  save() {
    courseService.updatecourse(this.course, () => {
      history.push('/courses/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/courses/' + this.props.match.params.id);
  }
}

class courseNew extends Component {
  course = { name: '', description: '', image: '', leader: 0 };

  render() {
    return (
      <div>
        <Card title="New course">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.course.name}
            onChange={(event) => (this.course.name = event.currentTarget.value)}
          />
          <Form.Label>Description:</Form.Label>
          <Form.TextArea
            rows={5}
            value={this.course.description}
            onChange={(event) => (this.course.description = event.currentTarget.value)}
          />
          <Form.Label>Image:</Form.Label>
          <Form.Input
            type="text"
            value={this.course.image}
            onChange={(event) => (this.course.image = event.currentTarget.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.add}>Add</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  add() {
    courseService.addcourse(this.course, (id) => {
      history.push('/courses/' + id);
    });
  }

  cancel() {
    history.push('/courses');
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route exact path="/students/:id" component={StudentDetails} />
    <Route exact path="/students/:id/edit" component={StudentEdit} />
    <Route exact path="/new_student" component={StudentNew} />
    <Route exact path="/courses" component={courseList} />
    <Route exact path="/courses/:id" component={courseDetails} />
    <Route exact path="/courses/:id/edit" component={courseEdit} />
    <Route exact path="/new_course" component={courseNew} />
  </HashRouter>,
);