import React from "react";
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import "../styles.css";

class ProfileCategory extends React.Component {
    render() {
        const {
            categoryName,
            categoryHeading,
            categoryContent,
            toExpand,
            isEditable,
            isPrivate,
            getEditStatus,
            handleChange,
            handleCancel,
            handleSaveEdit,
            handleEdit
        } = this.props;

        return (
            <ExpansionPanel
                className="profile-body__category"
                name={categoryName}
                expanded={toExpand === categoryName}
                onChange={(event, isExpanded) => {
                    handleChange(event, isExpanded, categoryName)
                }}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore/>}
                >
                    <Typography className={isPrivate ? null : "bold"} variant="h5">{categoryHeading}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="profile-category__content">
                    {isEditable && !getEditStatus(categoryName) ?
                        (
                            <Button
                                className="profile-category__button"
                                color="primary"
                                variant="contained"
                                onClick={(event) => {
                                    handleEdit(event, categoryName)
                                }}>
                                EDIT
                            </Button>
                        ) : null
                    }
                    {isEditable && getEditStatus(categoryName) ?
                        (
                            <Button
                                className="profile-category__button"
                                color="secondary"
                                variant="contained"
                                onClick={handleCancel}
                            >
                                CANCEL
                            </Button>
                        ) : null
                    }
                    {categoryContent}
                    {isEditable && getEditStatus(categoryName) ?
                        (
                            <Button
                                name={categoryName}
                                className="profile-category__button"
                                color="primary"
                                variant="contained"
                                onClick={handleSaveEdit}
                            >
                                SAVE
                            </Button>
                        ) : null
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default ProfileCategory;