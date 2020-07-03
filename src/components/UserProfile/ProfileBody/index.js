import React from "react";
import "../styles.css";
import { Paper, Box } from "@material-ui/core";
import { handleExpansion, 
         handleEdit,
         getEditStatus, 
         handleCancel, 
         handleTextChange, 
         handleAddQual 
        } from "../../../actions/user-profile";
import ProfileCategory from "../ProfileCategory";
import PersonalContent from "../PersonalContent";
import QualificationsContent from "../QualificationsContent";
import PreferencesContent from "../PreferencesContent";
import BiographyContent from "../BiographyContent";
import { handleSwitch } from "../../../actions/user-profile";
import { handleQualTextChange } from "../../../actions/user-profile";
import BasicContent from "../BasicContent";

class ProfileBody extends React.Component {

    state = {
        // Default category expanded
        contentToExpand: "biography",
        editContent: {
            doEdit: false,
            content: ""
        },
        editableUserObject: {
            ...this.props.userObject
        },
        firstNameError: false,
        lastNameError: false,
        usernameError: false,
        passwordError: false,
        birthdayError: false
    }

    render() {
        const {
            userObject,
            handleSaveEdit
        } = this.props;

        return (
            <Paper className="profile-body" elevation={4}>
                <Box className="profile-body__private">
                    <ProfileCategory
                        categoryName="basic"
                        categoryHeading="Basic Info and Login Settings"
                        categoryContent= {
                            <BasicContent
                                userObject={userObject}
                                editableUserObject={this.state.editableUserObject}
                                handleTextChange={(event) => handleTextChange(event, this)}
                                getEditStatus={() => getEditStatus("basic", this)}
                                firstNameError={this.state.firstNameError}
                                lastNameError={this.state.lastNameError}
                                usernameError={this.state.usernameError}
                                passwordError={this.state.passwordError}
                                birthdayError={this.state.birthdayError}
                            />
                        }
                        toExpand={this.state.contentToExpand}
                        isEditable={true}
                        isPrivate={true}
                        getEditStatus={(categoryName) => getEditStatus(categoryName, this)}
                        handleChange={(event, isExpanded, categoryName) =>
                            {handleExpansion(event, isExpanded, categoryName, this)}}
                        handleEdit={(event, name) => handleEdit(event, name, this)}
                        handleCancel={(event) => handleCancel(event, this)}
                        handleSaveEdit={(event) => handleSaveEdit(event, this)}
                        checkError={
                            () => (
                                this.state.firstNameError || this.state.lastNameError ||
                                this.state.usernameError || this.state.passwordError ||
                                this.state.birthdayError
                            )
                        }
                    />
                    <ProfileCategory
                        categoryName="preferences"
                        categoryHeading="Preferences"
                        categoryContent= {
                            <PreferencesContent 
                                userProfile={this.state.editableUserObject.profile}
                                handleSwitch={(event) => handleSwitch(event, this)}
                            />
                        }
                        toExpand={this.state.contentToExpand}
                        isPrivate={true}
                        handleChange={(event, isExpanded, categoryName) =>
                            {handleExpansion(event, isExpanded, categoryName, this)}}
                    />
                </Box>
                <ProfileCategory
                    categoryName="biography"
                    categoryHeading="Biography"
                    categoryContent= {
                        <BiographyContent
                            userProfile={userObject.profile}
                            editableUserProfile={this.state.editableUserObject.profile}
                            getEditStatus={() => getEditStatus("biography", this)}
                            handleTextChange={(event) => handleTextChange(event, this)}
                        />
                    }
                    toExpand={this.state.contentToExpand}
                    isEditable={true}
                    getEditStatus={(categoryName) => getEditStatus(categoryName, this)}
                    handleChange={(event, isExpanded, categoryName) =>
                        {handleExpansion(event, isExpanded, categoryName, this)}}
                    handleEdit={(event, name) => handleEdit(event, name, this)}
                    handleCancel={(event) => handleCancel(event, this)}
                    handleSaveEdit={(event) => handleSaveEdit(event, this)}
                />
                <ProfileCategory
                    categoryName="personalInfo"
                    categoryHeading="Personal Info"
                    categoryContent= {
                        <PersonalContent 
                            userProfile={userObject.profile}
                            editableUserProfile={this.state.editableUserObject.profile}
                            handleSwitch={(event) => handleSwitch(event, this)}
                            handleTextChange={(event) => handleTextChange(event, this)}
                            getEditStatus={() => getEditStatus("personalInfo", this)}
                        />
                    }
                    toExpand={this.state.contentToExpand}
                    isEditable={true}
                    getEditStatus={(categoryName) => getEditStatus(categoryName, this)}
                    handleChange={(event, isExpanded, categoryName) =>
                        {handleExpansion(event, isExpanded, categoryName, this)}}
                    handleEdit={(event, name) => handleEdit(event, name, this)}
                    handleCancel={(event) => handleCancel(event, this)}
                    handleSaveEdit={(event) => handleSaveEdit(event, this)}
                />
                <ProfileCategory
                    categoryName="qualifications"
                    categoryHeading="Qualifications"
                    categoryContent= {
                        <QualificationsContent 
                            userProfile={userObject.profile}
                            editableUserProfile={this.state.editableUserObject.profile}
                            handleSwitch={(event) => handleSwitch(event, this)}
                            handleTextChange={(event) => handleTextChange(event, this)}
                            handleQualTextChange={(event) => handleQualTextChange(event, this)}
                            handleAddQual={(event) => handleAddQual(event, this)}
                            getEditStatus={() => getEditStatus("qualifications", this)}
                        />
                    }
                    toExpand={this.state.contentToExpand}
                    isEditable={true}
                    getEditStatus={(categoryName) => getEditStatus(categoryName, this)}
                    handleChange={(event, isExpanded, categoryName) =>
                        {handleExpansion(event, isExpanded, categoryName, this)}}
                    handleEdit={(event, name) => handleEdit(event, name, this)}
                    handleCancel={(event) => handleCancel(event, this)}
                    handleSaveEdit={(event) => handleSaveEdit(event, this)}
                />
            </Paper>
        );
    }
}

export default ProfileBody;