import React, { Component } from 'react'
//import Dialogue from './Dialogue'
import QuestionForm from './QuestionForm'
import Sidebar from './Sidebar'
import Summary from './Summary'
import './FileManager.css'
import FileForm from './FileForm'

class FileManager extends Component {

    state = {
        isFetching: true,
        files: new Set(),
        summary: [],
        handlingQuestion: false,
        dialogue: [],
        file: "",
        uploadMore: false
    }
    componentDidMount() {
        console.log("MOUNT")
        const user = { user: this.props.user, mode: this.props.location.state.mode };
        fetch("/getfiles", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(resp => resp.json()).then(data => {
            const file = data.files[0]
            setTimeout(() => {

                if (file === undefined) {
                    this.setState({ isFetching: false });
                } else {

                    const set = this.state.files;
                    for (let i = 0; i < data.files.length; i++) {
                        set.add(data.files[i])
                    }
                    this.setState({ files: set, isFetching: false });
                    this.showFile(file);
                }
            }, 1500)
        })


        /* .then(resp => resp.json()).then(data => {
            console.log(data);
            setTimeout(() => {
                if (data.files[0] === undefined) {
                    this.setState({ isFetching: false });
                } else {
                    const set = this.state.files;
                    for (let i = 0; i < data.files.length; i++) {
                        set.add(data.files[i])
                    }
                    this.setState({ files: set, isFetching: false });
                }

            }, 1500)
        }) */



    }
    handleQuestion = (text, fn) => {
        this.setState({
            handlingQuestion: true
        })
        const t = { text: text, file: this.state.file, user: this.props.user }
        if (this.props.isAuthed) {
            fetch("/api", {
                method: 'post',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": this.props.user
                },
                body: JSON.stringify(t)
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.sum) {
                        this.setState({
                            handlingQuestion: false,
                            summary: [this.state.file, data.sum]
                        })
                    } else {
                        this.setState({
                            handlingQuestion: false
                        })
                    }

                    fn(text, data.answer)
                })
        }
    }

    showFile = (f) => {
        const file = { file: f, user: this.props.user };
        this.setState({ isFetching: true })
        fetch("/show_file",
            {
                method: "post",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(file)
            }).then(resp => resp.json()).then(data => {
                console.log(data.err, typeof (data.err));
                if (data.err !== 200) {
                    this.setState({ summary: [f, "Your File is being summarized... \n \n Meanwhile you have the opportunity to write questions"], isFetching: false, file: f })
                } else {
                    this.setState({ summary: [f, data.sum], isFetching: false, file: f });
                }



            })
    }
    deleteFile = (f) => {
        const file = { file: f, all: false, user: this.props.user };
        this.setState({ isFetching: true });
        fetch("/delete_file", {
            method: "delete",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(file)
        }).then(resp => resp.json()).then(data => {
            const files = this.state.files;
            files.delete(f);
            const summary = (files.size === 0 ? ["No Files Left", "Upload New Ones?"] : ["File Deleted", "Choose A New One!"])
            this.setState({ files: files, isFetching: false, summary: summary, file: "" });
        })
    }
    removeAll = () => {
        const file = { file: null, all: true, user: this.props.user };
        this.setState({ isFetching: true });
        fetch("/delete_file", {
            method: "delete",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(file)
        }).then(resp => resp.json()).then(data => {
            setTimeout(() => {
                this.setState({ files: new Set(), isFetching: false, summary: ["No Files Left", "Upload New Ones?"], file: "" });
            }, 1000)

        })
    }
    moreFiles = () => {
        this.setState({ uploadMore: !this.state.uploadMore })
    }

    handleFileUpload = (url, file) => {
        this.setState({ isFetching: true, uploadMore: false })
        if (this.props.isAuthed) {
            fetch(`/${url}`, {
                method: 'post',
                headers: {
                    "Authorization": this.props.user
                },
                body: file
            }).then(resp => resp.json()).then(data => {
                setTimeout(() => {
                    const set = this.state.files;
                    for (let i = 0; i < data.files.length; i++) {
                        set.add(data.files[i])
                    }
                    this.setState({ files: set, isFetching: false });
                    this.showFile(this.state.file)
                }, 1000)


            })

        }
    }

    render() {
        const fetching = this.state.isFetching;
        const spinner = (
            <div className="colSpinner">
                <div className="sp sp-wave">
                </div>
            </div>

        );
        const page = (<div className="row my-5">
            <div className="col-md-3 files">
                <Sidebar moreFiles={this.moreFiles} file={this.state.file} removeAll={this.removeAll} deleteFile={this.deleteFile} showFile={this.showFile} files={this.state.files} />
            </div>
            <div className="col-md-9">
                {!this.state.uploadMore ? "" : <div className="card border-primary mb-3">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="card-header"><h3>Upload More Files</h3> <span><i onClick={this.moreFiles} className="far fa-window-close fa-2x"></i></span></div>
                    <div className="card-body">
                        <FileForm minimal sendFile={this.handleFileUpload} />
                    </div>
                </div>
                }
                <Summary summary={this.state.summary} />
                <QuestionForm fetching={this.state.handlingQuestion} sendQuestion={this.handleQuestion} />
            </div>
        </div >);
        const comps = (!fetching ? page : spinner)
        return (
            <div className="container">
                {comps}
            </div>




            /*  
            </div> */
        )
    }
}

export default FileManager;