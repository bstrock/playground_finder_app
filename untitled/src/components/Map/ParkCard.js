import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import {Avatar, Card, CardActions, CardContent, CardHeader, Divider} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

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

export default function ParkCard(props) {
    const [value, setValue] = React.useState(0);
    const avatar = () => {
        return (
            <Avatar>
            <DirectionsCarIcon />
        </Avatar>)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log('info box')
    console.log(props.data)

    const photo = `../../images/${props.data.site_id}.jpg`

    return (
                <Card sx={ { display: 'block'} }
                      variant={'outlined'}>
                    <CardContent sx={{ backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'}}>
                        <CardHeader sx={ {borderBottom: 1, borderColor: 'divider', textAlign: 'center'} }
                                    title={props.data.site_name}
                                    component={'headline'}/>
                        <CardMedia sx={ {display: 'block', mb: 2} }
                                   component="img"
                                   height="100%"
                                   image={require ("../../images/" + props.data.site_id + ".jpg")}
                                   alt={props.data.site_name + ' photo'}/>
                        <Typography align={'center'}
                                    variant={'h6'}>
                            {props.data.addr_street1}
                        </Typography>
                        <Typography align={'center'}
                                    variant={'subtitle1'}>
                            {`${props.data.addr_city}, ${props.data.addr_state} ${props.data.addr_zip}`}
                        </Typography>

                        <Divider />

                        <CardActions sx={ {align: 'center', justifyContent: 'center'} }>
                            <IconButton sx={ {color: 'black'} }
                                size={'large'}>
                                <DirectionsWalkIcon />
                            </IconButton>
                            <IconButton sx={ {color: 'black'} }
                                        size={'large'}>
                                <DirectionsBikeIcon />
                            </IconButton>
                            <IconButton sx={ {color: 'black'} }
                                        size={'large'}>
                                <DirectionsCarIcon />
                            </IconButton>
                        </CardActions>
                        <Divider />
                    </CardContent>
                </Card>
    );
}
