import React, { Component } from 'react'
import Button from './Button'


class Form extends Component {
    state = {
        text: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendQuestion(this.state);
    }
    
    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleTextarea">Message Here</label>
                    <textarea onChange={this.handleChange} className="form-control" id="exampleTextarea" rows="10" defaultValue={this.props.answer}></textarea>
                </div>
                <Button type="submit" classN={this.props.classN} text={this.props.text} />
            </form>
        )
    }
}

export default Form;