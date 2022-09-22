import {Button, Card, CardContent, CardMedia, Grid, Paper, Typography} from "@material-ui/core";
import React from "react";
import CallIcon from "@material-ui/icons/Call";
import CallMadeIcon from "@material-ui/icons/CallMade";
import VoicemailIcon from "@material-ui/icons/Voicemail";
import FaceIcon from "@material-ui/icons/Face";
import ErrorIcon from "@material-ui/icons/Error";
import CallEndIcon from "@material-ui/icons/CallEnd";
import HelpIcon from "@material-ui/icons/Help";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import EventIcon from "@material-ui/icons/Event";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CardHeader from "@material-ui/core/CardHeader";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";



const getEventIcon = (type) => {
    if (type === 'calling') {
        return (<CallIcon fontSize={"small"}/>);
    } else if (type === 'call_established') {
        return (<CallMadeIcon fontSize={"small"}/>);
    } else if (type === 'machine_detected') {
        return (<VoicemailIcon fontSize={"small"}/>);
    } else if (type === 'human_detected') {
        return (<FaceIcon fontSize={"small"}/>);
    } else if (type === 'error') {
        return (<ErrorIcon fontSize={"small"}/>);
    } else if (type === 'call_ended') {
        return (<CallEndIcon fontSize={"small"}/>);
    } else if (type === 'question') {
        return (<HelpIcon fontSize={"small"}/>);
    } else if (type === 'action_item') {
        return (<FormatListBulletedIcon fontSize={"small"}/>);
    } else if (type === 'follow_up') {
        return (<EventIcon fontSize={"small"}/>);
    } else if (type === 'interested') {
        return (<EmojiEmotionsIcon fontSize={"small"}/>);
    } else if (type === 'not_interested' || type === 'do_not_call') {
        return (<NotInterestedIcon fontSize={"small"}/>)
    } else {
        return (<NotificationsIcon fontSize={"small"}/>)
    }
}
const handledTrackers = ['Symbl.Greetings',
    'Symbl.Introductions',
    'Symbl.Goodbyes',
    'Symbl.Excitement',
    'Billing Issue',
    'CreditCard Added',
    'Product Experience Issue',
    'Issue Resolved',
    'Offered Refund',
    'Frustration'
];

const getTrackerDescription = (event) => {
    const currentUserName = event.user && event.user.name || 'Customer';
    const oppositeUserName = currentUserName === 'Agent' ? 'Customer' : 'Agent';
    if (event.name === 'Symbl.Greetings') {
        return `${currentUserName} greeted ${oppositeUserName}.`;
    } else if (event.name === 'Symbl.Introductions') {
        return `${currentUserName} introduced.`;
    } else if (event.name === 'Symbl.Goodbyes') {
        return `${currentUserName} said goodbye.`;
    } else if (event.name === 'Symbl.Excitement') {
        return `${currentUserName} is excited.`;
    } else if (event.name === 'Billing Issue') {
        return `${currentUserName} has billing issue.`;
    } else if (event.name === 'CreditCard Added') {
        return `${currentUserName} has added credit card details.`;
    } else if (event.name === 'Product Experience Issue') {
        return `${currentUserName} expressed an issue regarding product experience.`;
    } else if (event.name === 'Issue Resolved') {
        return `${currentUserName} indicated that the issue is resolved.`;
    } else if (event.name === 'Offered Refund') {
        return `${currentUserName} offered refund.`;
    } else if (event.name === 'Frustration') {
        return `${currentUserName} seems frustrated.`;
    }
}

const ActionButton = ({text} = '') => {
    return (
        <Button variant={'outlined'}
                style={{
                    padding: '2px 5px',
                    fontSize: '0.8rem',
                    borderColor: 'mediumblue'
                }}
        >{text}</Button>);
};

const getEventLog = (event) => {
    if (event.type === 'tracker' && handledTrackers.includes(event.name)) {
        return (<Card key={event.id} variant={"outlined"} style={{
            padding: 5,
            marginBottom: 5
        }}>
            <CardContent style={{padding: 3, paddingBottom: 0}}>
                <Grid container direction={"row"} spacing={1}>
                    <Grid item>
                        {getEventIcon(event.type)}
                    </Grid>
                    <Grid item>
                        <Typography style={{fontSize: '0.8em'}}>{event.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            style={{fontSize: '0.5em', color: 'gray', paddingTop: 3}}>{event.timestamp}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent
                style={{padding: 5, paddingTop: 0}}
            >
                <Typography variant={"caption"} gutterBottom>
                    {getTrackerDescription(event)}
                </Typography>
            </CardContent>
            {event.type === 'tracker' && event.name === 'Billing Issue' ? (<CardContent style={{padding: 3, paddingTop: 0}}>
                <ActionButton text={"Show Billing Details"} />
            </CardContent>) : undefined}
            {event.type === 'tracker' && event.name === 'CreditCard Added' ? (<CardContent style={{padding: 3, paddingTop: 0}}>
                <ActionButton text={"Check Credit Card Status"} />
            </CardContent>) : undefined}
            {event.type === 'tracker' && event.name === 'Product Experience Issue' ? (<CardContent style={{padding: 3, paddingTop: 0}}>
                <Typography variant={"h6"} style={{color: 'green'}}>Offer Refund</Typography>
            </CardContent>) : undefined}
            {event.type === 'tracker' && event.name === 'Frustration' ? (<CardContent style={{padding: 3, paddingTop: 0}}>
                <Typography variant={"h6"} style={{color: 'orchid'}}>Show Empathy</Typography>
            </CardContent>) : undefined}
        </Card>);
    } else {

        return (
            <Card key={event.id} variant={"outlined"} style={{
                marginBottom: 5
            }}>
                <CardContent style={{padding: 3, paddingBottom: 0}}>
                    <Grid container direction={"row"} spacing={1}>
                        <Grid item>
                            {getEventIcon(event.type)}
                        </Grid>
                        <Grid item>
                            <Typography style={{fontSize: '0.8em'}}>{event.title}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                style={{fontSize: '0.5em', color: 'gray', paddingTop: 3}}>{event.timestamp}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent style={{padding: 3, paddingTop: 0}}>
                    <Typography variant={"caption"} gutterBottom>
                        {event.description}
                    </Typography>
                </CardContent>
            </Card>);
    }
};


const EventsTimeline = ({events, classes}) => {
    return (
        <Paper variant={"outlined"} className={classes.paper} style={{
            minHeight: '55vh',
            maxHeight: '55vh',
            overflow: 'auto'
        }}>
            <Typography variant={"h6"} style={{marginBottom: 15, paddingBottom: 10}}>
                Events
            </Typography>
            {
                events && events.length > 0 ?
                    events
                        .filter(event => event.type && event.title)
                        .filter((event, index) => {
                            // console.log(event, index)
                            if (index > 0) {
                                if (event.type === 'tracker' && events[index - 1].type === 'tracker' &&
                                    events[index - 1].user.name === event.user.name &&
                                    events[index - 1].name === event.name) {
                                    return false;
                                }
                            }
                            return true;
                        })
                        .map(event => getEventLog(event))  :
                    (<Typography variant={"body1"} style={{color: 'gray'}}>
                        Events will appear here ...
                    </Typography>)
            }
        </Paper>
    );
};

export default withStyles(styles)(EventsTimeline);
