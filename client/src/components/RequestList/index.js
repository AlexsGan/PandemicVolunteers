import React from "react";
import { uid } from "react-uid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

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
                <Button
                    onClick={() => getRequests(this)}
                    className="student-list__button app__horizontal-center"
                    variant="contained"
                >
                    Get Requests
                </Button>
                <Table className="student-list">
                    <TableBody>
                        {this.state.requestList.map(helpRequest => (
                            <HelpRequest
                                key={uid(
                                    helpRequest
                                )} /* unique id required to help React render more efficiently when we delete helpRequests. */
                                helpRequest={helpRequest}
                            />
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default RequestList;
