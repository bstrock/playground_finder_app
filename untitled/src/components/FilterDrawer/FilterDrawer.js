import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import FilterAccordion from "./FilterAccordion";
import Typography from "@mui/material/Typography";

export default function FilterDrawer(props) {


    // destructure props
    const {
        queryParams,
        initQueryParams,
        setQueryParams,
        drawerOpen,
        toggleDrawer
    } = props

    return (
        <>
            <Drawer anchor={'left'}
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
            >
                <Box sx={{
                    anchor: 'left',
                    mt: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)',
                    border: 1,
                    borderRadius: '5px'
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
                                     toggleDrawer={toggleDrawer}
                    />
                    <Divider/>
                </Box>
            </Drawer>
        </>
    )
}
