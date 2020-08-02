import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch, TextField } from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
import WorkIcon from '@material-ui/icons/Work';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import "../styles.css";

class PersonalContent extends React.Component {
    render() {
        const {
            userProfile,
            editableUserProfile,
            getEditStatus,
            handleSwitch,
            handleTextChange,
        } = this.props

        return(
            <List className="profile-content__list">
                {userProfile.isVulnerable || getEditStatus() ?
                    (
                        // Is Vulnerable
                        <ListItem>
                            <ListItemIcon>
                                <WarningIcon />
                            </ListItemIcon>
                            <ListItemText primary="I am or live with someone who is vulnerable to COVID-19." />
                            {getEditStatus() ?
                                (
                                    <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        name="isVulnerable"
                                        onChange={handleSwitch}
                                        checked={editableUserProfile.isVulnerable}
                                        color="primary"
                                    />
                                    </ListItemSecondaryAction>
                                ) : null
                            }
                        </ListItem>
                    ) : null
                }
                <ListItem>
                    {editableUserProfile.isEmployed ? 
                        (
                            // Is Employed
                            <>
                                <ListItemIcon>
                                    <WorkIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                        <span>
                                            I am currently employed in the field of&nbsp;
                                            <TextField
                                                className="profile-category__employment-field"
                                                name="employment"
                                                value={editableUserProfile.employment}
                                                inputProps={{
                                                    readOnly: !getEditStatus(),
                                                    maxLength: 40
                                                }}
                                                onChange={handleTextChange}
                                                disabled={!editableUserProfile.isEmployed}
                                                fullWidth
                                            >
                                            </TextField>
                                        </span>
                                    }
                                />
                            </>
                        ) : (
                            // Is not employed
                            <>
                                <ListItemIcon>
                                    <WorkOffIcon />
                                </ListItemIcon>
                                <ListItemText primary="I am currently unemployed." />
                            </>
                        )
                    }
                    {getEditStatus() ?
                        (
                            <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                name="isEmployed"
                                onChange={handleSwitch}
                                checked={editableUserProfile.isEmployed}
                                color="primary"
                            />
                            </ListItemSecondaryAction>
                        ) : null
                    }
                </ListItem>
                <ListItem>
                {userProfile.isEmployed || getEditStatus() ? 
                    (
                        userProfile.isWorkingRemotely ? 
                            (
                                // Working remotely
                                <>
                                    <ListItemIcon>
                                        <WifiIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="I am working remotely; work won't contribute to my chances of contracting COVID-19."/>
                                    {getEditStatus() ?
                                        (
                                            <ListItemSecondaryAction>
                                            <Switch
                                                edge="end"
                                                name="isWorkingRemotely"
                                                onChange={handleSwitch}
                                                checked={editableUserProfile.isWorkingRemotely}
                                                color="primary"
                                            />
                                            </ListItemSecondaryAction>
                                        ) : null
                                    }
                                </>
                            ) : (
                                // Not working remotely
                                <>
                                    <ListItemIcon>
                                        <WifiOffIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="I am not working remotely; work could contribute to my chances of contracting COVID-19."/>
                                    {getEditStatus() ?
                                        (
                                            <ListItemSecondaryAction>
                                            <Switch
                                                edge="end"
                                                name="isWorkingRemotely"
                                                onChange={handleSwitch}
                                                checked={editableUserProfile.isWorkingRemotely}
                                                color="primary"
                                            />
                                            </ListItemSecondaryAction>
                                        ) : null
                                    }
                                </>
                            )
                    ) : null
                }
                </ListItem>
            </List>
        );
    }
}

export default PersonalContent;