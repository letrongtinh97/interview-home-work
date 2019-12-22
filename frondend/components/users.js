import React from 'react';


import {Button, Accordion, Card} from "react-bootstrap";
const componentDidMount =()=> {
    fetch('http://localhost:3300/users/get-all')
        .then(response =>  response.json())
        .then(resData => {
            //console.log(JSON.stringify(resData))
            //do your logic here
            //let person = resData.results
            this.setState({ person: resData.results }); //this is an asynchronous function
        })
}

function User() {
    return (
        <div>
            {
                this.state.person.map((personRecord) => {
                    return <div key={personRecord.data.id}> {personRecord.data.name} </div>
                })
            }
        </div>
    );
}

export default User;
