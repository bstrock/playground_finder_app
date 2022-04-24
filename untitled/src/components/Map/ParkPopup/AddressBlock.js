import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useTheme} from "@mui/styles";
import Divider from "@mui/material/Divider";

export default function AddressBlock(props) {

    const {street, city, state, zip} = props

    const theme = useTheme()

    return (
        <>
    <Divider/>
    <Typography sx={{m:0}} fontStyle={'italic'} variant={'caption'}>
        Overview
    </Typography>
    <Box sx={{display: 'flex', justifyContent: 'center', mr: 2, flexGrow: 1}}>
        <LocationOnIcon sx={{ml: 1, mr: 1, p: 0, color: theme.palette.secondary.main, alignSelf: 'center'}}
                        fontSize={'large'}/>
        <Typography display={'block'} variant={'subtitle2'}>
            <Box component={"span"} fontWeight='fontWeightBold'>
                {`${street}`}
            </Box>
            <br/>
            <Box component={'span'}>
                {`${city}, ${state} ${zip}`}
            </Box>
            <br/>
        </Typography>
    </Box>
    </>
    )
}