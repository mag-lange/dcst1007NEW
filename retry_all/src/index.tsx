import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Student, studentService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';
import { Car } from './Source_files/OOP1';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Home extends Component {
  render() {
    return (
      <div>
        <Card title="Welcome">Welcome to Exam Revisions</Card>
        <NavBar brand="Exam prep DCST1007 2024 Magnus Lange">
          <NavBar.Link to="/OOP1">OOP1</NavBar.Link>
          <NavBar.Link to="/OOP2">OOP2</NavBar.Link>
          <NavBar.Link to="/OOP3">OOP3</NavBar.Link>
          <NavBar.Link to="/OOP4">OOP4</NavBar.Link>
          <NavBar.Link to="/OOP5">OOP5</NavBar.Link>
          <NavBar.Link to="/OOP6">OOP6</NavBar.Link>
          <NavBar.Link to="/OOP7">OOP7</NavBar.Link>
          <NavBar.Link to="/OOP8">OOP8</NavBar.Link>
          <NavBar.Link to="/OOP9">OOP9</NavBar.Link>
          <NavBar.Link to="/OOP10">OOP10</NavBar.Link>
        </NavBar>
      </div>
    );
  }
}

class OOP1 extends Component {
  render() {
    return (
      <div>
        <Card title="OOP1"> A first try with OOP using cars</Card>
      </div>
    );
    let toyota = new Car('corolla', 'toyota', 4, 70);
    let bmw = new Car('id', 'bmw', 5, 100);
    let ferrari = new Car('expensive', 'ferrari', 1, 200);
  }
}
class OOP2 extends Component {}
class OOP3 extends Component {}
class OOP4 extends Component {}
class OOP5 extends Component {}
class OOP6 extends Component {}
class OOP7 extends Component {}
class OOP8 extends Component {}
class OOP9 extends Component {}
class OOP10 extends Component {}

let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <div>
      <Alert />
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/OOP1" component={OOP1} />
          <Route exact path="/OOP2" component={OOP2} />
          <Route exact path="/OOP3" component={OOP3} />
          <Route exact path="/OOP4" component={OOP4} />
          <Route exact path="/OOP5" component={OOP5} />
          <Route exact path="/OOP6" component={OOP6} />
          <Route exact path="/OOP7" component={OOP7} />
          <Route exact path="/OOP8" component={OOP8} />
          <Route exact path="/OOP9" component={OOP9} />
          <Route exact path="/OOP10" component={OOP10} />
        </div>
      </HashRouter>
    </div>,
  );
