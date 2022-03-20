import React from "react";

class Clock extends React.Component {
  constructor() {
    super()
    this.state = {
      date: new Date()
    }
  }
  render() {
    return(
      <div>
        <h1>
          <p>现在的时间时</p>
          {this.state.date.toLocaleTimeString()}
        </h1>
      </div>
    );
  }
  componentWillMount() {
    console.log('willMount')
    console.log(this.state.date);
    this.timer = setInterval(() => {
      this.setState({date: new Date()})
    }, 1000);
  }
  componentDidMount() {
    console.log('didMount');
  }
  componentWillUnmount() {
    console.log('willUnmount');
    clearInterval(this.timer)
  }
}

export default Clock;