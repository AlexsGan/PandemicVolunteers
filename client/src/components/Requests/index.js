import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Container, Box, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import "./styles.css";

/* Component for Requests */
class Requests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestMessage: '',
            // city: '',
            // cityList: [],
            // province: '',
            messageList: [],
            redirect: false,
            acceptAssistance: false,
            firstTime: true,
        }

        this.clearData = this.clearData.bind(this)
        this.handleChangeTextbox = this.handleChangeTextbox.bind(this)

        // this.handleChangeCity = this.handleChangeCity.bind(this)
        // this.handleChangeProvince = this.handleChangeProvince.bind(this)

        this.createTasks = this.createTasks.bind(this)      // post a request
        this.deleteRequest = this.deleteRequest.bind(this)  // delete a request
        this.assistRequest = this.assistRequest.bind(this)  // apply for assisting a request
        this.acceptAssistance = this.acceptAssistance.bind(this) // accepting an assisting application

        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    clearData() {
        this.setState({
            requestMessage: '',
            city: '',
            province: '',
        })
    }

    handleValidation() {
        if (this.state.requestMessage !== '' && this.state.requestMessage.length < 500) // post must have 1 < Character < 500
            return true
        alert("Invalid message length!")
        return false
    }

    handleChangeTextbox(e) {
        this.setState({
            requestMessage: e.target.value
        })
    }

    assistRequest(key) {
        // Wait for request host to accept assistance, then proceeds
        if (this.props.app.state.currentUser === null) {
            alert("You must be a registered user")
            return
        }
        this.setState({
            redirect: true
        })
    }

    acceptAssistance(key) {
        // Accepts the incoming assistance request, allows the other user to assist current user
        this.setState({
            acceptAssistance: true
        })
    }

    createTasks(item) {
        return <Box key={item.key}>
            <Box
                className="posted-chats"
                component="span"
                display="flex"
                bgcolor="grey.300"
                borderRadius={10}
                p={1}
            >
                {item.text}{""}
                <Button
                    variant="outlined"
                    onClick={() => this.assistRequest(item.key)}
                    color="primary"
                >
                    Assist Request
                </Button>
            </Box>
            <Button
                variant="outlined"
                onClick={() => this.deleteRequest(item.key)}
            >
                Delete request
            </Button>
            <Box
                style={{ float: "right" }}
            >
                {item.date}
            </Box>
        </Box>
    }

    deleteRequest(key) {
        // if (admin) then delete message
        if (this.props.app.state.currentUser == null) {
            alert("You must be a registered user")
            return
        }
        if (this.props.app.state.currentUser.isAdmin) {
            const filteredMessageList = this.state.messageList.filter(function (item) {
                return (item.key !== key);
            });

            this.setState({
                messageList: filteredMessageList
            });
        } else {
            alert("must be admin to delete posts")
        }
    }

    hardCodedExample() {
        if (this.state.firstTime) {
            this.setState({
                firstTime: false,
                hardCodedMsg: ' Request content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            });

            const date = new Date().getDate(); //Current Date
            const month = new Date().getMonth() + 1; //Current Month
            const year = new Date().getFullYear(); //Current Year
            const hours = new Date().getHours(); //Current Hours
            const min = new Date().getMinutes(); //Current Minutes
            const sec = new Date().getSeconds(); //Current Seconds

            const newRequest = {
                text: this.state.hardCodedMsg,
                key: Date.now(),
                date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
            };
            this.setState(prevState => ({ messageList: [newRequest] }));
            // this.setState({
            //   messageList: [newRequest, ...this.state.messageList],
            // });
            return <Box>
                <Box
                    className="posted-chats"
                    component="span"
                    display="flex"
                    bgcolor="grey.300"
                    borderRadius={10}
                    p={1}
                >
                    {newRequest.text}{""}
                    <Button
                        variant="outlined"
                        onClick={() => this.assistRequest(newRequest.key)}
                        color="primary"
                    >
                        Assist Request
                    </Button>
                </Box>
                <Button
                    variant="outlined"
                    onClick={() => this.deleteRequest(newRequest.key)}
                >
                    Delete request
                </Button>
                <Box
                    style={{ float: "right" }}
                >
                    {newRequest.date}
                </Box>
            </Box>
        }
    }

    onSubmit(e) {
        console.log("onSubmit() called")
        e.preventDefault();
        if (this.handleValidation()) {
            //alert("Form submit")
            const date = new Date().getDate(); //Current Date
            const month = new Date().getMonth() + 1; //Current Month
            const year = new Date().getFullYear(); //Current Year
            const hours = new Date().getHours(); //Current Hours
            const min = new Date().getMinutes(); //Current Minutes
            const sec = new Date().getSeconds(); //Current Seconds

            const newRequest = {
                text: this.state.requestMessage,
                key: Date.now(),
                date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
            };
            this.setState(prevState => ({
                    messageList: [newRequest, ...prevState.messageList],
                })
            );
            this.clearData()
        }
    }

    onCancel(e) {
        e.preventDefault()
        //alert("Cancel")
        this.clearData()
    }

    // request list state
    state = {
        requestList: []
    }

    render() {
        const currentUser = this.props.app.state.currentUser;
        if (this.state.redirect) {
            return (
                <Redirect
                    to={{
                        pathname: "/group-chat",
                        state: { userObject: currentUser }
                    }}
                />
            );
        }
        return (
            <>
                <Grid className="messages-grid">
                    <Grid item xs="2"/>
                    <Grid item xs="7">
                        <Container className="requests-box" maxWidth="md">
                            <Container className="requests-container" maxWidth="md">
                                <Grid className="requests-grid" container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            multiline={true}
                                            rows={3}
                                            name="message"
                                            variant="outlined"
                                            label="Add a request:"
                                            value={this.state.requestMessage}
                                            onChange={this.handleChangeTextbox}
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Button
                                            variant="contained"
                                            onClick={this.onSubmit}
                                            color="primary"
                                            fullWidth
                                        >
                                            Post
                                        </Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            variant="contained"
                                            onClick={this.onCancel}
                                            fullWidth
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>

                                {/* add requests */}
                                {this.state.messageList.map(this.createTasks)}
                                {/* TODO: display requests fetched from db */}


                                {/* The request below is hard coded */}
                                {this.hardCodedExample()}
                                {console.log(this.state.messageList)}
                            </Container>
                        </Container>
                    </Grid>

                    {/* The following grid will show the current user assist requests from other users */}
                    <Grid item xs="2">
                        <Container
                            display="flex"
                        >
                            <br/>
                            <Button
                                variant="contained"
                                onClick={this.acceptAssistance}
                                fullWidth
                            >
                                Accept Request Assistence from User 1
                            </Button>
                            <br/>
                            <br/>
                            <Button
                                variant="contained"
                                onClick={this.acceptAssistance}
                                fullWidth
                            >
                                Accept Request Assistence from User 2
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Requests;