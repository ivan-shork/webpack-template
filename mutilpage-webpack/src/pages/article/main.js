import '@/css/common'
import '@/css/article'
import img from './img/企业微信截图_16227011757760.png'
import {format} from '@/js/util'
import React from 'react' 
import ReactDOM from 'react-dom'
import HelloWorld from '@/pages/article/components/HelloWorld'
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>标题</h1>
        <p>ivan</p>
        <HelloWorld text="gggg" sayHello={this.sayHello} />
      </div>
    )
  }
  sayHello() {
    const div = document.createElement("div")
    div.innerHTML = "<h3>Hello world</h3>"
    document.getElementById("app").appendChild(div)
  }
}


ReactDOM.render(<App />, document.getElementById('app'))

const renderDiv = ()=> {
  let div = document.createElement('div')
  div.style.background = 'red'
  div.innerText = 'ivan'
  div.style.background = img
  return div
}
const a = '1'
console.log(format(a));
document.body.appendChild(renderDiv())