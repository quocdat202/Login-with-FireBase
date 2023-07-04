import './App.css';
import { useEffect, useState } from 'react'
import Header from './Component/Header';
import Home from './Component/Content/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom"
import Login from './Component/Login/Login';
import About from './Component/Content/About/About';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import Register from './Component/Login/Register';
import GameDetail from './Component/Content/GameDetail/GameDetail';
import { Button, Radio, Form, Input, message, Col, Row } from 'antd';
import Cart from './Component/Content/Carts/Cart';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState({
    userName: '',
    avt: ''
  });
  const history = useHistory()

  const config = {
    apiKey: 'AIzaSyD0oIT41ohfR7qigkqrAWaAYe3Tz0y5D-A',
    authDomain: 'spck-login.firebaseapp.com',
    // ...
  };
  firebase.initializeApp(config);

  const notification = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };




  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (userLogin) => {
      if (!userLogin) {
        // user logs out, handle something here
        console.log('User is not logged in');
        setUser(null);
        return;
      }
      console.log('Logged in user: ', userLogin);
      setUser({ ...user, userName: userLogin.displayName, avt: userLogin.photoURL, uid: userLogin.uid });
      localStorage.setItem("user", JSON.stringify(userLogin));
      notification("success", "Logged in successfully!")
      // const token = await userLogin.getIdToken();
      // console.log('Logged in user token: ', token);
    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      {contextHolder}
      <div className="App">
        <Header notification={notification} user={user} />
        <Switch>
          <Route path="/" exact component={() => <Home user={user} />}  ></Route>
          <Route path="/login" exact component={() => <Login notification={notification} user={user} />}  ></Route>
          <Route path="/cart" exact component={() => <Cart user={user} />}  ></Route>
          <Route path="/about" exact component={() => <About />}  ></Route>
          <Route path="/register" exact component={() => <Register />}  ></Route>
          <Route path="/game/:id" exact component={(match) => <GameDetail match={match} />}  ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
