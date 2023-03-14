import React, { Component } from 'react';
import ChartSection from './ChartSection.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { default: true };
    this.updateState = this.updateState.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.default && !this.state.ok) {
      const clone = JSON.parse(JSON.stringify(this.state));
      this.setState({ ...clone, ok: true });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: this.props.token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('beginning', data);
          const stateObj = {};
          const metricArr = [];
          let datasets = [];
          let stack;
          const keyArr = Object.keys(data.data);
          keyArr.forEach((el) => {
            const obj = JSON.parse(data.data[el]);
            const tempObj = {};
            tempObj.label = el;
            tempObj.metrics = obj.data;
            stack = Object.keys(tempObj.metrics);
            stack.pop();
            metricArr.push(tempObj);
          });
          console.log('metricArr', metricArr);
          console.log('stack', stack);
          while (stack.length) {
            const chartName = stack.pop();
            let tempObj;
            metricArr.forEach((obj) => {
              tempObj = {};
              tempObj.label = obj.label;
              tempObj.data = [obj.metrics[chartName]];
              datasets.push(tempObj);
            });
            stateObj[chartName] = {
              labels: [...Array(10).keys()],
              datasets,
            };
            datasets = [];
          }
          const clone = JSON.parse(JSON.stringify(this.state));
          this.setState({ ...clone, charts: stateObj, default: false });
          console.log(stateObj);
        })
        .catch((err) => {
          console.log('error in main chart page /checktoken: ', err);
        });
    }, 3000);
  }

  updateState() {
    fetch('/getData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: this.props.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('beginning', data);
        const stateObjClone = JSON.parse(JSON.stringify(this.state));
        const metricObj = {};
        let stack;
        const keyArr = Object.keys(data.data);
        keyArr.forEach((el) => {
          const tempObj = {};
          const obj = JSON.parse(data.data[el]);
          metricObj[el] = obj.data;
          tempObj.metrics = obj.data;
          stack = Object.keys(tempObj.metrics);
          stack.pop();
        });
        console.log('metricObj in update state', metricObj);
        console.log('stack in update state', stack);
        while (stack.length) {
          const key = stack.pop();
          console.log('stateObjClone', stateObjClone.charts);
          console.log('key', key);
          const dataArr = stateObjClone.charts[key].datasets;
          const labelArr = stateObjClone.charts[key].labels;
          labelArr.push(labelArr.length);
          console.log('dataArr', dataArr);
          dataArr.forEach((obj) => {
            if (metricObj[obj.label]) {
              obj.data.push(metricObj[obj.label][key]);
            }
          });
        }
        this.setState({ ...stateObjClone });
      })
      .catch((err) => {
        console.log('err in update state main chart page', err);
      });
  }

  render() {
    console.log('this.state', this.state);
    console.log('TYPE', this.props.type);
    if (!this.state.ok) {
      return (
        <div>
          <div className="LoadingPage">Loading!</div>
          <p className="LoadingPageNotice">
            Content should appear shortly. If it does not, please refresh.
          </p>
        </div>
      );
    }
    return (
      <div className="MainChartPageContainter">
        <ChartSection
          data={this.state.charts}
          update={this.updateState}
          type={this.props.type}
        />
      </div>
    );
  }
}

export default Main;
