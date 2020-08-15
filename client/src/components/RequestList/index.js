import React from "react";
import { uid } from "react-uid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import { Container, Box, Grid } from "@material-ui/core";

import HelpRequest from "./../HelpRequest";

// Importing actions/required methods
import { getRequests } from "../../actions/requests";

import "./../../App.css";
import "./styles.css";

/* Component for the List of helpRequests */
class RequestList extends React.Component {

    // helpRequest list state
    state = {
        requestList: []
    }

    render() {
        return (
            <React.Fragment>
                {/* <Button
                    onClick={() => getRequests(this)}
                    className="student-list__button app__horizontal-center"
                    variant="contained"
                >
                    Get Requests
                </Button> */}
                {getRequests(this)}

                {this.state.requestList.map(helpRequest => (
                    <HelpRequest
                        key={uid(
                            helpRequest
                        )} /* unique id required to help React render more efficiently when we delete helpRequests. */
                        helpRequest={helpRequest}
                    />
                ))}
            </React.Fragment>
        );
    }
}

export default RequestList;
