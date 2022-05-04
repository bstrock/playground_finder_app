import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ParkCard from "./ParkCard"
import EquipmentCard from "./EquipmentCard"
import {useCallback, useEffect, useState} from "react"
import L from "leaflet";

export default function InfoBox(props) {
    const {data, queryLocation} = props
    const [lat, lon] = data.centroid


    const getDistance = useCallback(
        (toPoint) => {
        const here = L.latLng(lat, lon)
        const there = L.latLng(toPoint.latitude, toPoint.longitude)

        // apparently this is how you're supposed to round a number to two digits without a trailing zero
        // javascript is so weird...what's wrong with round(val, digits) you guys... or this.round(2) ???
        return +(here.distanceTo(there) * 0.000621371).toFixed(2)
        }, [lat, lon]
    )

    const [value, setValue] = useState(0)
    const [distance, setDistance] = useState(getDistance(queryLocation))

    function TabPanel(props) {
        const {children, value, index} = props;

        return (
            <div role="tabpanel"
                 hidden={value !== index}
            >
                {value === index && (
                    <Box sx={{p: 1}}>
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        )
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    }

    const handleChange = (e) => {
        setValue(Number(e.target.name))
    }

    useEffect(() => {
            setDistance(getDistance(queryLocation))
        }, [getDistance, queryLocation]
    )

    return (
        <Box sx={{bgcolor: 'paper.background'}}>

            <Box sx={{flexGrow: 1, bgcolor: 'paper.background', display: "block"}}>
                <Tabs sx={{justifyContent: 'left', borderBottom: 1, borderColor: 'divider'}}
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      value={value}
                      onChange={e => handleChange(e)}>
                    <Tab label="Info" name={0}/>
                    <Tab label="Equipment" name={1}/>
                    <Tab label="Amenities" name={2}/>
                    <Tab label="Sports" name={3}/>
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <ParkCard data={data} distance={distance}/>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <EquipmentCard data={data} whichOne={'equipment'} distance={distance}/>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <EquipmentCard data={data} whichOne={'amenities'} distance={distance}/>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <EquipmentCard data={data} whichOne={'sports_facilities'} distance={distance}/>
            </TabPanel>
        </Box>
    )
}
