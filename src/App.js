import logo from './logo.svg';
import './App.css';
import Login from "./components/view/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

function App() {

  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
