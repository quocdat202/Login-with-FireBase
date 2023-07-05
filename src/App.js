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
import { Button, Radio, Form, Input, message, Col, notification } from 'antd';
import Cart from './Component/Content/Carts/Cart';
import User from './Component/Content/InforUser/User';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState({
    userName: '',
    avt: ''
  });
  const [api, contextHolderNotification] = notification.useNotification();

  const history = useHistory()

  const config = {
    apiKey: 'AIzaSyD0oIT41ohfR7qigkqrAWaAYe3Tz0y5D-A',
    authDomain: 'spck-login.firebaseapp.com',
    // ...
  };
  firebase.initializeApp(config);

  const notificationLogin = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
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
      setUser({ ...user, userName: userLogin.displayName, avt: userLogin.photoURL, uid: userLogin.uid, email: userLogin.email });
      localStorage.setItem("user", JSON.stringify(userLogin));
      notificationLogin("success", "Logged in successfully!")
    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      {contextHolder}
      <div className="App">
        <Header notificationLogin={notificationLogin} user={user} />
        {contextHolderNotification}
        <Switch>
          <Route path="/" exact component={() => <Home user={user} openNotificationWithIcon={openNotificationWithIcon} />}  ></Route>
          <Route path="/login" exact component={() => <Login notificationLogin={notificationLogin} user={user} />}  ></Route>
          <Route path="/cart" exact component={() => <Cart user={user} />}  ></Route>
          <Route path="/about" exact component={() => <About />}  ></Route>
          <Route path="/register" exact component={() => <Register />}  ></Route>
          <Route path="/information-user" exact component={() => <User user={user} />}  ></Route>
          <Route path="/game/:id" exact component={(match) => <GameDetail match={match} />}  ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
