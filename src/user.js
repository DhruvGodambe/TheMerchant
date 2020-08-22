import React, { useState, useEffect } from 'react';
import firebase from './firebase/index';
import './user.css';

export default function User(props) {
	const [user, setUser] = useState({});
	const [show, setShow] = useState(false);

	useEffect(() => {
		firebase.db.collection('users').get()
			.then(data => {
				let usrr = {};
				data.forEach(doc => {
					if(doc.id === props.match.params.id){
						usrr = Object.assign({}, doc.data());
						firebase.storage.ref(`products/${usrr.img}`).getDownloadURL()
							.then(url => {
								let usr = Object.assign(usrr, {img: url});
								setUser(usr);
								setShow(true);
							})
					}
				})
			})
	}, [props.match.params.id])
	return(
		<div className="container-one">
			<div className="details">
				<h1>Details: </h1>
				<p>seller name: {user.name}</p>
				<p>product type: {user.productType}</p>
				<p>contact: {user.contact}</p>
			</div>
			<div className="image">
				{show ? <img src={`${user.img}`}/> : <div>Loading...</div> }
			</div>
		</div>
	)
}