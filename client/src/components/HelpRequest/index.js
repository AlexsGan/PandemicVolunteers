import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import { Container, Box, Grid } from "@material-ui/core";

import { assistRequest, deleteRequest } from "../../actions/requests";

import "./styles.css";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class HelpRequest extends React.Component {
    render() {
        const { helpRequest } = this.props;

        return (
            // this container allows the gray request contents to have fixed size
            <Container className="requests-container" maxWidth="lg" fixed="true">

                <Box
                    component="div"
                    className="posted-chats"
                    bgcolor="grey.300"
                    borderRadius={10}
                    p={1}
                >
                    <Box component="div">
                        <Link to={`/profile/${helpRequest.requestHost}`}>
                            <Typography variant="h5">
                                {helpRequest.requestHost}'s Request
                            </Typography>
                        </Link>
                    </Box>
                    <Box component="div">
                        {helpRequest.requestContent}
                    </Box>
                </Box>
                <Button
                    variant="outlined"
                    // onClick={() => assistRequest(this)}
                    color="primary"
                >
                    Assist Request
                </Button>
                <Button
                    variant="outlined"
                    // onClick={() => this.deleteRequest(item.key)} // TODO
                >
                    Delete request
                </Button>
                <Box
                    style={{ float: "right" }}
                >
                    {helpRequest.date}
                </Box>

            </Container>
        );
    }
}

export default HelpRequest;
