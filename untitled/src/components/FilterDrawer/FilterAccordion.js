import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DistanceSlider from "./DistanceSlider";
import {Divider} from "@mui/material";
import Box from "@mui/material/Box";
import CheckboxList from "./EquipmentCheckboxList";
import EquipmentCheckboxList from "./EquipmentCheckboxList";

export default function FilterAccordion(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [distValue, setDistValue] = React.useState(5);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const updateDistVal = (val) => setDistValue(val)
    const equipList = [
        'Bouncers',
        'Bridges',
        'Cooperative',
        'Climbers',
        'Diggers',
        'Ladders',
        'Musical',
        'Sensory',
        'Slides',
        'Spinners',
        'Accessible Swings',
        'Standard Swings',
        'Toddler Swings'
    ]

    const amenitiesList = [
        'Beach',
        'Benches',
        'Concessions',
        'Grills',
        'Picnic Tables',
        'Indoor Restroom',
        'Shelter',
        'Sun Shades'
    ]

    const sportsFacilities = [
        'Baseball Diamond',
        'Basketball Court',
        'Hockey Rink',
        'Horseshoes',
        'Skate Park',
        'Soccer Field',
        'Tennis Court',
        'Volleyball'
    ]


    return (
        <>
            {/* This box contains the Accordion */}
            <Box sx={ {width: 'auto'} }>

            <Divider sx={{mb: 3}} variant={'middle'}/>

            {/* DISTANCE SLIDER ACCORDION PANEL */}
            <Accordion expanded={expanded === 'panel1'}
                       onChange={handleChange('panel1')}>

                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header">

                    {/* PANEL LABEL- UPDATES WITH SLIDER CHANGE
                        3 components are used to ensure decimal change doesn't move miles label and cause flicker
                        ie:     2 miles -> 2.5 miles
                        thus:   2   miles -> 2.5 miles */}
                    <Typography sx={{mr: 1, flexShrink: 1, alignContent: 'left'}} variant={'h6'}>
                        Distance:
                    </Typography>
                    <Typography sx={{ml: 1, width: '15%', alignContent: 'center'}} variant={'h6'}>
                        {` ${distValue} `}
                    </Typography>
                    <Typography sx={{flexShrink: 1}} variant={'h6'}>
                        Miles
                    </Typography>
                </AccordionSummary>

                {/* SLIDER GOES HERE- TAKES IN UPDATE CALLBACK FUNCTION */}
                <AccordionDetails>
                    <DistanceSlider handleValueUpdate={updateDistVal}/>
                </AccordionDetails>
            </Accordion>

            {/* EQUIPMENT SELECTION ACCORDION PANEL */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header">
                    <Typography sx={ { width: '33%', flexShrink: 1 } } variant={'h6'}>
                        Equipment
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EquipmentCheckboxList data={equipList} />
                </AccordionDetails>
            </Accordion>

            {/* AMENITIES SELECTION ACCORDION PANEL */}
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header">
                    <Typography sx={ { width: '33%', flexShrink: 1 } } variant={'h6'}>
                        Amenities
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EquipmentCheckboxList data={amenitiesList} />
                </AccordionDetails>
            </Accordion>

            {/* SPORTS FACILITIES SELECTION ACCORDION PANEL */}
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header">
                    <Typography sx={ { width: '33%', flexShrink: 1 } } variant={'h6'}>
                        Sports Facilities
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EquipmentCheckboxList data={sportsFacilities} />
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Advanced settings
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Filtering has been entirely disabled for whole web server
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            </Box>
        </>
    );
}