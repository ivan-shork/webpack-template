import React from 'react'

export default class HelloWorld extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: 'ivan'
        }
    }
    render() {
        return (
            <div>
                <h3>点击say hello{this.props.text}</h3>
                <button onClick={()=>{this.props.sayHello()}}>btn</button>
            </div>
        )
    }

}