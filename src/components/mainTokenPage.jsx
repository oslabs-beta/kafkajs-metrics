import React, { Component } from 'react';
import Main from './mainChartPage.jsx';

class MainTokenPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            token: null,
            authenticated: false,
            // token: 1234567,
            // authenticated: true,
        }
        this.checkToken = this.checkToken.bind(this);
    }

    checkToken() {
        if (this.state.token !== null) {
            fetch('/checktoken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                body: JSON.stringify({token: this.state.token}),
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.token) {
                        const clone = JSON.parse(JSON.stringify(this.state));
                        this.setState({...clone, authenticated: true});
                    } else {
                        alert('Incorrect token.');
                    }
    
                })
                .catch((err) =>{
                    console.log('error in main token page /checktoken: ', err)
                })
            }
    }

    render() {
        return this.state.authenticated ? <Main type = 'consumer' token = {this.state.token}/> : (
            <>
            <button onClick={() => {
                const clone = JSON.parse(JSON.stringify(this.state));
                this.setState({...clone, token: Math.random() * 10});
            }}>generate access token</button>
            <div style={{border: 'solid'}}>{this.state.token || ''}</div>
            <button onClick={() => {
                this.checkToken();
            }}>authenticate</button>
            <div style={{border: 'solid'}}>instructions:</div>
            </>
        )
    }
}

export default MainTokenPage;