import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import {Fab, Tooltip} from "@mui/material";
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
            <Fab sx={{bgcolor: 'orange'}}
                 size={'large'}
                 onClick={clickFunc}
            >
                <Tooltip title={"Reset View"}>
                    <FilterCenterFocusIcon style={styles.button}/>
                </Tooltip>
            </Fab>
    )
}
