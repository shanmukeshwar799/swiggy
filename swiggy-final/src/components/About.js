import React from 'react';
import User from "./User";
import UserClass from "./UserClass";


class About extends React.Component {

   constructor(props){
    super(props);
    
    // console.log("parent constructor");

   }
   
   componentDidMount(){
    // console.log("parent component did mount");
   }
   render(){
    // console.log("parent render");
        return (
        <div>
            <h1>About us</h1>
            <h2>This is Namaste React Web Series</h2>
            <UserClass name={"first "} location={"India classes"}/>
            
        </div>
    );
   }
}

export default About;