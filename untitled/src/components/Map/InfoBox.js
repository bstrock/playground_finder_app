import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import {Card, CardActions, CardContent, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";

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
                <Box sx={{ p: 0 }}>
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
        <>
        <Box sx={ { bgcolor: 'paper.background'} }>
            <Box sx={ {flexGrow: 1, bgcolor: 'paper.background', display: "flex"} }>
                <Tabs sx={ { borderRight: 1, borderColor: 'divider'} }
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example">
                    <Tab label="Info" {...a11yProps(0)} />
                    <Tab label="Reviews" {...a11yProps(1)} />
                    <Tab label="Equipment" {...a11yProps(2)} />
                    <Tab label="Amenities" {...a11yProps(3)} />
                    <Tab label="Sports" {...a11yProps(4)} />
                    <Tab label="Reports" {...a11yProps(5)} />
            </Tabs>
        </Box>
            <TabPanel value={value}
                      index={0}>
                <Card sx={ { display: 'block'} }
                      variant={'outlined'}>
                    <CardContent sx={{ backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'}}>
                        <CardHeader sx={ {borderBottom: 1, borderColor: 'divider', textAlign: 'center'} }
                                    title={props.data.site_name} />
                        <CardMedia component="img"
                                   height="140"
                                   image={require ("../../images/S030.jpg")}
                                   alt={props.data.site_name + ' photo'}/>
                        <>
                        <Typography sx={{p:0}} variant={'subtitle1'}>
                            {props.data.addr_street1 + '\n' + props.data.addr_city + ', ' + props.data.addr_state + ' ' + props.data.addr_zip}
                        </Typography>
                        </>
                        <CardActions>
                            <Button size="small" color="primary">
                                Let's Go!
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
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
        </>
    );
}
