import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ParkCard from "./ParkCard"
import EquipmentCard from "./EquipmentCard"
import {Component} from "react"

export default class InfoBox extends Component {
    state = {value: 0, data: null}

    handleChange = (event, newValue) => {
        this.setState({value: newValue, data: this.state.data})
    }

    TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 0}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    constructor(props) {
        super(props)
        this.TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
        };

        this.state.data = props.data

    }

    render() {
        return (
            <Box sx={{bgcolor: 'paper.background'}}>

                <Box sx={{flexGrow: 1, bgcolor: 'paper.background', display: "block"}}>
                    <Tabs sx={{justifyContent: 'left', borderBottom: 1, borderColor: 'divider'}}
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                          value={this.state.value}
                          onChange={this.handleChange}
                          aria-label="info-box-tabs">
                        <Tab label="Info" {...this.a11yProps(0)} />
                        <Tab label="Equipment" {...this.a11yProps(1)} />
                        <Tab label="Amenities" {...this.a11yProps(2)} />
                        <Tab label="Sports" {...this.a11yProps(3)} />
                        <Tab label="Reviews" {...this.a11yProps(4)} />
                        <Tab label="Reports" {...this.a11yProps(5)} />
                    </Tabs>
                </Box>

                <this.TabPanel value={this.state.value} index={0}>
                    <ParkCard data={this.state.data}/>
                </this.TabPanel>

                <this.TabPanel value={this.state.value} index={1}>
                    <EquipmentCard data={this.state.data} whichOne={'equipment'}/>
                </this.TabPanel>

                <this.TabPanel value={this.state.value} index={2}>
                    <EquipmentCard data={this.state.data} whichOne={'amenities'}/>
                </this.TabPanel>

                <this.TabPanel value={this.state.value} index={3}>
                    <EquipmentCard data={this.state.data} whichOne={'sports_facilities'}/>
                </this.TabPanel>

                <this.TabPanel value={this.state.value} index={4}>
                    Reviews Will Go Here
                </this.TabPanel>

                <this.TabPanel value={this.state.value} index={5}>
                    Reports Will Go Here
                </this.TabPanel>
            </Box>
        );
    }
}
