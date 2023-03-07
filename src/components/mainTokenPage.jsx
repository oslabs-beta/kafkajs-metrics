import React, { Component } from 'react';
import Main from './mainChartPage.jsx';

class MainTokenPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            token: null,
            authenticated: false,
        }
    }

    componentDidMount() {
         // if token is not null, query the database to check for the appropriate token key
        // if response is {token : false}, don't do anything and alert the user
        // if the set interval runs more than a certain number of times, alert the user that the token has expired
        // if token matches, route to mainChartPage

        // below, setting this to never run (instead of just commenting the whole thing out) until the route is ready
        // will want this to happen on an interval
        if (false) {
            fetch('http://localhost:3000/checktoken', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({token: this.state.token}),
              })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log('data', data);
              })
              .catch((err) =>{
                console.log('error in main token page /checktoken: ', err)
              })
        }

        setTimeout(() => {
            const clone = JSON.parse(JSON.stringify(this.state));
            this.setState({...clone, authenticated: true});
        }, 5000);
    }

    render() {
        return this.state.authenticated ? <Main type = 'consumer' token = {this.state.token}/> : (
            <>
            <button onClick={() => {
                const clone = JSON.parse(JSON.stringify(this.state));
                this.setState({...clone, token: Math.random() * 10});
            }}>generate access token</button>
            <div style={{border: 'solid'}}>{this.state.token || ''}</div>
            <div style={{border: 'solid'}}>instructions:</div>
            </>
        )
    }
}

export default MainTokenPage;