import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DistanceSlider from "./DistanceSlider";
import {ButtonGroup, Checkbox, Divider} from "@mui/material";
import Box from "@mui/material/Box";
import EquipmentCheckboxList from "./EquipmentCheckboxList";
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
    const [distValue, setDistValue] = useState(4)

    // tracks individual check boxes for filter criteria by category
    const [checkedEquipment, setCheckedEquipment] = useState(props.queryParams.equipment)
    const [checkedAmenities, setCheckedAmenities] = useState(props.queryParams.amenities)
    const [checkedSports, setCheckedSports] = useState(props.queryParams.sports_facilities)

    // tracks whether all boxes in a category are checked (also if no boxes are checked)
    const [showEquipmentCheckbox, setShowEquipmentCheckbox] = useState(0)
    const [showAmenitiesCheckbox, setShowAmenitiesCheckbox] = useState(0)
    const [showSportsCheckbox, setShowSportsCheckbox] = useState(0)

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

    const getQueryParams = () => {
        // this function captures the current filter value state when Apply Filters is clicked
        return {
            radius: distValue,
            equipment: (checkedEquipment.length > 0) ? checkedEquipment.toString() : [],
            amenities: checkedAmenities.length > 0 ? checkedAmenities.toString() : [],
            sports_facilities: checkedSports.length > 0 ? checkedSports.toString() : []
        }
    }

    const filtersOnClick = (e) => {
        // filter apply/clear actions...
        // 1. which button is it?  apply is a boolean where 'apply filters' is true
        const apply = e.target.outerText.toLowerCase() === 'apply filters'

        // 2. if we're applying, we poll the current checkbox state, otherwise for clear we use the initial state
        const params = apply ? getQueryParams() : props.initQueryParams

        // 3. we use the setter hooks as appropriate, and close the drawer either way
        props.setQueryParams(params)
        props.setShowSearchRadius(apply)
        props.setDrawerOpen(false)
    }

    // these effects hid or show the checkbox in the accordion summary based on whether or not checkboxes in that accordion are checked
    useEffect(() => {
        const toggle = checkedEquipment.length > 0 ? 1 : 0
        setShowEquipmentCheckbox(toggle)
        }, [checkedEquipment]
    )

    useEffect(() => {
        const toggle = checkedAmenities.length > 0 ? 1 : 0
        setShowAmenitiesCheckbox(toggle)
            }, [checkedAmenities]
    )

    useEffect(() => {
        const toggle = checkedSports.length > 0 ? 1 : 0
        setShowSportsCheckbox(toggle)
        }, [checkedSports]
    )

var styles = {
        accordionSummary: {
            height: '1em',
            justifyContent: 'center',
            alignContent: 'center',
            width: 'fixed'
        },
        accordionButtonText: {
            paddingTop: 1,
            paddingBottom: 1,
            width: '33%',
            flexGrow: 1
        },
        checkbox: {
                paddingLeft: '5rem'
            }
    }

    return (
        <>
            {/* This box contains the Accordion */}
            <Box sx={{width: '17em', margin: 'auto'}}>
                <Divider sx={{mb: 3}} variant={'middle'}/>

                {/***********************************/}
                {/* DISTANCE SLIDER ACCORDION PANEL */}
                {/***********************************/}

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary style={styles.accordionSummary}
                                      expandIcon={<ExpandMoreIcon/>}
                                      aria-controls="panel1bh-content"
                                      id="panel1bh-header"
                    >
                        {/* PANEL LABEL- UPDATES WITH SLIDER CHANGE */}
                        <Typography sx={{mr: 1, flexShrink: 1, alignContent: 'left'}} variant={'h6'}>
                            Distance (miles):
                        </Typography>
                        <Typography sx={{ml: 3, width: '15%', flexGrow: 1, alignItems: 'right'}} variant={'h6'}>
                            {` ${distValue} `}
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
                        style={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography style={styles.accordionButtonText}
                                    variant={'h6'}>
                            Equipment
                        </Typography>
                        <>
                            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                                    <Checkbox sx={{ml: '5rem', flexShrink: 1, opacity: showEquipmentCheckbox}} edge={'start'}
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
                    <AccordionSummary style={styles.accordionSummary}
                                      expandIcon={<ExpandMoreIcon/>}
                                      aria-controls="panel3bh-content"
                                      id="panel3bh-header"
                    >
                        <Typography style={styles.accordionButtonText}
                                    variant={'h6'}>
                            Amenities
                        </Typography>
                        <>
                            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                                    <Checkbox sx={{ml: '5rem', flexShrink: 1, opacity: showAmenitiesCheckbox}} edge={'start'}
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
                    <AccordionSummary style={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography style={styles.accordionButtonText}
                                    variant={'h6'}>
                            Sports
                        </Typography>
                        <>
                            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                                !showSportsCheckbox ? null :
                                    <Checkbox sx={{ml: '5rem', opacity: showSportsCheckbox, flexShrink: 1}} edge={'start'}
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

            {/* APPLY/CLEAR FILTERS BUTTONS */}
            <Box sx={{textAlign: 'center'}}>
                <ButtonGroup sx={{width: '17em'}}>
                    <Button sx={{mt: 5, color: 'white'}}
                            key={'apply'}
                            variant={'contained'}
                            size={'medium'}
                            onClick={e => filtersOnClick(e)}
                    >
                        <Typography sx={{fontWeight: 500}}
                                    align={'center'}
                                    variant={'subtitle1'}
                        >
                            Apply Filters
                        </Typography>
                    </Button>

                    <Button sx={{mt: 5, color: 'green', backgroundColor: 'white'}}
                            key={'clear'}
                            variant={'contained'}
                            size={'medium'}
                            onClick={e => filtersOnClick(e)}
                    >
                        <Typography sx={{fontWeight: 400}}
                                    align={'center'}
                                    variant={'subtitle1'}
                        >
                            Clear Filters
                        </Typography>
                    </Button>

                </ButtonGroup>
            </Box>
        </>
    )
}