import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchButton from "./FilterButton";
import DistanceSlider from "./DistanceSlider";
import FilterAccordion from "./FilterAccordion";
import Typography from "@mui/material/Typography";

export default function FilterDrawer() {
    const [state, setState] = React.useState({left: true});

    const toggleDrawer = (key, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [key]: open });
    };

    const  key = 'drawer'

    return (
        <>
            <React.Fragment key={key}>
                <SearchButton clickFunc={toggleDrawer(key, true)}/>
                <Drawer anchor={'left'}
                        open={state[key]}
                        onClose={toggleDrawer(key, false)}>
                    <Box sx={ { anchor: 'left', width: '80%', justifyContent: 'center', alignContent: 'center'} }
                         role="presentation"
                         onKeyDown={toggleDrawer(key, false)}>


                        <Typography sx={{mt: 5, mb:3}} align={'center'} variant={'h4'}>
                            Filter Playgrounds
                        </Typography>
                        <FilterAccordion />
                        <Divider />
                    </Box>
                </Drawer>
            </React.Fragment>
        </>
    );
}