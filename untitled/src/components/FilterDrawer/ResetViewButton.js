import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {useMap} from "react-leaflet";
import Box from "@mui/material/Box";

export default function ResetViewButton(props) {
    const {initLocation} = props
    // styles object
    const styles = {
        button: {
            color: 'white',
        }
    }
    const map = useMap()
    const clickFunc = () => map.flyTo([initLocation.latitude, initLocation.longitude], 11.5)

    // defines which button properties to use


    return (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 1}}>
        <Fab sx={{bgcolor: 'orange', borderRadius: 0, width: '36px', height: '36px'}}
             size={'small'}
             onClick={clickFunc}
        >
            <Tooltip title={"Reset View"}>
                <FilterCenterFocusIcon style={styles.button}/>
            </Tooltip>
        </Fab>
        </Box>
    )
}
