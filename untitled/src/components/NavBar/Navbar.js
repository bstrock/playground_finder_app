import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {LinearProgress} from "@mui/material";

export default function Navbar(props) {
    const {loading} = props
    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="relative"
                    sx={{height: '2.1rem'}}
                    color={'primary'}
            >
                    <Typography variant="h6"
                                sx={{display: 'flex', color: 'black', alignSelf: 'center'}}
                    >
                        Find Playgrounds in Eden Prairie
                    </Typography>
                <>
                    {
                        !loading ? <Box sx={{height: 5, bgcolor: 'primary'}}/> :
                            <LinearProgress sx={{height: 8}}
                                            color={'primary'}
                                            variant={'indeterminate'}/>
                    }
                </>
            </AppBar>

        </Box>
    )
}