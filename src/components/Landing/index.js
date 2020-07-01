import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import "./styles.css";

/* Component for Landing page */
class Landing extends React.Component {
  render() {
    return (
        // FIXME: Temporary button to test Register component
        <Link to={"/register"}>
          <Button variant="contained" color="primary">
            REGISTER
          </Button>
        </Link>
    );
  }
}

export default Landing;
