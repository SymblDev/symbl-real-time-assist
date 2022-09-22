import {
    Badge,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid, InputBase,
    LinearProgress, MenuItem,
    Paper,
    Select,
    Typography
} from "@material-ui/core";
import React, {useEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";
import CardHeader from "@material-ui/core/CardHeader";
import PhoneNumber from "awesome-phonenumber";
import el from "moment/locale/el";

const HIGH_SEVERITY = '#edcbc0';
const MEDIUM_SEVERITY = '#fae2b9';
const LOW_SEVERITY = '#c3e8c3';
const NEUTRAL_SEVERITY = '#bed6fa';
const trackerColors = {
    'Billing Issue': HIGH_SEVERITY,
    'Payment Missing': MEDIUM_SEVERITY,
    'Plan Upgrade': LOW_SEVERITY,
    'Issue Resolved': LOW_SEVERITY
};

const allowedTrackers = ['Billing Issue',
    'Payment Missing',
    'Plan Upgrade',
    'CreditCard Added',
    'Issue Resolved',
    'Offered Refund',
    'Product Experience Issue'
]

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        minWidth: '5vw',
        padding: '2px 5px 2px 3px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Poppins',
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


const getTrackerColor = (tracker) => {
    if (tracker && tracker.name && !!trackerColors[tracker.name]) {
        return trackerColors[tracker.name];
    }
    return NEUTRAL_SEVERITY;
};

const getEntityLabel = (entity = {}) => {
    let type = entity.type;
    if (entity.value && entity.value.value) {
        if (entity.type === 'PHONE_NUMBER') {
            type = 'Phone';
        } else if (entity.type === 'NAME') {
            type = 'Person';
        } else {
            return undefined;
        }
        return (
            <Grid item key={`${type}-${entity.value}`}>
                <Grid container direction={"row"}>
                    <Grid item xs={2}>
                        <Typography variant={'body1'}
                                    style={{marginTop: 3}}>{type}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Chip variant="default"
                              size="small"
                              label={(<Typography variant={"caption"}>{entity.value.value}</Typography>)}
                              style={{
                                  borderRadius: 5,
                                  margin: 2,
                                  backgroundColor: NEUTRAL_SEVERITY,
                                  padding: 0
                              }}
                        />
                    </Grid>
                </Grid>
            </Grid>);
    }
};


const LiveCallSummary = ({entities = [], trackers = [], classes}) => {
    const [reason, setReason] = React.useState('');

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    }
    if (trackers.length > 0 && reason.length <= 0) {
        if (trackers
            .filter(tracker => ['Billing Issue'].includes(tracker.name)).length > 0) {
            setReason('Billing Issue');
        }
    }

    let _trackers = trackers.filter(tracker => allowedTrackers.includes(tracker.name));
    _trackers = _trackers.filter((tracker, index) => _trackers.map(t => t.name).indexOf(tracker.name) === index)

    let _entities = entities.filter(entity => entity && entity.value && entity.value.value);
    _entities = _entities.filter((entity, index) => _entities.map(e => e.value.value).indexOf(entity.value.value) === index)
    return (
        <Grid container direction={"column"} spacing={1} style={{maxHeight: '30vh'}}>
            {
                entities.length > 0 ? (
                    <Grid item>
                        <Card variant={"outlined"}>
                            <CardContent style={{padding: 5}}>
                                <Grid container direction={"column"}>
                                    {
                                        _entities
                                            .filter(entity => entity && entity.value && entity.value.value)
                                            .map(entity => (getEntityLabel(entity)))
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>) : undefined
            }
            {
                <Grid item>
                    <Card variant={"outlined"}>
                        <CardContent style={{padding: 5}}>
                            <Grid container direction={"row"}>
                                <Grid item xs={2}>
                                    <Typography variant={'body1'}
                                                style={{marginTop: 3}}>Reason</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Select
                                        value={reason}
                                        onChange={handleReasonChange}
                                        input={<BootstrapInput/>}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Cancel Service"}>Cancel Service</MenuItem>
                                        <MenuItem value={"Pause Service"}>Pause Service</MenuItem>
                                        <MenuItem value={"Upgrade Plan"}>Upgrade Plan</MenuItem>
                                        <MenuItem value={"Billing Issue"}>Billing Issue</MenuItem>
                                        <MenuItem value={"Payment Issue"}>Payment Issue</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            }
            <Grid item>
                <Card variant={"outlined"}>
                    <CardHeader
                        style={{padding: 7}}
                        subheader={"Highlights"}
                    />
                    <CardContent style={{padding: 5, minHeight: '10vh', maxHeight: '10vh', scrollBehavior: 'auto'}}>
                        {

                            _trackers.map(tracker => (<Chip variant="default"
                                                       size="small"
                                                       key={`${tracker.name}`}
                                                       label={(<Typography
                                                           style={{fontWeight: 400}}> {tracker.title}</Typography>)}
                                                       style={{
                                                           borderRadius: 5,
                                                           margin: 2,
                                                           backgroundColor: getTrackerColor(tracker)
                                                       }}
                                />))
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(LiveCallSummary);

