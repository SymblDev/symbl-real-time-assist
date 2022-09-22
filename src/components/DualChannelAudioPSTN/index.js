import React from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {getAnalytics, getMessagesWithSentiment, getSummary, subscribeToConnection} from '../../utils/symbl-utils';
import moment from 'moment';
import EventsTimeline from "../EventsTimeline";
import Transcript from "../Transcript";
import styles from '../../globalStyle';
import {subscribeToUpdates} from "../../utils/twilio-bridge";
import DialedUsers from "../DialedUsers";
import {statsTrackers} from "../../config";
import Summary from "../Summary";
import {uuid} from "uuidv4";
import LiveCallSummary from "../LiveCallSummary";
import SentimentChart from "../SentimentChart";


class DualChannelAudioPSTN extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.initialState = {
            phoneNumberError: false,
            phoneNumberHelperText: '',
            phoneNumber: '',
            name: '',
            nameError: false,
            nameHelperText: '',
            startedTimestamp: undefined,
            // events: [],
            events: [
                //     {
                //     id: '123',
                //     type: 'tracker',
                //     name: 'Billing Issue',
                //     // user: {
                //     //     name:
                //     // },
                //     title: 'Billing Issue',
                //     timestamp: '10:22 pm',
                //     description: 'Call connected to Agent.'
                // }
            ],
            captions: [],
            summary: [
                // {
                //     id: '3993',
                //     text: 'This is summary.'
                // }
            ],
            entities: [
                //     {
                //     type: 'PHONE_NUMBER',
                //     text: '4 08, 5 5 5, 394 4',
                //     value: {
                //         value: '4 08, 5 5 5, 394 4'
                //     }
                // }
            ],
            trackers: [
                //     {
                //     name: 'Billing Issue',
                //     title: 'Billing Issue'
                // }, {
                //     name: 'Payment Missing',
                //     title: 'Payment Missing'
                // }, {
                //     name: 'Plan Upgrade',
                //     title: 'Plan Upgrade'
                // },
                //     {
                //         name: 'Issue Resolved',
                //         title: 'Issue Resolved'
                //     }
            ],
            // messages: [],
            messagesWithSentiment: [],
                // [{"id":"4967068617670656","text":"Hello.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:09:40.199Z","endTime":"2022-09-21T07:09:40.699Z","timeOffset":4.2,"duration":0.5,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.246},"suggested":"neutral"}},{"id":"4776211176226816","text":"Hey, how's it going?","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:09:44.799Z","endTime":"2022-09-21T07:09:45.999Z","timeOffset":8.8,"duration":1.2,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.017},"suggested":"neutral"}},{"id":"4686282312122368","text":"How's it going?","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:11:47.532Z","endTime":"2022-09-21T07:11:48.433Z","timeOffset":131.53,"duration":0.9,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":0.051},"suggested":"neutral"}},{"id":"4807536184655872","text":"Cool.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:11:50.233Z","endTime":"2022-09-21T07:11:50.733Z","timeOffset":134.23,"duration":0.5,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":0.81},"suggested":"positive"}},{"id":"6513622855974912","text":"Looks like we are on the right track.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:11:50.733Z","endTime":"2022-09-21T07:11:53.032Z","timeOffset":134.73,"duration":2.3,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":0.968},"suggested":"positive"}},{"id":"6407901137076224","text":"How may I assist you today?","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:11:53.032Z","endTime":"2022-09-21T07:11:54.433Z","timeOffset":137.03,"duration":1.4,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":0.039},"suggested":"neutral"}},{"id":"6272116509376512","text":"I completely understand your frustration, but unfortunately, I need to make sure that we are following or compliances.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:12:00.133Z","endTime":"2022-09-21T07:12:10.033Z","timeOffset":144.13,"duration":9.9,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.263},"suggested":"neutral"}},{"id":"5937963825889280","text":"Yeah, I have a major billing issue today.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:12:22.033Z","endTime":"2022-09-21T07:12:27.033Z","timeOffset":166.03,"duration":5,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.886},"suggested":"negative"}},{"id":"5554277217468416","text":"I just cannot see my bill, and I am so frustrated that I cannot even open my billing page.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:12:27.933Z","endTime":"2022-09-21T07:12:38.433Z","timeOffset":171.93,"duration":10.5,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-1},"suggested":"negative"}},{"id":"5321537435992064","text":"Yeah, I don't know what can you do, really?","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:12:42.133Z","endTime":"2022-09-21T07:12:44.833Z","timeOffset":186.13,"duration":2.7,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.437},"suggested":"negative"}},{"id":"4925522526601216","text":"But I would like to see should be fixed.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:12:44.833Z","endTime":"2022-09-21T07:12:48.933Z","timeOffset":188.83,"duration":4.1,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.021},"suggested":"neutral"}},{"id":"5229858020392960","text":"Sure.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:12:55.733Z","endTime":"2022-09-21T07:12:56.233Z","timeOffset":199.73,"duration":0.5,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.3},"suggested":"neutral"}},{"id":"5143908544151552","text":"Are you sure you want to cancel your membership?","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:12:56.333Z","endTime":"2022-09-21T07:13:00.333Z","timeOffset":200.33,"duration":4,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.121},"suggested":"neutral"}},{"id":"4953303314595840","text":"Okay.","from":{"id":"6cd92722-8c95-4429-95fb-eb0669318a8c","name":"Agent"},"startTime":"2022-09-21T07:13:08.633Z","endTime":"2022-09-21T07:13:09.233Z","timeOffset":212.63,"duration":0.6,"conversationId":"6739856802185216","phrases":[],"sentiment":{"polarity":{"score":-0.17},"suggested":"neutral"}}],
            messages: [
            //     {
            //     id: '1231',
            //     from: {
            //         name: 'Agent'
            //     },
            //     payload: {
            //         content: "Hey there!"
            //     },
            //     duration: {
            //         startTime: "2022-09-12T08:15:50.549Z"
            //     },
            //     timeOffsetStr: "00:01"
            // }, {
            //     id: '1232',
            //     from: {
            //         name: 'Customer'
            //     },
            //     payload: {
            //         content: "Hi."
            //     },
            //     duration: {
            //         startTime: "2022-09-12T08:17:50.549Z"
            //     },
            //     timeOffsetStr: "00:01"
            // }
            ],
            users: [
                // {
                //     name: 'Agent',
                //     phoneNumber: '+19517725054',
                //     caption: {
                //         text: ''
                //     },
                //     // politeness: 47,
                //     politenessCount: 0,
                //     empathyCount: 0,
                //     wpm: 145,
                //     talkTimePercentage: 45.36
                // }, {
                //     name: 'Customer',
                //     phoneNumber: '+14081555354',
                //     caption: {
                //         text: ''
                //     },
                //     satisfactionCount: 0
                // }
                ],
            scores: {
                answering_machine: [],
                do_not_call: [],
                not_interested: [],
                interested: []
            },
            isVoiceMailDetected: false,
            isHumanDetected: false,
            connection: null,
            connectionId: '',
            conversationId: '',
            isConnectionStarted: false

        };

        this.state = this.initialState;
        this.classes = this.props.classes;

        this.onUpdateFromTwilioBridge = this.onUpdateFromTwilioBridge.bind(this);
        this.onSymblEvents = this.onSymblEvents.bind(this);

        this.getUserByMessageId = this.getUserByMessageId.bind(this);
        this.getUserByPhoneNumber = this.getUserByPhoneNumber.bind(this);
        this.getUserByName = this.getUserByName.bind(this);
    }

    async componentDidMount() {
        await subscribeToUpdates(this.onUpdateFromTwilioBridge);
    }

    async onUpdateFromTwilioBridge(updateEvent) {
        const {type, speaker, connectionId, conversationId} = updateEvent;
        if (type === 'connection_started' || type === 'connection_exists') {
            if (!this.state.isConnectionStarted) {
                this.setState({
                    startedTimestamp: moment(),
                    isConnectionStarted: true,
                    connectionId,
                    conversationId
                });
                await subscribeToConnection(connectionId, this.onSymblEvents)
            }

            this.addEvent({
                type: 'call_established',
                title: 'Call Connected.',
                description: `Connected call with '${speaker.name}'`
            });

            const user = this.buildUserFromMessage({
                user: {
                    ...speaker
                },
            });

            user.politenessCount = 0;
            user.empathyCount = 0;
            user.satisfactionCount = 0;

            let existingUser = this.state.users.filter(user => user.phoneNumber === speaker.userId);
            if (existingUser.length <= 0) {
                this.state.users.push(user)
            } else {
                existingUser[0].status = 'connected';
            }
            this.setState({
                users: [...this.state.users]
            });
        } else if (type === 'connection_stopped') {
            if (this.state.conversationId) {
                const summary = await getSummary(this.state.conversationId);
                this.setState({
                    summary: summary
                });
            }
        }
    }

    resetState(except = []) {
        const newState = {...this.initialState};
        if (except && except.length > 0) {
            except.forEach(key => {
                if (newState.hasOwnProperty(key)) {
                    delete newState[key]
                }
            });
        }
        this.setState(newState);
    }


    compareEvents(event1, event2) {
        return event1.type === event2.type &&
            event1.title === event2.title && event1.description === event2.description;
    }

    addEvent(event) {
        if (this.state.events.length > 0) {
            if (this.state.events.filter(_event => this.compareEvents(_event, event)).length > 0) {
                return;
            }
        }

        event.id = uuid();

        const timestamp = moment().format('hh:mm a');

        const _event = {...event, timestamp};
        this.setState({
            events: [_event, ...this.state.events]
        });
    }

    buildUserFromMessage = (message) => {
        const {user, isFinal, timeOffset, punctuated} = message;
        return {
            id: user.userId,
            name: user.name,
            phoneNumber: user.userId,
            caption: {
                isFinal,
                timeOffset,
                text: punctuated && punctuated.transcript
            }
        };
    }

    getUserByPhoneNumber = (phoneNumber) => {
        const users = this.state.users.filter(user => user.phoneNumber === phoneNumber);

        if (users.length > 0) {
            return users[0];
        }
        return undefined;
    }

    getUserByName = (name) => {
        const users = this.state.users.filter(user => user.name === name);

        if (users.length > 0) {
            return users[0];
        }
        return undefined;
    }

    getUserByMessageId = (messageId) => {
        const messages = this.state.messages.filter(message => message.id === messageId);

        if (messages.length > 0) {
            const phoneNumber = messages[0].from.userId;
            return this.getUserByPhoneNumber(phoneNumber);
        }
        return undefined;
    }

    getUserByCaptionContent = (text = '') => {
        if (text) {
            const users = this.state.users
                .filter(user => user.caption.text.toLowerCase().includes(text.toLowerCase()));
            if (users.length > 0) {
                return users[0];
            }
        }
        return undefined;
    }

    formatPhoneNumber = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

    getTopicsByUser = (topics = [], name) => {
        if (name) {
            const agentMessageIds = this.state.messages.filter(m => m.from.name === name).map(m => m.id);
            // console.log('Topics', this.state.messages.filter(m => m.from.name === name).map(m => m.from.name + ' ' + m.payload.content))
            // console.log('Topics', agentMessageIds);
            // console.log('Topics', topics
            //     .map(topic => topic.messageReferences));
            // console.log('Topics', topics
            //     .filter(topic => topic.messageReferences.filter(ref => agentMessageIds.includes(ref.id)).length > 0));
            const t = topics
                .filter(topic => topic.messageReferences.filter(ref => agentMessageIds.includes(ref.id)).length > 0)
                .map(topic => {
                    const sentiment = topic.sentiment && topic.sentiment.polarity.score;
                    return {
                        text: topic.phrases,
                        refs: topic.messageReferences.map(r => this.state.messages.filter(m => m.id === r.id).map(m => m.from.name + ' ' + m.payload.content)[0]),
                        sentiment
                    }
                });

            console.log('Topics: ', name, t)
            return t;
        }

        return topics;
    }


