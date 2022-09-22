import {
    Badge,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    LinearProgress,
    Paper,
    Typography
} from "@material-ui/core";
import React from "react";
import CallIcon from "@material-ui/icons/Call";
import CallMadeIcon from "@material-ui/icons/CallMade";
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import CardHeader from "@material-ui/core/CardHeader";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import {green, deepOrange, red, amber, lightGreen, blue} from '@material-ui/core/colors';

import Box from "@material-ui/core/Box";
import {LiveCaptionText} from "../LiveTranscript";
import * as PropTypes from "prop-types";


const UserCardHeader = ({user}) => {
    const {type, name, phoneNumber} = user;

    let icon = undefined;
    if (type === 'agent' || name === 'Agent') {
        icon = (<HeadsetMicOutlinedIcon/>);
    } else if (type === 'customer' || name === 'Customer') {
        icon = (<ContactPhoneOutlinedIcon/>);
    }
    const subheader = (<Typography
        style={{color: 'gray'}}
        variant={"caption"}>
        {phoneNumber}
    </Typography>);

    return (
        <CardHeader
            style={{padding: 10, paddingBottom: 0}}
            avatar={icon}
            title={name}
            subheader={subheader}
        />
    );

};

const TrackerProgress = withStyles((theme) => ({
    root: {
        height: 3,
        borderRadius: 3,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 3,
        backgroundColor: '#1a90ff',
    }
}))(LinearProgress);

const UserCard = ({user}) => {
    let {politenessCount, empathyCount, satisfactionCount} = user;
    politenessCount = politenessCount ? politenessCount : 0;
    empathyCount = empathyCount ? empathyCount : 0;
    satisfactionCount = satisfactionCount ? satisfactionCount : 0;
    return (
        <Card key={user.phoneNumber} variant={"outlined"} style={{
            marginBottom: 5
        }}>
            <UserCardHeader user={user}/>
            <CardContent style={{paddingTop: 0}}>

                {user.name === 'Agent' ? (
                    <div><Typography variant={"caption"} style={{fontSize: '0.2em'}}>Politeness</Typography>
                        <TrackerProgress
                            variant={"determinate"}
                            value={Math.min((politenessCount / 20) * 100, 100)}
                        />
                        <Typography variant={"caption"} style={{fontSize: '0.2em'}}>Empathy</Typography>
                        <TrackerProgress
                            variant={"determinate"}
                            value={Math.min((empathyCount / 10) * 100, 100)}
                        />
                    </div>) : (
                    <div><Typography variant={"caption"} style={{fontSize: '0.2em'}}>Satisfaction</Typography>
                        <TrackerProgress
                            variant={"determinate"}
                            value={Math.min((satisfactionCount / 10) * 100, 100)}
                        />
                    </div>)}
            </CardContent>
        </Card>);
};

const LiveCaption = ({text = ''}) => {

    return (<Card variant={"outlined"}
                  style={{
                      padding: 5
                  }}
    >
        <LiveCaptionText text={text}/>
    </Card>);
};

const getSentimentIconAndColorByScore = (score) => {
    let icon = undefined;
    let color = undefined;
    if (score <= -0.5) {
        icon = (<SentimentVeryDissatisfiedIcon/>);
        color = red[200];
    } else if (score > -0.5 && score <= -0.8) {
        icon = (<SentimentDissatisfiedIcon/>);
        color = deepOrange[200];
    } else if (score > -0.8 && score <= 0.2) {
        icon = (<SentimentSatisfiedIcon/>);
        color = amber[200];
    } else if (score > 0.2 && score <= 0.5) {
        icon = (<SentimentSatisfiedAltIcon/>);
        color = lightGreen[200];
    } else if (score > 0.5) {
        icon = (<SentimentSatisfiedIcon/>);
        color = green[200];
    }
    return {icon, color};
}

const LiveTopics = ({topics = []}) => {
    const topicChips = topics.map(topic => {
        const {icon, color} = getSentimentIconAndColorByScore(topic.sentiment)
        return (<Chip variant="default"
                      size="small"
                      label={(<Typography style={{fontWeight: 400}}> {topic.text}</Typography>)}
                      icon={icon}
                      style={{
                          backgroundColor: color
                      }}
        />)
    });
    return (<Box>
        {topicChips}
    </Box>);
};

const getWPMColor = (wpm) => {
    if (wpm >= 190 || wpm < 80) {
        return red[800];
    }  else if (wpm >= 160 || wpm < 110) {
        return amber[800];
    } else if (wpm >= 110 && wpm < 160) {
        return green[800];
    }
}

function UserAnalytics({wpm, talkTimePercentage}) {
    return (
        <Grid container direction={"row"} spacing={1}>
            {
                wpm && (<Grid item xs={2}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Typography variant={"caption"} >Pace (WPM)</Typography>
                        </Grid>
                        <Grid item style={{justifyItems: 'center'}}>
                            <Container><Typography variant={"h5"} style={{color: getWPMColor(wpm)}}>{wpm}</Typography></Container>
                        </Grid>
                    </Grid>
                </Grid>)
            }
            {
                talkTimePercentage && <Grid item xs={2}>
                    <Grid container direction={"column"} spacing={1}>
                        <Grid item>
                            <Typography variant={"caption"}>Talk Time (%)</Typography>
                        </Grid>
                        <Grid item style={{justifyItems: 'center'}}>
                            <TrackerProgress
                                variant={"determinate"}
                                value={talkTimePercentage}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}

const UserWithLiveCaptions = ({user}) => {
    const {caption, topics, wpm, talkTimePercentage} = user;
    const text = caption ? caption.text : '';
    return (
        <Grid item key={user.phoneNumber}>
            <Grid container direction={"row"} spacing={1}>
                <Grid item sm={2}>
                    <UserCard user={user}/>
                </Grid>
                <Grid item sm={10}>
                    <LiveTopics topics={topics}/>
                    <LiveCaption text={text}/>
                    <UserAnalytics wpm={wpm} talkTimePercentage={talkTimePercentage}/>
                </Grid>
            </Grid>

        </Grid>
    );
}

const DialedUsers = ({users, classes}) => (
    <Container style={{padding: 0}}>
        {
            users && users.length > 0 ?
                users.map(user => (
                    <Grid key={user.phoneNumber} container direction={"column"}>
                        <UserWithLiveCaptions user={user}/>
                    </Grid>)) :
                (<Typography variant={"body1"} style={{color: 'gray'}}>
                    No users here ...
                </Typography>)
        }
    </Container>
);

export default withStyles(styles)(DialedUsers);

