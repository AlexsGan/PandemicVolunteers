// import React from "react";
// import { uid } from "react-uid";
// import Button from "@material-ui/core/Button";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";

// import { Container, Box, Grid } from "@material-ui/core";

// import HelpRequest from "./../HelpRequest";

// // Importing actions/required methods
// import { getRequests } from "../../actions/requests";

// import "./../../App.css";

// /* Component for the List of users that wants to help this user's helpRequests */
// class RequestPending extends React.Component {

//     // helpRequest list state
//     state = {
//         requestList: []
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 {/* fill requestList with the saved requests */}
//                 {getRequests(this)} 

//                 {/* filter out and display the current user's helpRequests that are accepted by other Users */}
//                 {this.state.requestList.filter(function(item){
//                     return item.requestHost == 'tmp'; // TODO: find the object of the logged in user
//                 }).map(helpRequest => (
//                     <HelpRequest
//                         key={uid(
//                             helpRequest
//                         )} /* unique id required to help React render more efficiently when we delete helpRequests. */
//                         helpRequest={helpRequest}
//                     />
//                 ))}
//                 <div>TODO: pending users wanting to help your requests</div>
//             </React.Fragment>
//         );
//     }
// }

// export default RequestPending;
