import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ParkCard from "./ParkCard";
import TableCard from "./EquipmentCard";


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
    }

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
                <TableCard data={props.data} whichOne={'equipment'} />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <TableCard data={props.data} whichOne={'amenities'} />
            </TabPanel>

            <TabPanel value={value} index={3}>
                <TableCard data={props.data} whichOne={'sports_facilities'} />
            </TabPanel>

            <TabPanel value={value} index={4}>
                Reviews Will Go Here
            </TabPanel>

            <TabPanel value={value} index={5}>
                Reports Will Go Here
            </TabPanel>
        </Box>
    );
}
