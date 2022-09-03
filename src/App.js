import logo from './logo.svg';
import './App.css';
import Login from "./components/view/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import MainScreen from "./components/view/MainScreen";

function App() {

  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/main" element={<MainScreen/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
