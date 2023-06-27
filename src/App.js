import './App.css';
import { useEffect } from 'react'
import Header from './Component/Header/Header';
import Home from './Component/Content/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Login from './Component/Login/Login';
import News from './Component/Content/News/News';
import About from './Component/Content/About/About';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import Register from './Component/Login/Register';
function App() {


  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={() => <Home />}  ></Route>
          <Route path="/login" exact component={() => <Login />}  ></Route>
          <Route path="/news" exact component={() => <News />}  ></Route>
          <Route path="/about" exact component={() => <About />}  ></Route>
          <Route path="/register" exact component={() => <Register />}  ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
