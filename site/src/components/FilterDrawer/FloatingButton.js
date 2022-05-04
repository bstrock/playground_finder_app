import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

export default function FloatingButton(props) {

    // destructure props
    const {which, clickFunc, buttonColor} = props
    // styles object
    const width = window.innerWidth

    const getButtonGuide = (which) => {
        let guide = {}
        // eslint-disable-next-line default-case
        switch (which) {
            case 'filter':
                guide.icon = (<FilterAltIcon sx={{color: 'white', borderColor: 'white'}}/>)
                guide.tooltip = "Filter Playgrounds"
                break
            case 'location':
                guide.icon = (<MyLocationIcon sx={{color: 'black'}}/>)
                guide.tooltip = "Find My Location"
                break
            case 'reset':
                guide.icon = (<ZoomOutMapIcon sx={{color: 'white'}}/>)
                guide.tooltip = 'Reset Map View'
            }
            return guide
        }

    const buttonGuide = getButtonGuide(which)

    return (

        <Fab sx={{mb: width < 500 ? '16vh' : '8vh', ml: 3, mr: 3, borderColor: 'white', borderWidth: 'thick'}}
             color={buttonColor}
             size={'large'}
             onClick={clickFunc}
        >
            <Tooltip title={buttonGuide.tooltip}>
                {buttonGuide.icon}
            </Tooltip>
        </Fab>
    )
}
