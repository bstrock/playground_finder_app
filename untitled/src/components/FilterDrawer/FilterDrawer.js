import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import SearchButton from "./FilterButton";
import FilterAccordion from "./FilterAccordion";
import Typography from "@mui/material/Typography";

export default function FilterDrawer(props) {
    const [state, setState] = React.useState({left: true});
    const keys = props.keys

    const toggleDrawer = (key, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [key]: open});
    };

    const key = 'drawer'

    if (keys === null) {
        return null
    } else {

        return (
            <>
                <React.Fragment key={key}>
                    <SearchButton clickFunc={toggleDrawer(key, true)}/>
                    <Drawer anchor={'left'}
                            open={state[key]}
                            onClose={toggleDrawer(key, false)}
                    >
                        <Box sx={{anchor: 'left', width: '80%', justifyContent: 'center', alignContent: 'center', overflowY: 'hidden'}}
                             role="presentation"
                             onKeyDown={toggleDrawer(key, false)}
                        >
                            <Typography sx={{mt: 5, mb: 3}}
                                        align={'center'}
                                        variant={'h4'}
                            >
                                Filter Playgrounds
                            </Typography>
                            <FilterAccordion keys={keys} setQueryParams={props.setQueryParams}/>
                            <Divider/>
                        </Box>
                    </Drawer>
                </React.Fragment>
            </>
        );
    }
}
