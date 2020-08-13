import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import { Container, Box, Grid } from "@material-ui/core";

import "./styles.css";

class HelpRequest extends React.Component {
  render() {
    const { helpRequest } = this.props;
    const { requestContent } = helpRequest;

    return (
      // <TableRow className="helpRequest">
      //   {/* <TableCell component="th" scope="row">
      //     {name}
      //   </TableCell> */}
      //   <TableCell component="th" scope="row">
      //     {requestContent}
      //   </TableCell>
      // </TableRow>
      <Grid container spacing={1}>

        <Box
          className="posted-chats"
          component="span"
          display="flex"
          bgcolor="grey.300"
          borderRadius={10}
          p={1}
        >
          {requestContent}
          <Button
            variant="outlined"
            // onClick={() => this.assistRequest(item.key)}
            color="primary"
          >
            Assist Request
          </Button>
        </Box>
        <Button
          variant="outlined"
          // onClick={() => this.deleteRequest(item.key)}
        >
          Delete request
        </Button>
        <Box
          style={{ float: "right" }}
        >
          {/* {item.date} */}
          TODO: posted date
        </Box>
      </Grid>

    );
  }
}

export default HelpRequest;
