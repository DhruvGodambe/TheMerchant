import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase/index';

import Card from './card';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Add from './add';
import User from './user';
import { Auth } from './auth';
import Login from './login';
import Signup from './signup';
import AuthRoute from './authRoute';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [renters, setRenters] = useState([]);
  const [sidebar, setSidebar] = useState(false)

  useEffect(() => {
    firebase.db.collection('users').get()
    .then(data => {
      let seller = [];
      let renter = [];
      data.forEach(doc => {
        firebase.storage.ref(`products/${doc.data().img}`).getDownloadURL()
          .then(url => {
            users.push({
              data: doc.data(),
              img: url,
              id: doc.id
            })
            seller = users.filter(val => (val.data.productStatus === 'sell'))
            renter = users.filter(val => (val.data.productStatus === 'rent'))
            setUsers(users);
            setSellers(seller);
            setRenters(renter);
          })
      });

    })
    firebase.auth.onAuthStateChanged((user) => {
      if(user){
        setCurrentUser(user);
        setLoggedIn(true);
      }
    })
    console.log(loggedIn);
  }, [])   
  const sellerCards = sellers.map((val, ind) => <Card key={val.id} id={val.id} user={val.data} img={val.img} />);
  const renterCards = renters.map((val, ind) => <Card key={val.id} id={val.id} user={val.data} img={val.img}/>)
  return (
    <Auth.Provider
      value = {{
        currentUser, setCurrentUser, loggedIn, setLoggedIn,
        sidebar, setSidebar
      }}>
      <div className="App">
        <Router>
          <Navbar/>
          <Sidebar/>
          <img src="./hamburger.jpg" alt=""/>
          <Switch>
            <Route exact path='/'>
              <div className="offset">
                {sellerCards}
              </div>
            </Route>
            <Route exact path='/rent'>
              <div className="offset">
                {renterCards}             
              </div>
            </Route>
            <Route exact path='/add'>
              <Add/>
            </Route>
            <Route exact path="/product/:id" component={User}/>
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/signup">
              <div className="offset">
                <Signup/>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>      
    </Auth.Provider>
  );
}

export default App;
