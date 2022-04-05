import {useMemo} from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function FloatingButton(props) {
    const styles = {
        button: {
            color: 'white'
        }
    }

    const buttonGuide = {
        icon: props.which === 'filter' ? (<FilterAltIcon style={styles.button}/>) : (<MyLocationIcon style={styles.button}/>),
        tooltip: props.which === 'filter' ? 'Filter Playgrounds' : 'Find My Location',
        anchor: props.which === 'filter' ?  'left' : 'right'
    }

    const floatingButton = (
            <Fab sx={{bgcolor: 'green'}}
                 size={'large'}
                 onClick={props.clickFunc}
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
