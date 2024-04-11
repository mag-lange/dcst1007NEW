import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="menu-container">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Overview and Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <NavLink to="/" exact activeStyle={{ color: 'green' }}>
                  John Smith Resume
                </NavLink>
              </td>
            </tr>
            <tr>
              <td>
                <NavLink to="/page1" exact activeStyle={{ color: 'green' }}>
                  Education
                </NavLink>
              </td>
            </tr>
            <tr>
              <td>
                <NavLink to="/page2" exact activeStyle={{ color: 'green' }}>
                  Job-experience
                </NavLink>
              </td>
            </tr>
            <tr>
              <td>
                <NavLink to="/page3" exact activeStyle={{ color: 'green' }}>
                  Other interests
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
//This should be made smaller
class Home extends Component {
  render() {
    return (
      <div>
        {' '}
        <b>
          {' '}
          Resume of tech support worker <i>John Adam Smith</i>{' '}
        </b>{' '}
        <br></br>
        <img src="../images/John_Smith.jpg"></img>
      </div>
    );
  }
}

class Page1 extends Component {
  render() {
    return (
      <div>
        {' '}
        <h1>Education Background</h1>
        <div>
          <div>Bachelor of Science in Computer Science</div>
          <div>2018 - 2022</div>
          <div>
            <p>University of Oxford </p>
            <p>
              Majored in communication services and impersionation attempts. Great with old ladies
              (Especially wealthy ones)
            </p>
          </div>
        </div>
        <div>
          <div>High School Diploma</div>
          <div>2014 - 2018</div>
          <div>
            <p>Student at Westminster school where I learned to scam people</p>
          </div>
        </div>
      </div>
    );
  }
}

class Page2 extends Component {
  render() {
    return (
      <div>
        {' '}
        <h1>Job Experience</h1>
        <div>
          <h2>Tech Support Worker</h2>
          <p>Microsofter</p>
          <p>Silikon Valley, CA, USA</p>
          <ul>
            <li>Responsibile for helping people get refunds</li>
            <li>
              Earned the company many thousands of dollars in revenue through mostly old ladies
            </li>
          </ul>
        </div>
        <div>
          <h2>Communication artist</h2>
          <p>Applo</p>
          <p>Chicago</p>
          <ul>
            <li>Worked as a communicator at Applo</li>
            <li>Developing scripts of how to approach qualifiers of a very real refund</li>
            <li>Making sure they definetly DON'T send 4000$ instead of 400$</li>
          </ul>
        </div>
      </div>
    );
  }
}
class Page3 extends Component {
  render() {
    return (
      <div>
        {' '}
        <h1> Other interests </h1>
        <div className="image-container">
          <img src="../images/cooking.JPG" alt="Cookimg"></img>
          <img src="../images/Eating.webp" alt="Eating"></img>
          <img src="../images/music.webp" alt="Playing Music"></img>
          <img src="../images/Speaking_truth.webp" alt="Speaking Truth"></img>
          <img src="../images/vacation.jpg" alt="On Vacation"></img>
        </div>
      </div>
    );
  }
}
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
      <Route path="/page3" component={Page3} />
    </div>
  </HashRouter>,
);
