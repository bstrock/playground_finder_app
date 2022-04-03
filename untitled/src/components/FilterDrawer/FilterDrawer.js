import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import SearchButton from "./FloatingFilterButton";
import FilterAccordion from "./FilterAccordion";
import Typography from "@mui/material/Typography";

export default function FilterDrawer(props) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const keys = props.keys

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    if (keys === null) {
        return null
    } else {

        return (
            <>
                <SearchButton clickFunc={toggleDrawer(true)}/>
                <Drawer anchor={'left'}
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                >
                    <Box sx={{
                        anchor: 'left',
                        width: '80%',
                        justifyContent: 'center',
                        alignContent: 'center',
                        overflowY: 'hidden'
                    }}
                         role="presentation"
                         onKeyDown={toggleDrawer(false)}
                    >
                        <Typography sx={{mt: 5, mb: 3}}
                                    align={'center'}
                                    variant={'h4'}
                        >
                            Filter Playgrounds
                        </Typography>
                        <FilterAccordion keys={keys}
                                         setQueryParams={props.setQueryParams}
                                         setShowSearchRadius={props.setShowSearchRadius}
                        />
                        <Divider/>
                    </Box>
                </Drawer>
            </>
        );
    }
}
