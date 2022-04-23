import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CircularProgress, LinearProgress} from "@mui/material";

export default function Navbar(props) {
    const {loading, numberOfResults} = props
    console.log(numberOfResults)
    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="relative"
                    sx={{height: '2.1rem'}}
                    color={'primary'}
            >
                <Box sx={{display: 'flex'}}>
                    <Typography variant="h6" sx={{color: 'black', ml: 1, flexGrow: 1}}>
                        Eden Prairie Playgrounds
                    </Typography>
                    <Typography component={'span'} sx={{display: 'block', color: 'black', mr: 3, justifySelf: 'flex-end', alignSelf: 'flex-end', flexShrink: 1}} variant={'subtitle1'}>
                        In View:  {loading ? (<CircularProgress sx={{alignSelf: 'center'}} color={'secondary'} variant={"indeterminate"} size={17}/>) : numberOfResults}
                    </Typography>

                </Box>
                <>
                    {
                        !loading ? <Box sx={{height: 10, bgcolor: 'primary'}}/> :
                            <LinearProgress sx={{height: 10}}
                                            color={'primary'}
                                            variant={'indeterminate'}/>
                    }
                </>
            </AppBar>

        </Box>
    )
}