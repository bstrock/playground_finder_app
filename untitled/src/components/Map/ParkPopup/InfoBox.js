import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import {Avatar, Card, CardActions, CardContent, CardHeader, Divider} from "@mui/material";
import Button from "@mui/material/Button";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ParkCard from "./ParkCard";
import EquipmentCard from "./EquipmentCard";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={ { p: 0 } }>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function InfoBox(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log('info box')
    console.log(props.data)

    return (
        <Box sx={ { bgcolor: 'paper.background'} }>

            <Box sx={ {flexGrow: 1, bgcolor: 'paper.background', display: "block"} }>
                <Tabs sx={ { justifyContent: 'left', borderBottom: 1, borderColor: 'divider'} }
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      value={value}
                      onChange={handleChange}
                      aria-label="info-box-tabs">
                    <Tab label="Info" {...a11yProps(0)} />
                    <Tab label="Reviews" {...a11yProps(1)} />
                    <Tab label="Equipment" {...a11yProps(2)} />
                    <Tab label="Amenities" {...a11yProps(3)} />
                    <Tab label="Sports" {...a11yProps(4)} />
                    <Tab label="Reports" {...a11yProps(5)} />
                </Tabs>
        </Box>

            <TabPanel value={value} index={0}>
                <ParkCard data={props.data} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>

            <TabPanel value={value} index={2}>
                <EquipmentCard data={props.data} />
            </TabPanel>

            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    );
}
