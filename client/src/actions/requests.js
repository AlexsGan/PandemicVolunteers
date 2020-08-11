// A function to send a GET request to the web server,
// and then loop through them and add a list element for each request
export const getRequests = (requestList) => {
    // the URL for the request
    const url = "/requests";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get requests");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            requestList.setState({ requestList: json.requests });
        })
        .catch(error => {
            console.log(error);
        });
};