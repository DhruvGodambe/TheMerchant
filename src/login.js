import React, {useState, useContext} from 'react';
import './login.css';
import googleLogo from './googleLogo.png';
import firebase from './firebase/index';
import {Auth} from './auth';

export default function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const {currentUser, setCurrentUser} = useContext(Auth);
	const {loggedIn, setLoggedIn} = useContext(Auth);

	function handleSubmit(e) {
		e.preventDefault();
		firebase.auth.signInWithEmailAndPassword(email, password)
			.then(result => {
				setCurrentUser(result.user);
				setError('');
				setLoggedIn(true);
				console.log(loggedIn);
				props.history.push('/')
			})
			.catch (err => {
				setError('error!!! ' + err.message)
			})
	}

	function googleLogin() {
		firebase.auth.signInWithPopup(firebase.provider)
			.then(result => {
				setCurrentUser(result.user);
				console.log(result);
				setLoggedIn(true);
				console.log(loggedIn);
				props.history.push('/');
			})
	}

	return(
		<div className="container">
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="email.."
					name="email"
					onChange={(e) => {setEmail(e.target.value)}}
				/>
				<input
					placeholder="password.."
					name="password"
					type="password"
					onChange={(e) => {setPassword(e.target.value)}}
				/>
				
				<button type="submit" className="submit">Submit</button>
			</form>
			<div className={error == '' ? 'none' : 'error'}>{error}</div>
			<h2>OR</h2>

			<div className="google" onClick={googleLogin}>
				<div className="logo"><img src={googleLogo}/></div>
				<div className="text">Login with google</div>
			</div>
		</div>
	)
}