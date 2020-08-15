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
//                 <div>List of pending users wanting to help your requests:</div>

//                 {/* fill requestList with the saved requests */}
//                 {getRequests(this)} 

//                 {/* filter out and display the current user's helpRequests that are accepted by other Users */}
//                 {this.state.requestList.map(helpRequest => (
//                     <PendingRequest
//                         key={uid(
//                             helpRequest
//                         )} /* unique id required to help React render more efficiently when we delete helpRequests. */
//                         helpRequest={helpRequest}
//                     />
//                 ))}
//                 {/* filter(function(item){
//                     return item.requestHost == 'tmp'; // TODO: find the object of the logged in user
//                 }). */}
//             </React.Fragment>
//         );
//     }
// }

// class PendingRequest extends React.Component {
//     render() {
//       const { helpRequest } = this.props;
//       const { requestContent } = helpRequest;
  
//       return (
//         // this container allows the gray request contents to have fixed size
//         <Container className="requests-container" maxWidth="sm" fixed="true">
  
//           <Box
//             className="posted-chats"
//             component="span"
//             display="flex"
//             bgcolor="grey.300"
//             borderRadius={10}
//             p={1}
//           >
//             {requestContent}
//             <Button
//               variant="outlined"
//               // onClick={() => assistRequest(this)}
//               color="primary"
//             >
//               Assist Request
//             </Button>
//           </Box>
//           <Button
//             variant="outlined"
//           // onClick={() => this.deleteRequest(item.key)} // TODO
//           >
//             Delete request
//           </Button>
//           <Box
//             style={{ float: "right" }}
//           >
//             {/* {item.date} */}
//             TODO: posted date
//           </Box>
  
//         </Container>
//       );
//     }
//   }

// export default RequestPending;
