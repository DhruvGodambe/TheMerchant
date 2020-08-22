import React from 'react';
import './card.css';
import {Link} from 'react-router-dom';

export default function Card({user, img, id}) {
	return(
		<Link to={`/product/${id}`}>
		<div className="block">
			<img src={`${img}`} alt=""/>
			<div className="info">
				<h4>{user.name}</h4>
				<p>product: {user.productType}</p>
				<div style={{textAlign: "right"}}>
					<p>contact: {user.contact}</p>
				</div>
			</div>
		</div>
		</Link>
	)	
}