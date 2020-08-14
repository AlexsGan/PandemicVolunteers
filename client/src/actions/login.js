import { login } from "./user";

export const handleTextChange = (event, form) => {
    const target = event.target;
    form.setState({
        [target.name]: target.value
    });
}

export const handleSubmit = (event, form) => {
    const state = form.state;
    const app = form.app;
    login({ username: state.username, password: state.password }, app)
        .then((res) => {
            // Trigger app user update & redirect
            app.setState({ userUpdated: true }, () => {
                form.setState({
                    credentialError: false,
                    errorText: ''
                });
            });
        })
        .catch((err) => {
            if (err === 'credentials') {
                form.setState({
                    credentialError: true,
                    errorText: 'Invalid username or password.'
                });
            } else {
                form.setState({ errorText: err.message })
            }
        });
}

const getUserObject = () => {
    // FIXME: retrieve user information from server
    return ({
        isAdmin: false,
        firstName: "John",
        lastName: "Doe",
        username: "user",
        password: "user",
        birthday: "1990-01-01",
        requestsAccepted: 0,
        requestsSent: 0,
        requestsCompleted: 0,
        profile: {
            location: { city: "Toronto", province: "Ontario" },
            isEmployed: true,
            isWorkingRemotely: true,
            employment: "Marketing",
            isDriver: true,
            isLifter: true,
            liftingAbility: 50,
            isShopper: true,
            hasBiography: true,
            biography: "Marketing analyst doing nothing at home. I'm eager to help others during the COVID-19 pandemic!",
            hasVisibleProfile: true,
            isVulnerable: false,
            additionalQuals: ["Access to pickup truck", "Designs homemade face masks"]
        }
    });
}