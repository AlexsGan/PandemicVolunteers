import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

// Importing actions/required methods
import { updateRequestForm, addRequest } from "../../actions/requests";

import "./styles.css";

/* Component for the Request Form */
class RequestForm extends React.Component {

    // helpRequest form state
    state = {
        requestContent: "",
        year: ""
    }

    render() {
        const { dashboard } = this.props;

        const { requestContent, year } = this.state;

        return (
            <React.Fragment>
                <Grid className="student-form" container spacing={4}>
                    {/* Inputs to add student */}
                    <Input
                        name="name"
                        value={requestContent}
                        onChange={e => updateRequestForm(this, e.target)}
                        label="Request contents"
                    />

                    {/* <Input
                        name="year"
                        value={year}
                        onChange={e => updateRequestForm(this, e.target)}
                        label="Year"
                    /> */}

                    <Grid
                        className="student-form__button-grid"
                        item
                        xl={2}
                        lg={2}
                        md={12}
                        s={12}
                        xs={12}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addRequest(this, dashboard)}
                            className="student-form__submit-button"
                        >
                            Add HelpRequest
                        </Button>
                    </Grid>
                </Grid>

                <p className={`student-form__message--${dashboard.state.message.type}`}>
                    {dashboard.state.message.body}
                </p>
            </React.Fragment>
        );
    }
}

export default RequestForm;
