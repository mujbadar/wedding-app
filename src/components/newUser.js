import React 		from 'react'

let baseURL = 'https://desolate-caverns-32861.herokuapp.com/'

class NewUser extends React.Component {
	state = {
		user: [],
		userName: '',
		password: '',
		firstName: '',
		lastName: '',

	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value})
	}

	refreshPage = () => {
		window.location.reload(false)
	}

	handleAddUser = (user) => {
		const copyUser = [...this.state.user]
		copyUser.unshift(user)
		this.setState({
			user: copyUser,
			user_name: '',
			password: '',
			first_name: '',
			last_name: '',
            user_number: '',
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + '/user/new', {
			method: 'POST',
			body: JSON.stringify(
				{
					user_name: this.state.user_name,
					password: this.state.password,
					first_name: this.state.first_name,
					last_name: this.state.last_name,
                    user_number: '+1' + this.state.user_number
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			console.log(resJson)
			this.handleAddUser(resJson)
			this.setState({
				userName: '',
				password: '',
				firstName: '',
				lastName: '',
			})
			this.refreshPage()
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='container bg-white rounded'>
					<br />
					<h1>Create Account</h1>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor='userName'></label>
						<input className='form-control' type='text' id='user_name' name='user_name' onChange={this.handleChange} value={this.state.user_name} placeholder='User Name' required/>
						<label htmlFor='password'></label>
						<input className='form-control' type='password' id='password' name='password' onChange={this.handleChange} value={this.state.password} placeholder='Password' required/>
						<label htmlFor='firstName'></label>
						<input className='form-control' type='text' id='first_name' name='firs_name' onChange={this.handleChange} value={this.state.first_name} placeholder='First Name' required/>
						<label htmlFor='lastName'></label>
						<input className='form-control' type='text' id='last_name' name='last_name' onChange={this.handleChange} value={this.state.last_name} placeholder='Last Name' required/>
                        <label htmlFor='lastName'></label>
						<input className='form-control' type='text' id='user_number' name='user_number' onChange={this.handleChange} value={this.state.user_number} placeholder='Phone Number' required/>
						<br />
						<input className='btn btn-primary' type='submit' value='New User'/>
					</form>
					<br />
				</div>
			</div>
		)
	}
}

export default NewUser