//// For transcript
    tempMessage = null;

    onSymblEvents = async (data) => {
        const {type} = data;
        // console.log(data);
        if (type === 'message') {
            const {message} = data;
            if (message && message.punctuated &&
                message.punctuated.transcript) {

                const _user = this.buildUserFromMessage(message);
                let existingUser = this.state.users.filter(user => user.phoneNumber === message.user.userId);

                if (existingUser.length <= 0) {
                    this.state.users.push(_user)
                } else {
                    existingUser = existingUser[0];
                    existingUser.id = _user.id;
                    existingUser.name = _user.name;
                    existingUser.caption = _user.caption
                }

                this.setState({
                    users: [...this.state.users]
                });
            }
        } else if (type === 'message_response') {
            const {messages} = this.state;
            let {messages: _messages} = data;
            if (_messages && _messages.length > 0) {
                _messages = _messages.map(m => {
                    return {
                        ...m,
                        timeOffsetStr: moment(m.startTime).format('hh:mm')
                    }
                });
                let incompletePhoneNumberIndex = -1;
                let entities = _messages
                    .filter(m => m.entities && m.entities.length > 0)
                    .map(m => {
                        // m.entities.map(e => )
                        return m.entities;
                    }).reduce((c, p) => c.concat(p), [])
                    .filter(e => e.value && e.value.value);
                console.log('before phone', entities)
                entities = entities.map((e, index) => {
                    console.log(e, e.type, e.value.value)
                    if (e.type === 'PHONE_NUMBER') {
                        const phoneNumber = e.value.value
                            .replaceAll(' ', '')
                            .replaceAll('.', '')
                            .replaceAll('-', '')
                            .replaceAll(',', '');

                        if (phoneNumber.length < 10) {
                            e.value.value = phoneNumber;
                            console.log('Phone number length: ', phoneNumber.length, phoneNumber)
                            incompletePhoneNumberIndex = index;
                        } else {
                            e.value.value = this.formatPhoneNumber(phoneNumber);
                        }
                        return e;
                    } else if (incompletePhoneNumberIndex >= 0 && index - 1 === incompletePhoneNumberIndex) {
                        const number = e.value.value
                            .replaceAll(' ', '')
                            .replaceAll('.', '')
                            .replaceAll('-', '')
                            .replaceAll(',', '');
                        console.log('Phone number continuation: ', number)
                        const _num = parseInt(number)
                        if (!isNaN(_num)) {
                            const _e = entities[incompletePhoneNumberIndex];
                            _e.value.value = this.formatPhoneNumber(_e.value.value + number);
                            _e.text = _e.text + e.text;
                            return undefined;
                        }
                        return e;
                    } else {
                        return e;
                    }
                }).filter(e => !!e);

                console.log('after phone', entities)
                this.setState({
                    messages: [...messages, ..._messages],
                    entities: [...this.state.entities, ...entities]
                });
                // console.log(this.state.messages)
                // console.log(this.state.entities)

            }
            const messagesWithSentiment = await getMessagesWithSentiment(this.state.conversationId);
            this.setState({
                messagesWithSentiment
            });
            const analytics = await getAnalytics(this.state.conversationId);
            if (analytics.members && analytics.members.length > 0) {
                analytics.members.forEach(m => {
                    const user = this.getUserByName(m.name);
                    if (user) {
                        user.wpm = m.pace.wpm;
                        user.talkTimePercentage = m.talkTime.percentage;
                    }
                });
                this.setState({
                    users: this.state.users
                });
            }
        } else if (type === 'tracker_response') {
            const {trackers, isFinal, sequenceNumber} = data;

            if (trackers && trackers.length > 0) {
                // console.log(trackers)
                trackers.forEach(tracker => {
                    const {matches} = tracker;
                    if (!statsTrackers.includes(tracker.name) && isFinal) {
                        const firstMessageRef = tracker.matches[0].messageRefs[0];
                        const user = this.getUserByMessageId(firstMessageRef.id)
                        // const lastEvent = this.state.events.length > 0 ? this.state.events[this.state.events - 1] : undefined;
                        // console.log('lastEvent', lastEvent)
                        // if (lastEvent && lastEvent.name && lastEvent.user) {
                        //     // &&
                        //     // lastEvent.name === tracker.name &&
                        //     // lastEvent.user.name === user.name) {
                        //     console.log(lastEvent.name, tracker.name)
                        //     console.log(lastEvent.user.name, user.name)
                        //     // return;
                        // }
                        const trackerTitle = tracker.name.replace('Symbl.', '').replaceAll('_', ' ');
                        this.addEvent({
                            id: `${tracker.name}-${sequenceNumber}-${firstMessageRef.id}`,
                            type: "tracker",
                            name: tracker.name,
                            title: trackerTitle,
                            description: firstMessageRef.text,
                            user
                        });

                        this.setState({
                            trackers: [...this.state.trackers, {...tracker, title: trackerTitle}]
                        });
                    } else if (statsTrackers.includes(tracker.name)) {
                        matches.forEach(match => {
                            const {messageRefs} = match;
                            const trackerMatchesWithUser = messageRefs.map(ref => {
                                return {
                                    user: this.getUserByCaptionContent(ref.text),
                                    trackerName: tracker.name,
                                    ...ref
                                }
                            }).filter(m => !!m.user);
                            // console.log('Tracker Match', match, trackerMatchesWithUser)
                            if (trackerMatchesWithUser.length > 0) {
                                let agentMatch = trackerMatchesWithUser.filter(m => m.user.name === 'Agent');
                                if (agentMatch.length > 0) {
                                    agentMatch = agentMatch[0];
                                    if (agentMatch.trackerName === 'Symbl.Politeness') {
                                        agentMatch.user.politenessCount = agentMatch.user.politenessCount + 1;
                                    } else if (agentMatch.trackerName === 'Symbl.Empathy') {
                                        agentMatch.user.empathyCount = agentMatch.user.empathyCount + 1;
                                        // console.log('Empathy', agentMatch.user)
                                    }
                                    this.setState({
                                        users: this.state.users
                                    });
                                }
                                let customerMatch = trackerMatchesWithUser.filter(m => m.user.name === 'Customer');
                                if (customerMatch.length > 0) {
                                    customerMatch = customerMatch[0];
                                    if (['Symbl.Dissatisfaction', 'Frustration'].includes(customerMatch.trackerName)) {
                                        customerMatch.user.satisfactionCount = Math.max(customerMatch.user.satisfactionCount - 1, 0);
                                    } else if (customerMatch.trackerName === 'Satisfaction') {
                                        customerMatch.user.satisfactionCount = customerMatch.user.satisfactionCount + 1;
                                    }
                                    this.setState({
                                        users: this.state.users
                                    });
                                }
                            }
                        });
                    }
                });
            }
        } else if (type === 'insight_response') {
            console.log(data);
            const {insights} = data;
            if (insights.length > 0) {
                insights.forEach(insight => {
                    if (insight.type === 'question') {
                        this.addEvent({
                            id: insight.id,
                            type: 'question',
                            title: `Question`,
                            description: `${insight.payload.content}`
                        });
                    } else if (insight.type === 'action_item') {
                        this.addEvent({
                            id: insight.id,
                            type: 'action_item',
                            title: `Action Item`,
                            description: `${insight.payload.content}`
                        });
                    } else if (insight.type === 'follow_up') {
                        this.addEvent({
                            id: insight.id,
                            type: 'follow_up',
                            title: `Follow Up`,
                            description: `${insight.payload.content}`
                        });
                    }
                });
            }
        } else if (type === 'topic_response') {
            const {topics} = data;
            const agent = this.state.users.filter(user => user.name === 'Agent');
            if (agent.length > 0) {
                agent[0].topics = this.getTopicsByUser(topics, 'Agent');
            }
            const customer = this.state.users.filter(user => user.name === 'Customer');
            if (customer.length > 0) {
                customer[0].topics = this.getTopicsByUser(topics, 'Customer');
            }
            this.setState({
                users: this.state.users
            });
        }
    };


    render() {
        return (
            <Grid container direction={'column'} spacing={1}>
                {
                    this.state.summary.length > 0 ? (
                        <Grid item>
                            <Summary summary={this.state.summary}/>
                        </Grid>
                    ) : undefined
                }
                <Grid item>
                    <Grid container direction={"row"} spacing={1}>
                        <Grid item sm={8}>
                            <DialedUsers users={this.state.users}/>
                        </Grid>
                        <Grid item sm={4}>
                            <LiveCallSummary
                                trackers={this.state.trackers}
                                entities={this.state.entities}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/*<Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />*/}
                {/*<Grid container direction={"row"}>*/}
                {/*    <LiveTranscript captions={this.state.captions}/>*/}
                {/*</Grid>*/}

                <Grid item>
                    <Grid
                        container
                        direction="row"
                        // alignItems="flex-start"
                        spacing={1}
                        // style={{
                        //     height: '100%'
                        // }}
                    >
                        <Grid item xs={12} sm={8}>
                            <EventsTimeline events={this.state.events}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container direction={"column"} spacing={1}>
                                <Grid item>
                                    <SentimentChart messages={this.state.messagesWithSentiment}/>
                                </Grid>
                                <Grid item>
                                    <Transcript messages={this.state.messages}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(DualChannelAudioPSTN);
