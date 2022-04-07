import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function FloatingButton(props) {

    // destructure props
    const {which, clickFunc} = props

    // styles object
    const styles = {
        button: {
            color: 'white'
        }
    }

    // defines which button properties to use
    const buttonGuide = {
        icon: which === 'filter' ? (<FilterAltIcon style={styles.button}/>) : (<MyLocationIcon style={styles.button}/>),
        tooltip: which === 'filter' ? 'Filter Playgrounds' : 'Find My Location',
        anchor: which === 'filter' ?  'left' : 'right'
    }

    const floatingButton = (
            <Fab sx={{bgcolor: 'orange'}}
                 size={'large'}
                 onClick={clickFunc}
            >
                <Tooltip title={buttonGuide.tooltip}>
                    {buttonGuide.icon}
                </Tooltip>
            </Fab>
        )

    return (
        <div className={`leaflet-bottom leaflet-${buttonGuide.anchor}`}>
            <div className="leaflet-control leaflet-bar">{floatingButton}</div>
        </div>
    )
}
