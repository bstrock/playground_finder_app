import React, {Component} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
