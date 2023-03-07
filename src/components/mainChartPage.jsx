import React, { Component } from 'react';
import ChartSection from './chart-section.jsx';
import SideBar from './sidebar.jsx';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [{
                label: 'Ummmmm',
                data: [2, 8, 6, 5],
            }]
        };
        this.updateState = this.updateState.bind(this);
    }

    //needs to be a component did mount for here, too
    // if this.state.token is null, setState for token
    // query and set state with info for all charts

    // componentDidMount() {

    // }

    updateState(value) {
        const clone = JSON.parse(JSON.stringify(this.state));
        this.setState({...clone, datasets: value.datasets});
    }

    render() {
        console.log('type', this.props.type);
        console.log('token', this.props.token);
        return (
        <div className='container'>
          <SideBar />
          <div>
             <ChartSection data = {this.state} update = {this.updateState}/>
          </div>
        </div>
        )
    }
}

export default Main;