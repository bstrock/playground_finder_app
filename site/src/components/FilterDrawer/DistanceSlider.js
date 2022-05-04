import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

function valuetext(value) {
    return `${value} mi.`
}

export default function DistanceSlider(props) {

    const {handleValueUpdate, distVal} = props

    return (
        <Box sx={{width: 'auto', mt: 2}}>

            <Slider sx={{p: 2, ml: 2, width: '75%'}}
                    aria-label="Miles"
                    value={distVal}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={.5}
                    marks
                    min={.5}
                    max={4}
                    onChange={(event) => handleValueUpdate(event.target.value)}
            />

        </Box>
    );
}