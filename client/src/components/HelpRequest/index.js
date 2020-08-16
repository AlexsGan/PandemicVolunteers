import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import { Container, Box, Grid } from "@material-ui/core";

import { assistRequest, deleteRequest } from "../../actions/requests";

import "./styles.css";
import Typography from "@material-ui/core/Typography";

class HelpRequest extends React.Component {
    render() {
        const { helpRequest } = this.props;

        return (
            // this container allows the gray request contents to have fixed size
            <Container className="requests-container" maxWidth="lg" fixed="true">

                <Box
                    className="posted-chats"
                    bgcolor="grey.300"
                    borderRadius={10}
                    p={1}
                >
                    <Box>
                        <Typography variant="subtitle1">
                            {helpRequest.requestHost}'s Request
                        </Typography>
                    </Box>
                    <Box>
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
