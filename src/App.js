import React from 'react'
import { BrowserRouter as Router, Route }	from 'react-router-dom'
import { Redirect, useParams }							from 'react-router'

import Login from './components/login'
import NewUser from './components/newUser'
import Dashboard from './components/dashboard'
import Bar from './components/barDashboard'


import './App.css'

let userCookie = localStorage.getItem('Data')  ? JSON.parse(localStorage.getItem('Data')) : {}
let baseURL = 'http://localhost:3003' 

class App extends React.Component {
  state = {
    logged_in: userCookie.logged_in || false,
    // logged_in: true,
    user_id: userCookie.user_id || '',
    user_name: userCookie.user_name || '',
    first_name: userCookie.first_name || '',
    last_name: userCookie.last_name || '',
    number: userCookie.number || '',
    orders: userCookie.orders || [],
  }

  // componentDidMount(){
  //   if(this.state.logged_in){
  //     this.getOrders()
  //   }
  // }

  // getOrders = () => {
  //   fetch(baseURL + '/user/' + this.state.user_id, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then(resJson => {
  //     this.setState({
  //       user_id: resJson._id,
  //       first_name: resJson.first_name,
  //       last_name: resJson.last_name,
  //       number: resJson.number,
  //       orders: resJson.orders,
  //       logged_in: true
  //     })
  //     console.log('first name:', resJson.first_name)
  //     console.log('Orders: ', resJson.orders)
  //   }).catch(error => console.log({'Error:': error }))
  //   localStorage.setItem('Data', JSON.stringify(this.state))
  //   userCookie = this.state
  // }

  changeUser = (user) => {
		this.setState({
			user_name: user.user_name,
			first_name: user.first_name,
			last_name: user.last_name,
			user_id: user._id,
			orders: user.orders,
      number: user.number,
			logged_in: true
		})

		localStorage.setItem('Data', JSON.stringify(this.state))
		userCookie= this.state
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
              <Dashboard state={this.state} />
            )} />

          }
          <Route path='/Create' component={NewUser}/>
          <Route path='/' render={() => (
            <Bar state={this.state} />
          )} />
        </div>
      </Router>
    );
  }

}

export default App;