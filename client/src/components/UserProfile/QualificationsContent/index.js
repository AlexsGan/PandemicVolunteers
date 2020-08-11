import React from "react";
import "../styles.css";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Switch,
    TextField,
    InputAdornment,
    Typography,
    Button,
    Grid
} from "@material-ui/core";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { QualificationList } from "../../ProfileWizard/ProfileStepper/PreferenceStep";


class QualificationsContent extends React.Component {
    render() {
        const {
            userProfile,
            editableUserProfile,
            getEditStatus,
            handleSwitch,
            handleTextChange,
            handleQualTextChange,
            handleAddQual
        } = this.props

        return (
            <>
                <List>
                    {userProfile.isDriver || getEditStatus() ?
                        (
                            // Driver
                            <ListItem>
                                <ListItemIcon>
                                    <DriveEtaIcon/>
                                </ListItemIcon>
                                <ListItemText primary="I am a licensed driver with access to a vehicle."/>
                                {getEditStatus() ?
                                    (
                                        <ListItemSecondaryAction>
                                            <Switch
                                                edge="end"
                                                name="isDriver"
                                                onChange={handleSwitch}
                                                checked={editableUserProfile.isDriver}
                                                color="primary"
                                            />
                                        </ListItemSecondaryAction>
                                    ) : null
                                }
                            </ListItem>
                        ) : null
                    }
                    {userProfile.isLifter || getEditStatus() ?
                        (
                            // Can lift
                            <ListItem>
                                <ListItemIcon>
                                    <FitnessCenterIcon/>
                                </ListItemIcon>
                                <ListItemText primary={
                                    <span>
                                            I am able to lift up to&nbsp;
                                        <TextField
                                            className="profile-category__lifting-field"
                                            name="liftingAbility"
                                            value={editableUserProfile.liftingAbility}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">lbs</InputAdornment>
                                            }}
                                            inputProps={{
                                                readOnly: !getEditStatus(),
                                                maxLength: 3
                                            }}
                                            onChange={handleTextChange}
                                            disabled={!editableUserProfile.isLifter}
                                            fullWidth
                                        >
                                            </TextField>
                                        </span>
                                }
                                />
                                {getEditStatus() ?
                                    (
                                        <ListItemSecondaryAction>
                                            <Switch
                                                edge="end"
                                                name="isLifter"
                                                onChange={handleSwitch}
                                                checked={editableUserProfile.isLifter}
                                                color="primary"
                                            />
                                        </ListItemSecondaryAction>
                                    ) : null
                                }
                            </ListItem>
                        ) : null
                    }
                    {userProfile.isShopper || getEditStatus() ?
                        (
                            // Can shop for others
                            <ListItem>
                                <ListItemIcon>
                                    <ShoppingCartIcon/>
                                </ListItemIcon>
                                <ListItemText primary="I am willing to shop on the behalf of others."/>
                                {getEditStatus() ?
                                    (
                                        <ListItemSecondaryAction>
                                            <Switch
                                                edge="end"
                                                name="isShopper"
                                                onChange={handleSwitch}
                                                checked={editableUserProfile.isShopper}
                                                color="primary"
                                            />
                                        </ListItemSecondaryAction>
                                    ) : null
                                }
                            </ListItem>
                        ) : null
                    }
                    <ListItem>
                        <Typography className="bold" variant="h6">Additional Qualifications</Typography>
                    </ListItem>
                    <ListItem>
                        <Grid container spacing={2} className="additional-qualifications__grid">
                            <QualificationList
                                additionalQuals={editableUserProfile.additionalQuals}
                                handleTextChange={handleQualTextChange}
                                isEditable={getEditStatus()}
                            />
                        </Grid>
                    </ListItem>
                </List>
                {getEditStatus() ?
                    (
                        <Button
                            className="additional-qualifications__button"
                            color="primary"
                            variant="contained"
                            onClick={handleAddQual}
                            disabled={!getEditStatus()}
                        >
                            ADD NEW
                        </Button>
                    ) : null
                }
            </>
        );
    }
}

export default QualificationsContent;