import React, { useState, useContext } from 'react';
import './add.css';
import firebase from './firebase/index';
import {Auth} from './auth';

export default function Add() {
	const [name, setName] = useState('');
	const [productType, setProductType] = useState('');
	const [productStatus, setProductStatus] = useState('');
	const [contact, setContact] = useState('');
	const [img, setImg] = useState({});
	const {currentUser, setCurrentUser} = useContext(Auth);

	function handleSubmit(e){
		e.preventDefault();
		const user = {name, productType, productStatus, contact, img: img.name}
		setCurrentUser(user);
		firebase.db.collection('users').add(user)
			.then(res => {
				console.log("added user", res)
			})
		const storageRef = firebase.storage.ref(`products/${img.name}`).put(img);
		console.log(storageRef);
		setName('');
		setProductType('');
		setContact('');
	}

	function handleFile(e){
		const image = e.target.files[0]
		setImg(image);
	}

	return (
		<div className="form">
			<h2>Add your product</h2>
			<form onSubmit={handleSubmit}>
				<table>
					<tbody>
						<tr>
							<td>
								<label>Name: </label>
							</td>
							<td>
								<input name='name' placeholder='your name..' onChange={(e) => setName(e.target.value)}/>
							</td>
						</tr>
						<tr>
							<td>
								<label>product type: </label>
							</td>
							<td>
								<input name='productType' placeholder='product type' onChange={(e) => setProductType(e.target.value)}/>
							</td>
						</tr>
						<tr>
							<td>
								<label>want to: </label>
							</td>
							<td>
								<select name='productStatus' onChange={(e) => setProductStatus(e.target.value)}>

									<option value='buy'>BUY</option>
									<option value='sell'>SELL</option>
									<option value='rent'>RENT</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>
								<label>contact: </label>
							</td>
							<td>
								<input name='contact' placeholder='contact' onChange={(e) => setContact(e.target.value)}/>
							</td>
						</tr>
						<tr>
							<td>
								<label>Add product image: </label>
							</td>
							<td>
								<input type='file' onChange={handleFile}/>
							</td>
						</tr>
					</tbody>
				</table>
				<input type="submit" className="submit" value="submit"/>
			</form>
		</div>
	)
}