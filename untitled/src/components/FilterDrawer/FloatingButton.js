import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';

export default function FloatingButton(props) {

    // destructure props
    const {which, clickFunc} = props

    // styles object
    const styles = {
        button: {
            color: 'white',
        }
    }

    const getButtonGuide = (which) => {
        let guide = {}

        // eslint-disable-next-line default-case
        switch (which) {
            case 'filter':
                guide.icon = (<FilterAltIcon style={styles.button}/>)
                guide.tooltip = "Filter Playgrounds"
                break
            case 'location':
                guide.icon = (<MyLocationIcon style={styles.button}/>)
                guide.tooltip = "Find My Location"
                break
            case 'reset':
                guide.icon = (<FilterCenterFocusIcon style={styles.button}/>)
                guide.tooltip = 'Reset Map View'
            }
            return guide
        }

    const buttonGuide = getButtonGuide(which)

    return (

        <Fab sx={{bgcolor: 'orange', mb: 4, ml: 3, mr: 3}}
             size={'large'}
             onClick={clickFunc}
        >
            <Tooltip title={buttonGuide.tooltip}>
                {buttonGuide.icon}
            </Tooltip>
        </Fab>
    )
}
