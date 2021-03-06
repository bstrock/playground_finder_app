import * as React from 'react'
import {useEffect, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DistanceSlider from "./DistanceSlider"
import {ButtonGroup} from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import AccordionTemplate from "./AccordionTemplate"
import {useTheme} from "@mui/styles";
import {useMap} from "react-leaflet";

export default function FilterAccordion(props) {

    // props destructuring
    const {
        queryParams,
        initQueryParams,
        setQueryParams,
        setDrawerOpen,
        setShowSearchRadius,
        distValue,
        setDistValue
    } = props

    const miles_to_meters = (radius) => radius * 1609.34

    // top-level lists of all filter assets
    const equipList = [
        'Bouncers',
        'Climbers',
        'Diggers',
        'Fire Poles',
        'Monkey Bars',
        'Spinners',
        'Tunnels',
        'Seesaws',
        'Accessible Swings',
        'Standard Swings',
        'Toddler Swings'
    ]

    const amenitiesList = [
        'Beach',
        'Benches',
        'Changing Rooms',
        'Concessions',
        'Grills',
        'Picnic Tables',
        'Indoor Restroom',
        'Portable Restroom',
        'Shelter',
        'Splash Pad',
        'Sun Shades'
    ]

    const sportsList = [
        'Badminton',
        'Baseball Diamond',
        'Basketball Court',
        'Disc Golf',
        'Foursquare',
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

    // tracks individual check boxes for filter criteria by category
    const [checkedEquipment, setCheckedEquipment] = useState(queryParams.equipment)
    const [checkedAmenities, setCheckedAmenities] = useState(queryParams.amenities)
    const [checkedSports, setCheckedSports] = useState(queryParams.sports_facilities)  // js guy says: what the heck is that line thing

    // tracks whether all boxes in a category are checked (also if no boxes are checked)
    const [showEquipmentCheckbox, setShowEquipmentCheckbox] = useState(0)
    const [showAmenitiesCheckbox, setShowAmenitiesCheckbox] = useState(0)
    const [showSportsCheckbox, setShowSportsCheckbox] = useState(0)

    const map = useMap()

    const checkSearchRadius = (radius) => {
        const bbox = map.getBounds()
        const searchArea = 3.14 * Math.pow(miles_to_meters(radius), 2)
        const northeast = bbox.getNorthEast()
        const aa = northeast.distanceTo(bbox.getNorthWest())
        const bb = northeast.distanceTo(bbox.getSouthEast())
        const boxArea = aa * bb
        setShowSearchRadius(boxArea > searchArea)
    }

    // event handler for clicking the filter button
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    // event handler to update display of slider distance value
    const updateDistVal = (val) => {
        setDistValue(val)
        checkSearchRadius(val)
    }

    // event handler to update state of checked value lists
    const updateCheckedEquipment = (val) => setCheckedEquipment(val)
    const updateCheckedAmenities = (val) => setCheckedAmenities(val)
    const updateCheckedSports = (val) => setCheckedSports(val)

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
        // 1. which button is it?  apply is a boolean where 'filter' is true
        e.preventDefault()
        setDrawerOpen(false)
        const apply = e.target.outerText.toLowerCase() === 'filter'

        // 2. if we're applying, we poll the current checkbox state, otherwise for clear we use the initial state
        const params = apply ? getQueryParams() : initQueryParams

        if (!apply) {
            setDistValue(4)
        }

        // 3. we use the setter hooks as appropriate, and close the drawer either way
        setQueryParams(params)
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

    const styles = {
            accordionSummary: {
                height: '1em',
                justifyContent: 'center',
                alignContent: 'center',
            }
        }

    const theme = useTheme()
    return (
        <>
            {/* This box contains the Accordion */}
            <Box sx={{width: '18em'}}>

                {/***********************************/}
                {/* DISTANCE SLIDER ACCORDION PANEL */}
                {/***********************************/}

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary style={styles.accordionSummary}
                                      expandIcon={<ExpandMoreIcon/>}
                                      id="panel1bh-header"
                    >
                        {/* PANEL LABEL- UPDATES WITH SLIDER CHANGE */}
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{mr: 1, flexGrow: 1, justifyContent: 'flex-start'}} variant={'h6'}>
                                Distance:
                            </Typography>
                            <Typography sx={{flexShrink: 1, justifyContent: 'flex-start', width: '2rem'}} variant={'h6'}>
                                {` ${distValue}`}
                            </Typography>
                            <Typography sx={{flexShrink: 1, justifyContent: 'flex-end'}} variant={'h6'}>
                                {distValue === 1 ? 'mile' : 'miles'}
                        </Typography>
                        </Box>

                    </AccordionSummary>

                    {/* SLIDER GOES HERE- TAKES IN UPDATE CALLBACK FUNCTION */}
                    <AccordionDetails>
                        <DistanceSlider handleValueUpdate={updateDistVal}
                                        distVal={distValue}
                        />
                    </AccordionDetails>
                </Accordion>

                {/***************************************/}
                {/* EQUIPMENT SELECTION ACCORDION PANEL */}
                {/***************************************/}

                <AccordionTemplate expanded={expanded}
                                   panel={'panel2'}
                                   title={'Equipment'}
                                   showCheckbox={showEquipmentCheckbox}
                                   setChecked={setCheckedEquipment}
                                   fullList={equipList}
                                   setShowCheckbox={setShowEquipmentCheckbox}
                                   updateChecked={updateCheckedEquipment}
                                   checked={checkedEquipment}
                                   handleChange={handleChange}
                />

                {/***************************************/}
                {/* AMENITIES SELECTION ACCORDION PANEL */}
                {/***************************************/}

                <AccordionTemplate expanded={expanded}
                                   panel={'panel3'}
                                   title={'Amenities'}
                                   showCheckbox={showAmenitiesCheckbox}
                                   setChecked={setCheckedAmenities}
                                   fullList={amenitiesList}
                                   setShowCheckbox={setShowAmenitiesCheckbox}
                                   updateChecked={updateCheckedAmenities}
                                   checked={checkedAmenities}
                                   handleChange={handleChange}
                />

                {/***********************************************/}
                {/* SPORTS FACILITIES SELECTION ACCORDION PANEL */}
                {/***********************************************/}

                <AccordionTemplate expanded={expanded}
                                   panel={'panel4'}
                                   title={'Sports'}
                                   showCheckbox={showSportsCheckbox}
                                   setChecked={setCheckedSports}
                                   fullList={sportsList}
                                   setShowCheckbox={setShowSportsCheckbox}
                                   updateChecked={updateCheckedSports}
                                   checked={checkedSports}
                                   handleChange={handleChange}
                />
            </Box>

            {/* APPLY/CLEAR FILTERS BUTTONS */}
            <Box sx={{textAlign: 'center'}}>
                <ButtonGroup sx={{width: '17em', mb: 4, justifyContent: 'center'}}>
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
                            Filter
                        </Typography>
                    </Button>

                    <Button sx={{mt: 5, color: 'info', backgroundColor: 'white'}}
                            key={'clear'}
                            size={'medium'}
                            onClick={e => filtersOnClick(e)}
                    >
                        <Typography sx={{fontWeight: 400}}
                                    color={theme.palette.primary.dark}
                                    align={'center'}
                                    variant={'subtitle1'}
                        >
                            Reset
                        </Typography>
                    </Button>
                </ButtonGroup>
            </Box>
        </>
    )
}