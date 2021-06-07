import React 		from 'react'
import { Link } 	from 'react-router-dom'
import NewOrder from './newOrder'

let baseURL = 'http://localhost:3003/'

class Bar extends React.Component {
	// intervalID;
	
	state = {
		orders : [],
        number : this.props.state.number,
        first_name : this.props.state.first_name,
        last_name : this.props.state.last_name,
        user_id : this.props.state.user_id,
		order_id: ''
	}

	findOrders = () => {
		fetch(baseURL + 'order', {
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
			// this.intervalID = setTimeout(this.findOrders.bind(this), 10000);
			console.log('User orders found')
		}).catch (error => console.error({'Error': error}))
	}

    completeOrder = (id, e) => {
        e.preventDefault()
		console.log(baseURL + 'order/' + id)
        fetch(baseURL + 'order/' + id, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    status: 'completed'
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(resJson => console.log(resJson))
        .catch(error => console.log({'Error': error}))
    }

	componentDidMount () {
        this.findOrders()

	}
	
	render () {
		return (
			<div className='container-fluid'>
				<div className="jumbotron bg-white">
					<h1 className="display-4">Hello Bar! Please complete the drinks </h1>
                    {
                    this.state.orders.length == 1 ?
                    <p>Customers ordered: {this.state.orders.length} drink</p>
                    :
                    <p>Customers ordered: {this.state.orders.length} drinks</p>
                    }
					
					<p className="lead"></p>
					<hr className="my-4" />
					<p></p>
				</div>

				<div className="table-responsive">
					<table className="table table-light table-hover">
						<thead className="thead-dark">
							<tr>
                                <th scope="col">Order</th>
                                <th scope="col">Drink</th>
								<th scope="col">Chaser</th>
								<th scope="col">Quantity</th>
                                <th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.orders.map((order, index) => {
									if(order.status == 'submitted'){
										return (
											<tr key={index}>
												<th>{index}</th>
												<th>{order.name}</th>
												<th>{order.ingredients}</th>
												<th>{order.quantity}</th>
												<th>{order.status}</th>
												<th><div className='btn btn-secondary' onClick={(e) => this.completeOrder(order._id, e)}>Finished order</div></th>											
											</tr>
										)
									} else {
										return (
											<tr key={index}>
												<th>{index}</th>
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
			</div>
		)
	}
}

export default Bar

						