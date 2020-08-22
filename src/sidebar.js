import React, { useState, useContext} from 'react';
import {Auth} from './auth';
import {Link} from 'react-router-dom';
import firebase from './firebase/index';
import './sidebar.css';

export default function Sidebar() {
	const {currentUser, loggedIn, setCurrentUser, setLoggedIn, sidebar, setSidebar} = useContext(Auth);

	function handleLogout() {
		firebase.auth.signOut().then(res => {
			setCurrentUser({});
			setLoggedIn(false);
		})
	}

	return(
		<div className='sidebar' style={{display: sidebar ? 'flex' : 'none'}} >
				<ul>
					<li><Link onClick={() => setSidebar(false)} to="/">Buy</Link></li>
					<li><Link onClick={() => setSidebar(false)} to="/rent">For rent</Link></li>
					<li><Link onClick={() => setSidebar(false)} to="/add">Add a product</Link></li>
					<li><Link onClick={() => setSidebar(false)} to={loggedIn ? `/` : `/login`}>Login</Link></li>
					<li><Link onClick={() => setSidebar(false)} to="/signup">Sign Up</Link></li>
				</ul>
				<div className="right active" style={{display: loggedIn ? 'flex' : 'none'}}>
					<p>logged in as : {currentUser.email}</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
		</div>
	)
}