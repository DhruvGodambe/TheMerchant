import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Auth} from './auth';
import Login from './login';

export default function AuthRoute({component : Login, ...rest}) {
	const {loggedIn, setLoggedIn} = useContext(Auth);

	return (
		<Route
			render= {(props)  => (
					loggedIn ? 
					<Redirect to="/"/>
					:
					<Login {...props}/>
				)
			}
		/>
	)
}

