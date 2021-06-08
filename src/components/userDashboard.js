import React 		from 'react'
import { Link } 	from 'react-router-dom'
import NewOrder from './newOrder'
import {Table, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

let baseURL = 'https://desolate-caverns-32861.herokuapp.com/'

class User extends React.Component {
    intervalID;

	state = {
		orders : [],
        number : this.props.state.number,
        first_name : this.props.state.first_name,
        last_name : this.props.state.last_name,
        user_id : this.props.state.user_id,
		admin : this.props.state.admin
	}

	findOrders = () => {
		fetch(baseURL + 'order/' + this.state.user_id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			console.log(resJson)
			this.setState({
				orders: resJson
			})
			console.log('User orders found')
            this.intervalID = setTimeout(this.findOrders.bind(this), 10000);
		}).catch (error => console.error({'Error': error}))
	}

	componentDidMount () {
        this.findOrders()
	}

	componentWillUnmount(){
		clearInterval(this.intervalID)
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className="jumbotron bg-white">
					<h1 className="display-4">Hello {this.state.first_name} {this.state.last_name} </h1>
                    <Button className='btn-danger' onClick={this.props.logout}>Logout</Button>
                    {
                    this.state.orders.length == 1 ?
                    <p>You have ordered: {this.state.orders.length} drink</p>
                    :
                    <p>You have ordered: {this.state.orders.length} drinks</p>
                    }
					
					<p className="lead"></p>
					<hr className="my-4" />
					<p></p>
				</div>

				<div className="table-responsive">
					<Table striped bordered hover>
						<thead className="thead-dark">
							<tr>
								<th scope="col">Drink</th>
								<th scope="col">Chaser</th>
								<th scope="col">Quantity</th>
                                <th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.orders.reverse().map((order, index) => {
									if(order.status ==  'submitted'){
										return (
											<tr key={index}>
												<th>{order.name}</th>
												<th>{order.ingredients}</th>
												<th>{order.quantity}</th>
												<th>{order.status}</th>
											</tr>
										)
									}
									else{
										return (
											<tr key={index}>
												<th>{order.name}</th>
												<th>{order.ingredients}</th>
												<th>{order.quantity}</th>
												<th>{order.status}</th>
											</tr>
										)
									}

								})
							}
						</tbody>
					</Table>
				</div>
                <NewOrder state={this.state}/>
			</div>
		)
	}
}

export default User