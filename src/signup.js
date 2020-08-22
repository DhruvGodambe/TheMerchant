import React, {useState, useContext} from 'react';
import './login.css';
import googleLogo from './googleLogo.png';
import firebase from './firebase/index';
import {Auth} from './auth';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const {currentUser, setCurrentUser} = useContext(Auth);

	function handleSubmit(e) {
		e.preventDefault();
		if(password1 == password2){
			firebase.auth.createUserWithEmailAndPassword(email, password1)
				.then(result => {
					console.log(result);
					console.log(result.user);
					setError('');
				})
				.catch (err => {
					console.log(err);
					setError('error!!! ' + err.message)
				})	
		} else {
			console.log(password1, password2);
			setError('password does not match, please try again')
			document.getElementsByName('password1')[0].value = ""
			document.getElementsByName('password2')[0].value = ""
		}
		
	}

	function googleLogin() {
		firebase.auth.signInWithPopup(firebase.provider)
			.then(result => {
				setCurrentUser(result.user);
				console.log(result);
			})
	}

	return(
		<div className="container">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="display name"
					name="name"
					onChange={(e) => {setName(e.target.value)}}
				/>
				<input
					placeholder="email.."
					name="email"
					onChange={(e) => {setEmail(e.target.value)}}
				/>
				<input
					placeholder="password.."
					name="password1"
					type="password"
					onChange={(e) => {setPassword1(e.target.value)}}
				/>
				<input
					placeholder="confirm password.."
					name="password2"
					type="password"
					onChange={(e) => {setPassword2(e.target.value)}}
				/>
				
				<button type="submit" className="submit">Submit</button>
			</form>
			<div className={error == '' ? 'none' : 'error'}>{error}</div>
			<h2>OR</h2>

			<div className="google" onClick = {googleLogin}>
				<div className="logo"><img src={googleLogo}/></div>
				<div className="text">Login with google</div>
			</div>
		</div>
	)
}