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
import Desk from "./components/view/Desk";

function App() {

  return (
    <div>
        <Router>
            <Routes>
                <Route path="/ToDoDesk" element={<Login/>}></Route>
                <Route path="/ToDoDesk/main" element={<MainScreen/>}/>
                <Route path="/ToDoDesk/desk/:id" element={<Desk/>}/>

            </Routes>
        </Router>
    </div>
  );
}

export default App;
