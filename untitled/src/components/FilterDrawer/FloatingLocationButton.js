import {useMemo} from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {Fab, Tooltip} from "@mui/material";

export default function FloatingLocationButton(props) {

    const searchButton = useMemo(
        () => (
            <Fab sx={{bgcolor: 'green'}}
                 size={'medium'}
                 onClick={props.clickFunc}
            >
                <Tooltip title={'Filter Playgrounds'}>
                    <MyLocationIcon sx={{color: 'white'}}/>
                </Tooltip>
            </Fab>
        )
    )

    return (
        <div className={'leaflet-bottom leaflet-right'}>
            <div className="leaflet-control leaflet-bar">{searchButton}</div>
        </div>
    )
}
