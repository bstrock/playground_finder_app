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
        <Box sx={{mb: 3, display: 'flex'}}>
            <AppBar position="absolute"
                    sx={{height: '2rem'}}
                    color={'primary'}
            >
                    <Typography variant="h6"
                                sx={{display: 'flex', color: 'black', alignSelf: 'center'}}
                    >
                        Find Playgrounds in Eden Prairie
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