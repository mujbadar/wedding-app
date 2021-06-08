import React 		from 'react'
import { Link } 	from 'react-router-dom'
import NewOrder from './newOrder'
import {Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Bar from './barDashboard'
import User from './userDashboard'

// let baseURL = 'https://mujamna-wedding.herokuapp.com/'


class Dashboard extends React.Component {
	state = {
		orders : [],
        number : this.props.state.number,
        first_name : this.props.state.first_name,
        last_name : this.props.state.last_name,
        user_id : this.props.state.user_id,
		admin : this.props.state.admin
	}

	//  log = () => {
	// 	 console.log(this.state.orders)
	// 	 console.log(this.state.user_id)
	//  }

	render () {
		return(
		<div>
			{
		this.state.admin? <Bar state={this.state} logout={this.props.logout}/> : <User state={this.state} logout={this.props.logout}/>
			}
		 </div>
		)
	}
}

export default Dashboard

						