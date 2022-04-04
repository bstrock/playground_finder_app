import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function EquipmentCheckboxList(props) {
    const checked = props.data
    // this only works with the second anonymous function in there
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // state is updated in parent
        props.updateFunc(newChecked)
    }

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {
                props.fullList.map((item) => {
                    const labelId = `checkbox-list-label-${item}`
                    return (
                        <ListItem key={`${item}-checkbox`} disablePadding>
                            <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
                                <ListItemIcon>
                                    <Checkbox edge="start"
                                              size={'large'}
                                              checked={checked.indexOf(item) !== -1}
                                              tabIndex={-1}
                                              disableRipple
                                              inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={item} primaryTypographyProps={{variant: 'title'}}/>
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </List>
    );
}