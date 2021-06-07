import React 			from 'react'
import { Redirect }		from 'react-router'
import { InputGroup, FormControl, Form, Row, Col } from 'react-bootstrap'

let baseURL = 'http://localhost:3003/'

class NewOrder extends React.Component {
	state = {
		name: '',
		ingredients: '',
		quantity: '',
        user_id : this.props.state.user_id,
		user_number: this.props.state.number

	}

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		fetch(baseURL + 'order/new', {
			method: 'POST', 
			body: JSON.stringify(
				{
					name: this.state.name,
					ingredients: this.state.ingredients,
					quantity: this.state.quantity,
					user_number: this.state.user_number,
					status: 'submitted',
					user: this.state.user_id
				}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then (res => res.json())
		.then (resJson => {
			this.setState({
				name: '',
				ingredients: '',
				quantity: '',
			})
            console.log('Order has been created');
		}).catch (error => console.error({'Error': error}))
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='container bg-white rounded'>
					<br />
					<h1>New Order</h1>
					<form onSubmit={this.handleSubmit}>
						{/* <label htmlFor='name'></label>
						<select className='form-control' type='text' id='name' name='name' onChange={this.handleChange} value={this.state.name} placeholder='Drink' >
							<option selected>Choose your drink</option>
							<option value='crown'>Crown</option>
							<option value='titos'>Titos</option>
							<option value='gin'>Gin</option>
						</select>
						<label htmlFor='ingredients'></label>
						<select className='form-control' type='text' id='ingredients' name='ingredients' onChange={this.handleChange} value={this.state.ingredients} placeholder='Chaser'>
							<option selected>Choose your mixer</option>
							<option value='coke'>Coke</option>
							<option value='cranberry'>Cranberry</option>
							<option value='sprite'>Sprite</option>
						</select>
						<label htmlFor='quantity'></label>
						<input className='form-control' type='test' id='quanitity' name='quanitity' onChange={this.handleChange} value={this.state.quantity} placeholder='Quantity' /> */}
										<fieldset>
    <Form.Group onSubmit={this.handleSubmit} s={Row}>
      <Form.Label as="legend" column sm={2}>
        Choose your Drink
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Crown"
          name="crown"
          id="name"
		  onChange={this.handleChange}
		  value = 'crown'
        />
        <Form.Check
          type="radio"
          label="Tito's"
          name="titos"
          id="name"
		  onChange={this.handleChange}
		  value = 'titos'
        />
        <Form.Check
          type="radio"
          label="Gin"
          name="gin"
          id="name"
		  onChange={this.handleChange}
		  value = 'gin'
        />
      </Col>
    </Form.Group>
	<br />
	<Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Choose your Chaser
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Coke"
          name="coke"
          id="ingredients"
		  onChange={this.handleChange}
		  value = 'coke'
        />
        <Form.Check
          type="radio"
          label="Sprite"
          name="sprite"
          id="ingredients"
		  onChange={this.handleChange}
		  value = 'sprite'
        />
        <Form.Check
          type="radio"
          label="Cranberry"
          name="cranberry"
          id="ingredients"
		  onChange={this.handleChange}
		  value = 'cranberry'
        />
      </Col>
	  <Col sm={10}>
		   <label htmlFor='name'></label>
						<select className='form-control' type='text' id='quantity' name='quantity' onChange={this.handleChange} value={this.state.quantity} placeholder='Drink' >
							<option selected>Quantity</option>
							<option value= '1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
						</select>
	  </Col>
	  <br />
	<input className='btn btn-primary' type='submit' value='Submit'/>
    </Form.Group>
  </fieldset>
					</form>
					<br />
				</div>
				{
					this.state.redirect ?  <Redirect to='/'/> : null
				}
			</div>
		)
	}
}

export default NewOrder