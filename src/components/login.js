import React 		from 'react'
import { Link } 	from 'react-router-dom'
import { Form,  Button} from  'react-bootstrap'

let baseURL = 'http://localhost:3003' 

class Login extends React.Component {
	state = {
		user_name: '',
		password: '',
		number: '',
		wrongPass: false,
		wrongUser: false,
		create: false
	}

	_isMounted = false

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({
			wrongUser: false,
			wrongPass: false
		})
		fetch(baseURL + '/login', {
			method: 'POST',
			body: JSON.stringify(
				{
					user_name: this.state.user_name,
					password: this.state.password
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => 
			{
				console.log(res.status)
				if (res.status === 200) {
					console.log('logged in')
					return res.json()
				} else if (res.status === 300) {
					this.setState({
						wrongPass: true
					})
				} else if (res.status === 400) {
					this.setState({
						wrongUser: true
					})
				}
			}
		)
		.then (resJson => {
			if (!this.state.wrongPass && !this.state.wrongUser) {
				this.props.changeUser(resJson)
				if (this._isMounted) {
					this.setState({
						user_name: '',
						password: ''
					})
				}
			}	
		}).catch (error => console.log('error'))
	}

	componentDidMount() {
		this._isMounted = true
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	render () {
		return (
			<div className='container-fluid'>
				<div>
					<h1>Login to order</h1>
						<Form className='px-4 py-3' onSubmit={this.handleSubmit}>
							{
								this.state.wrongUser ? <small className='text-danger'>Wrong UserName</small> : null
							}
							<Form.Group className='form-group'>
								<Form.Label htmlFor='user_name'></Form.Label>
								<Form.Control type='text' id='user_name' name='user_name' onChange={this.handleChange} value={this.state.user_name} placeholder='User Name' required/>
							</Form.Group>
							{
								this.state.wrongPass ? <small className='text-danger'>Wrong Password</small> : null
							}
							<Form.Group className='form-group'>
								<Form.Label htmlFor='password'></Form.Label>
								<Form.Control type='password' id='password' name='password' onChange={this.handleChange} value={this.state.password} placeholder='Password' required/>
							</Form.Group>
							<Button className='btn btn-primary' type='submit' value='Sign In'>Sign in</Button>
						</Form>
					<div className='dropdown-divider' />
					<Link to='/Create'>
						<div className='dropdown-item'>
						New around here? Sign up!
						</div>
					</Link>
				</div>
			</div>
		)
	}
}

export default Login