import React from "react";
import "../styles.css";
import { Paper } from "@material-ui/core";
import { handleExpansion, 
         handleEdit, 
         handleSaveEdit, 
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

class ProfileBody extends React.Component {

    state = {
        // Default category expanded
        contentToExpand: "biography",
        editContent: {
            doEdit: false,
            content: ""
        },
        userObject: this.props.userObject,
        editableUserObject: {
            ...this.props.userObject
        }
    }

    render() {
        return (
            <Paper className="profile-body" elevation={4}>
                <ProfileCategory
                    categoryName="biography"
                    categoryHeading="Biography"
                    categoryContent= {
                        <BiographyContent
                            userProfile={this.state.userObject.profile}
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
                    categoryName="preferences"
                    categoryHeading="Preferences"
                    categoryContent= {
                        <PreferencesContent 
                            userProfile={this.state.editableUserObject.profile}
                            handleSwitch={(event) => handleSwitch(event, this)}
                        />
                    }
                    toExpand={this.state.contentToExpand}
                    handleChange={(event, isExpanded, categoryName) =>
                        {handleExpansion(event, isExpanded, categoryName, this)}}
                />
                <ProfileCategory
                    categoryName="personalInfo"
                    categoryHeading="Personal Info"
                    categoryContent= {
                        <PersonalContent 
                            userProfile={this.state.userObject.profile}
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
                            userProfile={this.state.editableUserObject.profile}
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