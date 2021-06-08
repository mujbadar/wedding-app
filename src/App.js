import React from 'react'
import { BrowserRouter as Router, Link, Route }	from 'react-router-dom'
import { Redirect, useParams }							from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './components/login'
import NewUser from './components/newUser'
import Dashboard from './components/dashboard'
import Bar from './components/barDashboard'


import './App.css'

let userCookie = localStorage.getItem('Data')  ? JSON.parse(localStorage.getItem('Data')) : {}
let baseURL = 'https://mujamna-wedding.herokuapp.com/ ' 

class App extends React.Component {
  state = {
    logged_in: userCookie.logged_in || false,
    admin: userCookie.amin || false,
    user_id: userCookie.user_id || '',
    user_name: userCookie.user_name || '',
    first_name: userCookie.first_name || '',
    last_name: userCookie.last_name || '',
    number: userCookie.number || '',
    orders: userCookie.orders || [],
  }


  changeUser = (user) => {
		this.setState({
			user_name: user.user_name,
			first_name: user.first_name,
			last_name: user.last_name,
			user_id: user._id,
			orders: user.orders,
      number: user.number,
			logged_in: true,
      admin: user.admin
		})

		localStorage.setItem('Data', JSON.stringify(this.state))
		userCookie= this.state
	}

  logout = () => {
		this.setState({
			user_name: '',
			first_name: '',
			last_name: '',
			user_id: '',
			orders: '',
      number: '',
			logged_in: false,
      admin: '',
		})
		localStorage.clear()
	}

  render(){
    return (
      <Router>
        <div className="App">

          {
            !this.state.logged_in ?
            <Route path='/' render={() => (
              <Login state={this.state.logged_in} changeUser={this.changeUser}/>
            )} />
              :
            <Route path='/' render={() => (
              <Dashboard state={this.state} logout={this.logout}/>
            )} />

          }
          <Link to='/Create'><div className='dropdown-item'>
						New around here? Sign up!
					</div></Link>
          <Route path='/Create' component={NewUser}/>
        </div>
      </Router>
    );
  }

}

export default App;
