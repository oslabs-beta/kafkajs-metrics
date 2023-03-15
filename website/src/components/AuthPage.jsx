import React, { Component } from 'react';
import VisualizerPage from './VisualizerPage.jsx';

// MainTokenPage lets users generate access tokens to link them to their KafkaJS client metrics
class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      authenticated: false,
      tokenGenerated: false,
    };
    this.checkToken = this.checkToken.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  checkToken() {
    fetch('https://kafkajsmetrics.onrender.com/checktoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      body: JSON.stringify({ token: this.state.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          const clone = JSON.parse(JSON.stringify(this.state));
          this.setState({ ...clone, authenticated: true });
        } else {
          alert('Incorrect token.');
        }
      })
      .catch((err) => {
        console.log('error in main token page /checktoken: ', err);
      });
  }

  getToken() {
    fetch('token')
      .then((res) => res.json())
      .then((data) => {
        const clone = JSON.parse(JSON.stringify(this.state));
        this.setState({ ...clone, token: data.token, tokenGenerated: true });
      })
      .catch((err) => {
        console.log('error in getToken main token page: ', err);
      });
  }

  render() {
    return this.state.authenticated ? (
      <VisualizerPage type="consumer" token={this.state.token} />
    ) : (
      <div className="auth-page">
        <div
          className="instructions"
          style={{
            border: 'solid',
            borderColor: 'transparent',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          <h2>Instructions</h2>
          <p>
            Click the &quot;Generate Access Token&quot; button to get your
            access token. Pass two extra arguments to the metricize function in
            your KafkaJS file: true and your token. Run your file and then click
            the &quot;Authenticate&quot; button. Once authenticated, your token
            will last 24 hours. When you refresh or leave the page, just hit
            &quot;Authenticate&quot; again to access your charts.
          </p>
        </div>
        <button
          onClick={() => {
            this.getToken();
          }}
        >
          Generate Access Token
        </button>
        <div>{this.state.token || ''}</div>
        {this.state.tokenGenerated && (
          <button
            className="copy-button"
            onClick={() => {
              navigator.clipboard.writeText(this.state.token);
            }}
          >
            Copy
          </button>
        )}
        <button
          onClick={() => {
            this.checkToken();
          }}
        >
          Authenticate
        </button>
      </div>
    );
  }
}

export default AuthPage;
