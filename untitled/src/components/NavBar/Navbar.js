import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static"
                    sx={{height: '3rem', bgcolor: 'linear-gradient(90deg, rgba(210,255,112,1) 10%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'}}>
                    <Typography variant="h6"
                                sx={{flexGrow: 2, color: 'white', pt: 1, ml: 2}}
                    >
                        EP Playground Finder
                    </Typography>
            </AppBar>
        </Box>
    )
}