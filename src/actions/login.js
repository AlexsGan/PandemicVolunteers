export const handleTextChange = (event, form) => {
    const target = event.target;
    form.setState({
        [target.name]: target.value
    });
}

export const handleSubmit = (event, form) => {
    const state = form.state;
    const isAdmin = event.currentTarget.name === "loginAdmin";
    if (validateCredentials(state.username, state.password, isAdmin)) {
        form.setState({
            credentialError: false,
            userObject: isAdmin ? (
                {
                    username: state.username,
                    password: state.password,
                    isAdmin: true 
                }
            ) : (
                getUserObject()
            ),
            slideIn: false,
            slideDirection: "left"
        }, () => {
            // Trigger redirect
            form.setState({
                loginSuccess: true
            })
        });
    } else {
        form.setState({loginSuccess: false, credentialError: true});
    }
}

const getUserObject = () => {
    // FIXME: retrieve user infromation from server
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

const validateCredentials = (username, password, isAdmin) => {
    // BACKEND: check if username exists on server and password matches
    // FIXME: Temporary hardcoded username & password
    if (isAdmin) {
        return (username === "admin" && password === "admin");
    } else {
        return (username === "user" && password === "user");
    }
}