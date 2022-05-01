import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import FilterAccordion from "./FilterAccordion";
import Typography from "@mui/material/Typography";
import ParkList from "../ParkList";

export default function FilterDrawer(props) {

    // destructure props
    const {
        queryParams,
        initQueryParams,
        setQueryParams,
        drawerOpen,
        setDrawerOpen,
        toggleDrawer,
        setShowSearchRadius,
        distValue,
        setDistValue,
        allData,
        searchList,
        setSearchList,
        setOpenSite
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
                    border: 0,
                    borderRadius: 0,
                    boxShadow: 0
                }}
                     role="presentation"
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
                                     setDrawerOpen={setDrawerOpen}
                                     setShowSearchRadius={setShowSearchRadius}
                                     distValue={distValue}
                                     setDistValue={setDistValue}
                    />
                    <Divider/>
                    <Typography sx={{mt: 5, mb: 3}}
                                align={'center'}
                                variant={'h4'}
                    >
                        Search By Name
                    </Typography>
                <ParkList data={allData}
                          searchList={searchList}
                          setSearchList={setSearchList}
                          setOpenSite={setOpenSite}
                          setDrawerOpen={setDrawerOpen}
                />
                </Box>
            </Drawer>
        </>
    )
}
