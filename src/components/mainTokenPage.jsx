import React, { Component } from 'react';
import Main from './mainChartPage.jsx';

class MainTokenPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            token: null,
            authenticated: false,
            tokenGenerated: false,
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
            <div className='AuthenticContainer'>
                <div className='AuthenticContainerContents'>
                    <button onClick={() => {
                        const clone = JSON.parse(JSON.stringify(this.state));
                        this.setState({...clone, token: Math.random() * 10, tokenGenerated: true});
                    }}>Generate Access Token</button>
                    <div  style={{border: 'solid', borderColor:'transparent', fontFamily: 'Roboto, sans-serif', textAlign: 'center'}}>{this.state.token || ''}</div>
                    {this.state.tokenGenerated && 
                    <button className='CopyButton' onClick={() => {
                      navigator.clipboard.writeText(this.state.token);
                     }}>Copy</button>}
                    <button onClick={() => {
                        this.checkToken();
                    }}>Authenticate</button>
                    <div style={{border: 'solid', borderColor:'transparent', fontFamily: 'Roboto, sans-serif'}}>Instructions:</div>
                </div>
            </div>     
            </>
        )
    }
}

export default MainTokenPage;
