import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {CircularProgress, LinearProgress} from "@mui/material";

export default function Navbar(props) {
    const {loading, numberOfResults, loadingProgress} = props

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar position="relative"
                    sx={{height: '3.15rem', pt: 1}}
                    color={'primary'}
            >
                <Box sx={{display: 'flex'}}>
                    <Typography sx={{fontSize: '1.18rem', color: 'white', ml: 1, flexGrow: 1}}>
                        Eden Prairie Playgrounds
                    </Typography>
                    <Typography component={'span'} sx={{
                        display: 'block',
                        color: 'black',
                        bgcolor: 'white',
                        borderRadius: '10px',
                        mr: 1,
                        mb: 1,
                        mt: .25,
                        justifyContent: 'flex-end',
                        alignSelf: 'center',
                        flexShrink: 1,
                        width: '6rem',
                    }} variant={'subtitle1'}>
                        {/*non-breaking space*/ '\u00A0'} In View: {'\u00A0'}
                        {// conditional rendering for # of results/circular progress indicator
                            loading ? (
                                <CircularProgress sx={{alignSelf: 'center', justifySelf: 'center'}} color={'secondary'}
                                                  variant={"indeterminate"}
                                                  size={17}/>) : numberOfResults}
                    </Typography>

                </Box>
                <>
                    { // conditional rendering for linear progress indicator
                        !loading ? <Box sx={{height: 10, bgcolor: 'primary'}}/> : <LinearProgress sx={{height: 10}}
                                                                                                  color={'secondary'}
                                                                                                  variant={loadingProgress <= 100 ? 'determinate' : 'indeterminate'}
                                                                                                  value={loadingProgress}
                        />
                    }
                </>
            </AppBar>
        </Box>
    )
}