import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./styles.css";

class HelpRequest extends React.Component {
  render() {
    const { helpRequest } = this.props;
    const { requestContent } = helpRequest;

    return (
      <TableRow className="helpRequest">
        {/* <TableCell component="th" scope="row">
          {name}
        </TableCell> */}

        <TableCell component="th" scope="row">
          {requestContent}
        </TableCell>
      </TableRow>
    );
  }
}

export default HelpRequest;
