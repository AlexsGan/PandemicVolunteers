import React from "react";
import "../styles.css";
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

class PreferencesContent extends React.Component {
    render() {
        const {
            userProfile,
            handleSwitch
        } = this.props

        return(
            <List className="profile-content__list">
                <ListItem>
                    {userProfile.hasVisibleProfile ? 
                        (
                            // Visible
                            <>
                                <ListItemIcon>
                                    <VisibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="My detailed profile information is publically visible." />
                            </>
                        ) : (
                            // Not visible
                            <>
                                <ListItemIcon>
                                    <VisibilityOffIcon />
                                </ListItemIcon>
                                <ListItemText primary="My detailed profile information is not publically visible." />
                            </>
                        )
                    }
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            name="hasVisibleProfile"
                            onChange={handleSwitch}
                            checked={userProfile.hasVisibleProfile}
                            color="primary"
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        );
    }
}

export default PreferencesContent;