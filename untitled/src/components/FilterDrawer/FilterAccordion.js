import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DistanceSlider from "./DistanceSlider";
import {Checkbox, Divider} from "@mui/material";
import Box from "@mui/material/Box";
import EquipmentCheckboxList from "./EquipmentCheckboxList";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";

export default function FilterAccordion(props) {

    // top-level lists of all filter assets
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

    const sportsList = [
        'Baseball Diamond',
        'Basketball Court',
        'Hockey Rink',
        'Horseshoes',
        'Skate Park',
        'Soccer Field',
        'Tennis Court',
        'Volleyball'
    ]

    // tracks state of the drawer element (closed vs. open)
    const [expanded, setExpanded] = useState(false)

    // tracks value of the slider, so it can be displayed in accordion description
    const [distValue, setDistValue] = useState(5)

    // tracks individual check boxes for filter criteria by category
    const [checkedEquipment, setCheckedEquipment] = useState([])
    const [checkedAmenities, setCheckedAmenities] = useState([])
    const [checkedSports, setCheckedSports] = useState([])

    // tracks whether all boxes in a category are checked (also if no boxes are checked)
    const [showEquipmentCheckbox, setShowEquipmentCheckbox] = useState(false)
    const [showAmenitiesCheckbox, setShowAmenitiesCheckbox] = useState(false)
    const [showSportsCheckbox, setShowSportsCheckbox] = useState(false)

    // event handler for clicking the filter button
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    };

    // event handler to update display of slider distance value
    const updateDistVal = (val) => setDistValue(val)

    // event handler to update state of checked value lists
    const updateCheckedEquipment = (val) => setCheckedEquipment(val)
    const updateCheckedAmenities = (val) => setCheckedAmenities(val)
    const updateCheckedSports = (val) => setCheckedSports(val)

    const checkboxOnClick = (e, setChecked, fullList, setShowCheckbox) => {
        // this function toggles check state for the top-level accordion check boxes, which propagates to children in the same container
        setChecked([])
        // in either case, switch the state of allChecked
        setShowCheckbox(false)
        e.stopPropagation()  // and stop the event from closing the sidebar drawer
    }

    const applyFiltersOnClick = () => {
        let queryParams = {
            radius: distValue,
            equipment: (checkedEquipment.length > 0) ? checkedEquipment.toString() : null,
            amenities: checkedAmenities.length > 0 ? checkedAmenities.toString() : null,
            sports: checkedSports.length > 0 ? checkedSports.toString() : null
        }
        props.setQueryParams(queryParams)
    }

    useEffect(() => {
        if (checkedEquipment.length > 0) {setShowEquipmentCheckbox(true)}
        }, [checkedEquipment]
    )

    return (
        <>
            {/* This box contains the Accordion */}
            <Box sx={{width: 'auto'}}>
                <Divider sx={{mb: 3}} variant={'middle'}/>

                {/***********************************/}
                {/* DISTANCE SLIDER ACCORDION PANEL */}
                {/***********************************/}

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                      aria-controls="panel1bh-content"
                                      id="panel1bh-header"
                    >
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

                {/***************************************/}
                {/* EQUIPMENT SELECTION ACCORDION PANEL */}
                {/***************************************/}

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{width: '33%', flexShrink: 1}} variant={'h6'}>
                            Equipment
                        </Typography>
                        <>
                            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                                !showEquipmentCheckbox ? null :
                                <Checkbox sx={{ml: '5rem'}} edge={'start'}
                                          size={'medium'}
                                          onClick={e => checkboxOnClick(e, setCheckedEquipment, equipList, setShowEquipmentCheckbox)}
                                          indeterminate={checkedEquipment.length > 0}
                                />
                            }
                        </>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EquipmentCheckboxList data={checkedEquipment}
                                               updateFunc={updateCheckedEquipment}
                                               fullList={equipList}
                        />
                    </AccordionDetails>
                </Accordion>

                {/***************************************/}
                {/* AMENITIES SELECTION ACCORDION PANEL */}
                {/***************************************/}

                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{width: '33%', flexShrink: 1}} variant={'h6'}>
                            Amenities
                        </Typography>
                        <>
                            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                                !showAmenitiesCheckbox ? null :
                                <Checkbox sx={{ml: '5rem'}} edge={'start'}
                                          size={'medium'}
                                          onClick={e => checkboxOnClick(e, setCheckedAmenities, amenitiesList, setShowAmenitiesCheckbox)}
                                          indeterminate={checkedAmenities.length > 0}
                                />
                            }
                        </>
                    </AccordionSummary>

                    <AccordionDetails>
                        <EquipmentCheckboxList data={checkedAmenities}
                                               updateFunc={updateCheckedAmenities}
                                               fullList={amenitiesList}
                        />
                    </AccordionDetails>
                </Accordion>

                {/***********************************************/}
                {/* SPORTS FACILITIES SELECTION ACCORDION PANEL */}
                {/***********************************************/}

                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{width: '33%', flexShrink: 1}} variant={'h6'}>
                            Sports
                        </Typography>
                        <>
                            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                                !showSportsCheckbox ? null :
                                <Checkbox sx={{ml: '5rem'}} edge={'start'}
                                          size={'medium'}
                                          onClick={e => checkboxOnClick(e, setCheckedSports, sportsList, setShowSportsCheckbox)}
                                          indeterminate={checkedSports.length > 0}
                                />
                            }
                    </>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EquipmentCheckboxList data={checkedSports}
                                               updateFunc={updateCheckedSports}
                                               fullList={sportsList}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box sx={{textAlign: 'center'}}>
                <Button sx={{mt: 5, color: 'white'}}
                        variant={'contained'}
                        size={'large'}
                        onClick={applyFiltersOnClick}
                >
                    <Typography sx={{fontWeight: 400}}
                                align={'center'}
                                variant={'subtitle1'}
                    >
                        Apply Filters
                    </Typography>
                </Button>
            </Box>
        </>
    )
}