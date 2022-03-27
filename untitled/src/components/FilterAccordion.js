import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DistanceSlider from "./DistanceSlider";
import {Divider} from "@mui/material";
import Box from "@mui/material/Box";

export default function FilterAccordion() {
    const [expanded, setExpanded] = React.useState(false);
    var [distValue, setDistValue] = React.useState(5)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const updateDistVal = (val) => setDistValue(val)

    return (
        <>
            <Box sx={ {width: 'auto'} }>

            <Divider sx={{mb: 3}} variant={'middle'}/>

            <Accordion expanded={expanded === 'panel1'}
                       onChange={handleChange('panel1')}>

                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header">
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
                <AccordionDetails>
                    <DistanceSlider handleValueUpdate={updateDistVal}/>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        You are currently not an owner
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                        varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                        laoreet.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
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