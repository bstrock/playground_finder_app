import React, {Component} from "react";

export default class Popup extends Component {
data = null

constructor(props) {
    super(props)
    this.data = props.data
}

render() {
    if (this.data === null) {
        console.log('null render')
        return null
        }
    return null
    }
}