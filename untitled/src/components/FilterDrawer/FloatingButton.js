import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

export default function FloatingButton(props) {

    // destructure props
    const {which, clickFunc} = props
    // styles object
    const buttonColorStyle = {color: 'white'}

    const getButtonGuide = (which) => {
        let guide = {}
        // eslint-disable-next-line default-case
        switch (which) {
            case 'filter':
                guide.icon = (<FilterAltIcon sx={buttonColorStyle}/>)
                guide.tooltip = "Filter Playgrounds"
                break
            case 'location':
                guide.icon = (<MyLocationIcon sx={buttonColorStyle}/>)
                guide.tooltip = "Find My Location"
                break
            case 'reset':
                guide.icon = (<ZoomOutMapIcon sx={buttonColorStyle}/>)
                guide.tooltip = 'Reset Map View'
            }
            return guide
        }

    const buttonGuide = getButtonGuide(which)

    return (

        <Fab sx={{mb: 5, ml: 3, mr: 3}}
             color={'secondary'}
             size={'large'}
             onClick={clickFunc}
        >
            <Tooltip title={buttonGuide.tooltip}>
                {buttonGuide.icon}
            </Tooltip>
        </Fab>
    )
}
