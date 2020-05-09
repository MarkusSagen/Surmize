import React, { Component } from 'react'
import InfoIcon from './InfoIcon';


class TextUpload extends Component {
    state = {
        showTextArea: false,
        text: "",
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const text = this.state.text
        this.setState({ text: "" })
        this.props.uploadText(text, this.props.isExperimental)
    }
    
    hideLabel = () => {
        this.setState({ showTextArea: true })
    }

    render() {
        return (
            <div className="text-upload">
                <h2>Enter Text</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="file-upload-container">
                        <label onClick={this.hideLabel} style={{ display: `${!this.state.showTextArea ? "flex" : "none"}` }} htmlFor="text-file">
                            <span className="text-icon-before">T</span>
                            <span>Enter Text Here</span>
                        </label>
                        <textarea onChange={this.handleChange} value={this.state.text} style={{ display: `${this.state.showTextArea ? "block" : "none"}` }} name="" id="text-file" cols="30" rows="10"></textarea>
                    </div>
                    <div className="form-check-summary">
                        <span className="text">
                            <span className="bold">(Optional) </span>Use Experimental Summary         
                        </span>
                        <span className="icons">
                            <InfoIcon positionTop={true} marginTop={0} text={[
                                    "Click button to the right to use experimental summary", 
                                    "Using it will potentially yield more insightful summaries",
                                    "But summaries will take longer, (min) instead of (sec)"
                            ]}/>
                            <div className="cbx">
                                <input id="cbx" type="checkbox" onChange={this.props.handleCheck} checked={this.props.isExperimental} />
                                <label for="cbx"></label>
                                <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                                </svg>
                            </div>
                        </span>
                    </div>

                    { this.state.text.length > 0 
                        ?  <button type="submit">Upload</button> 
                        : <div className="fakeButton">Upload</div> }
                </form>

                

            </div>
        )
    }
}
export default TextUpload;
