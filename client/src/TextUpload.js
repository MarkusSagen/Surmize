import React, { Component } from 'react'

class TextUpload extends Component {
    state = {
        showTextArea: false,
        text: ""
    }
    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const text = this.state.text
        this.setState({ text: "" })
        this.props.uploadText(text, false)
    }
    hideLabel = () => {
        this.setState({ showTextArea: true })
    }
    render() {
        return (
            <div className="text-upload">
                <h2>Enter Text</h2>
                <form onSubmit={this.handleSubmit}>
                    <label onClick={this.hideLabel} style={{ display: `${!this.state.showTextArea ? "flex" : "none"}` }} htmlFor="text-file"><span><i className="fas fa-align-justify fa-5x"></i></span>
                        <span>Enter
                                        Text</span></label>
                    <textarea onChange={this.handleChange} value={this.state.text} style={{ display: `${this.state.showTextArea ? "block" : "none"}` }} name="" id="text-file" cols="30" rows="10"></textarea>
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}
export default TextUpload;
