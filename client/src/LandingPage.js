import React, { Component } from 'react'
import Navbar from "./Navbar"
import FileUpload from "./FileUpload"
import TextUpload from './TextUpload'
import Card from "./Card"
import ProjectMember from "./ProjectMember"
class LandingPage extends Component {
    state = {
        isFetching: false,
        files: []
    }
    handleTextUpload = (text, mode) => {
        this.changeState()
        const body = { text: text, user: this.props.user, new: false }
        if (this.props.isAuthed) {
            fetch(`/textUpload`, {
                method: 'post',
                headers: {
                    "Authorization": this.props.user,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(resp => resp.json()).then(data => {

                console.log(data);
                this.changeState();
                this.props.history.push({
                    pathname: `/files/${this.props.user}`,
                    state: { mode: mode },
                });
            })

        }
    }
    handleFileUpload = (url, file, mode) => {
        this.setState({ isFetching: true })
        file.append("new", false)
        console.log("WHAY?")
        if (this.props.isAuthed) {
            fetch(`/${url}`, {
                method: 'post',
                headers: {
                    "Authorization": this.props.user
                },
                body: file
            }).then(resp => resp.json()).then(data => {

                console.log(data);
                this.changeState();
                this.props.history.push({
                    pathname: `/files/${this.props.user}`,
                    state: { mode: mode },
                });
            })

        }
    }
    changeState = () => {
        this.setState({ isFetching: !this.state.isFetching })
    }
    putFile = (f) => {
        const arr = [];
        for (let i = 0; i < f.length; i++) {
            arr.push(f[i].name)
        }
        this.setState({ files: arr });
    }
    render() {
        return (
            <header>
                <Navbar />
                <div className="landing-main-content">
                    <div className="main-container">
                        <div className="jumbotron">
                            <div className="title">
                                <h1>Surmize</h1>
                                <p>Upload your Documents or Text and gain quick insight</p>
                            </div>
                            <div className="upload-section">
                                <FileUpload putFile={this.putFile} sendFile={this.handleFileUpload} />
                                <TextUpload uploadText={this.handleTextUpload} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="how-section">
                    <div className="main-container">
                        <h1>How To Use</h1>
                        <div className="card-container">
                            <Card title="Upload Files" />
                            <Card title="Ask Questions" />
                            <Card title="Save Results" />
                        </div>
                    </div>
                </div>
                <div className="about">
                    <div className="about-title">
                        <h1>About us</h1>
                    </div>
                    <div className="about-main">
                        <div className="main-container">
                            <div className="about-content">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repellat magnam facilis
                                doloribus. Esse quasi accusamus eveniet rem adipisci dolore, porro quia reprehenderit
                                temporibus, perferendis tempora repellendus, obcaecati libero hic similique. Aliquam
                                praesentium
                                modi possimus, at omnis obcaecati, totam sunt soluta id iure molestiae excepturi consequatur
                            quia? Excepturi, at voluptas.</p>
                                <div className="about-pics">
                                    <ProjectMember />
                                    <ProjectMember />
                                    <ProjectMember />
                                    <ProjectMember />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="footer"></div>
                </div>



            </header>


        )
    }
}
export default LandingPage;
