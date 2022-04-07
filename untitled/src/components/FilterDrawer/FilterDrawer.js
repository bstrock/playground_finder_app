import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import FloatingButton from "./FloatingButton";
import FilterAccordion from "./FilterAccordion";
import Typography from "@mui/material/Typography";
import {useMap} from "react-leaflet";

export default function FilterDrawer(props) {
    const [drawerOpen, setDrawerOpen] = React.useState(false)

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    }

    // destructure props
    const {
        queryParams,
        initQueryParams,
        setQueryParams,
        setShowSearchRadius,
        userClickedLocate,
        setUserClickedLocate
    } = props

    const map = useMap()

        return (
            <>
                <FloatingButton clickFunc={toggleDrawer(true)}
                                      which={'filter'}
                />
                <FloatingButton clickFunc={() => userClickedLocate ? map.locate() : setUserClickedLocate(true)}
                                which={'location'}
                />
                <Drawer anchor={'left'}
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                >
                    <Box sx={{
                        anchor: 'left',
                        width: '80%',
                        justifyContent: 'center',
                        alignContent: 'center',
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

                        <FilterAccordion queryParams={queryParams}
                                         initQueryParams={initQueryParams}
                                         setQueryParams={setQueryParams}
                                         setShowSearchRadius={setShowSearchRadius}
                                         setDrawerOpen={setDrawerOpen}
                        />
                        <Divider/>
                    </Box>
                </Drawer>
            </>
        );
    }
