import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from './Test';
import Navbar from './Nabar';
import Example from './Example';
import TestResult from './TestResult';
import UserManual from './UserManual';
import Scheme from './Scheme';
import {Translator, Translate} from 'react-auto-translate';

function App() {
  return (
    <Translator
      from='en'
      to={localStorage.getItem('lang')}
      googleApiKey='AIzaSyDqKYgBwR8A-XbZGXN5Z3Twsd6QWRJ89Wo'
    >
      <Translate>
        <div className="App" id="google_translate_element">
          <Router>
            <Navbar />
            <Routes>
              <Route path='/example' exact element={<Example />} />
              <Route path='/test' exact element={<Test />} />
              <Route path='/testresult' exact element={<TestResult />} />
              <Route path='/usermanual' exact element={<UserManual />} />
              <Route path='/scheme' exact element={<Scheme />} />
            </Routes>
          </Router>
        </div>
      </Translate>
    </Translator>
  );
}

export default App;
