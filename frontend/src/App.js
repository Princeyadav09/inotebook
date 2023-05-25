import './App.css';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <div className="container">

        <Routes>
          <Route exact path="/" element={<Home></Home>}>
          </Route>
          <Route exact path="/about" element={<About></About>}>
          </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
