import './App.css';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
       msg:message,
       type:type
    });
    setTimeout(()=> {
      setAlert(null);
    },1500)
  }

  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert}></Alert>
        <div className="container" >

        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}></Home>}>
          </Route>
          <Route exact path="/dashboard" element={<Dashboard showAlert={showAlert}></Dashboard>}>
          </Route>
          <Route exact path="/about" element={<About></About>}>
          </Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}></Login>}>
          </Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}></Signup>}>
          </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
