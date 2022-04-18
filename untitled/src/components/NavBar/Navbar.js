import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {LinearProgress} from "@mui/material";
import { useTheme } from '@mui/styles';

export default function Navbar(props) {
    const {loading} = props
    const theme = useTheme()
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static"
                    sx={{height: '3rem'}}
                    color={'primary'}
            >
                    <Typography variant="h6"
                                sx={{flexGrow: 2, color: 'black', pt: 1, ml: 2}}
                    >
                        EP Playground Finder
                    </Typography>
            </AppBar>
            <>
                {
                    !loading ? <Box sx={{height: 5, bgcolor: theme.palette.primary.main}}/> :
                        <LinearProgress sx={{height: 5}}
                                        color={'primary'}
                                        variant={'indeterminate'}/>
                }
            </>
        </Box>
    )
}