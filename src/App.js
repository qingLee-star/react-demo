import React from 'react';
import './App.css';
import Clock from './Components/Clock/Clock';

// 时钟显隐
/* class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: true,
      isShowClock: true
    }
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick.bind(this)}>点击一下</button>
        { this.state.isShowClock ? <Clock /> : null }
      </div>
    );
  }
  handleClick() {
    this.setState({show: !this.state.show})
    this.setState({isShowClock: !this.state.isShowClock})
  }
} */

// 跨组件通信
// 后代组件通信
/* class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <p>我是爷爷</p>
        <Father name={'lxh'} ageFn={this.myFn.bind(this)}></Father>
      </div>
    )
  }
  myFn(age) {
    console.log(age)
  }
}

class Father extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p>我是爸爸</p>
        <Son name={this.props.name} ageFn={this.props.ageFn}></Son>
      </div>
    )
  }
}

class Son extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p>我是孙子</p>
        <p>{this.props.name}</p>
        <button onClick={()=>{this.btnClick()}}>儿子组件的按钮</button>
      </div>
    )
  }
  btnClick() {
    this.props.ageFn(18);
  }
} */
// 兄弟组件通信，注意props中的数据一般来说不可手动修改，需要用state保存数据
/* class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: null
    }
  }
  render() {
    return (
      <div>
        <p>我是爸爸</p>
        <A paramsFn={this.myFn.bind(this)}></A>
        <B age={this.state.age}></B>
      </div>
    )
  }
  myFn(age) {
    console.log(age)
    this.setState({
      age: age
    })
  }
}

class A extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p>A</p>
        <button onClick={()=>{this.btnClick()}}>A组件的按钮</button>
      </div>
    )
  }
  btnClick() {
    this.props.paramsFn(18);
  }
}

class B extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p>我是B</p>
        <p>{this.props.age}</p>
      </div>
    )
  }
} */

// 以上两种跨组件通信的方式十分麻烦，有没有其他较为简单方便的方式来实现跨组件通信呢？
// 1.创建一个上下文对象
const AppContext = React.createContext();
// 2.从上下文对象中获取容器组件
// Provider：生产者组件，专门用于生产数据
// Comsumer：消费者组件，专门用于消费 生产者组件容器组件生产的数据的
const {Provider, Consumer} = AppContext;
class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <p>我是爷爷</p>
        <Provider value={{name:'爷爷', age: 60}}>
          <Father></Father>
        </Provider>
      </div>
    )
  }
}

class Father extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p>我是爸爸</p>
        <Son></Son>
      </div>
    )
  }
}

class Son extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Consumer>
        {
          (value) => {
            return (
              <div>
                <p>{value.name}</p>
                <p>{value.age}</p>
              </div>
            )
          }
        }
      </Consumer>
    )
  }
}
export default App;
