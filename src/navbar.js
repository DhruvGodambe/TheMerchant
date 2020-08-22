import React, {useContext} from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import menu from './menu.webp';
import firebase from './firebase/index';
import {Auth} from './auth';

export default function Navbar() {
	const {currentUser, setCurrentUser, loggedIn, setLoggedIn, sidebar, setSidebar} = useContext(Auth);

	function handleLogout() {
		firebase.auth.signOut().then(res => {
			setCurrentUser({});
			setLoggedIn(false);
		})
	}

	return(
		<div className="navbar">
			<div className="changed">
				<ul>
					<li><Link to="/">Buy</Link></li>
					<li><Link to="/rent">For rent</Link></li>
					<li><Link to="/add">Add a product</Link></li>
				</ul>
			</div>
			<div className="title">
				<Link to="/">The Merchant</Link>
				<p className='subtitle'>buy, sell and rent anything online</p>
			</div>
			<div className="auth">
			<ul className="right" style={{display: loggedIn ? 'none' : 'flex'}}>
				<li><Link to={loggedIn ? `/` : `/login`}>Login</Link></li>
				<li><Link to="/signup">Sign Up</Link></li>
			</ul>
			<div className="right active" style={{display: loggedIn ? 'flex' : 'none'}}>
				<p>logged in as : {currentUser.email}</p>
				<button onClick={handleLogout}>Logout</button>
			</div>
			</div>
			<div onClick={() => setSidebar(!sidebar)} className="hamburger"><img src={menu} alt=""/></div>
		</div>
	)
}
