import React 		from 'react'
import { Link } 	from 'react-router-dom'
import NewOrder from './newOrder'

let baseURL = 'http://localhost:3003/'

class Dashboard extends React.Component {
	state = {
		orders : [],
        number : this.props.state.number,
        first_name : this.props.state.first_name,
        last_name : this.props.state.last_name,
        user_id : this.props.state.user_id
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
		}).catch (error => console.error({'Error': error}))
	}

	componentDidMount () {
        this.findOrders()
	}
	//  log = () => {
	// 	 console.log(this.state.orders)
	// 	 console.log(this.state.user_id)
	//  }

	render () {
		return (
			<div className='container-fluid'>
				<div className="jumbotron bg-white">
					<h1 className="display-4">Hello {this.state.first_name} {this.state.last_name} </h1>
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
					<table className="table table-light table-hover">
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
								this.state.orders.map((order, index) => {
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
					</table>
				</div>
                <NewOrder state={this.state}/>
			</div>
		)
	}
}

export default Dashboard

						