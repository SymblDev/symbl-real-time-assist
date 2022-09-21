import {Paper, Typography, Avatar, Box, Grid} from "@material-ui/core";
import React, {useRef} from "react";
import {useEffect, useState} from 'react';
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";
import {ThemeProvider} from "@material-ui/styles";
import theme from "../../Theme";

const Transcript = ({messages, classes}) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        // scroll to bottom every time messages change
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return (
        <ThemeProvider theme={theme}>
            <Paper variant={"outlined"} className={classes.paper} style={{
                minHeight: '40vh',
                maxHeight: '50vh',
                overflow: 'auto'
            }}>
                <Typography variant={"h6"} style={{marginBottom: 15, paddingBottom: 10}}>
                    Transcript
                </Typography>
                <Grid container>
                    {

                        messages && messages.length > 0 ?
                            (messages.map((message, index) => (
                                    <Grid container direction={"column"} key={message.id} >
                                        <Grid container direction={"row"} style={{marginBottom: 2}}>
                                            <Grid item xs={1}>
                                                <Avatar style={{
                                                    backgroundColor: message.from.name === 'Agent' ? 'mediumpurple' : 'mediumorchid',
                                                    borderRadius: 5,
                                                    width: theme.spacing(3),
                                                    height: theme.spacing(3)
                                                }}

                                                        key={message.id}>{`${message.from.name.charAt(0)}`}</Avatar>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography variant={"body1"}>
                                                    {message.payload.content}
                                                </Typography>
                                            </Grid>
                                            {/*<Grid item>*/}
                                            {/*    <Typography variant={"body1"} style={{marginTop: 2}}>*/}
                                            {/*        {message.from.name}*/}
                                            {/*    </Typography>*/}
                                            {/*</Grid>*/}
                                            <Grid item xs={1} style={{paddingLeft: 0}}>
                                                <Typography variant={"caption"} style={{color: 'gray'}}>
                                                    {message.timeOffsetStr}
                                                </Typography>
                                            </Grid>
                                            {index >= messages.length - 1 ? (<div ref={bottomRef}/>) : undefined}
                                        </Grid>

                                        {/*<Grid container direction={"row"}>*/}

                                        {/*    /!*<Grid item>*!/*/}
                                        {/*    /!*    <Typography variant={"body1"}>*!/*/}
                                        {/*    /!*        {message.payload.content}*!/*/}
                                        {/*    /!*    </Typography>*!/*/}
                                        {/*    /!*</Grid>*!/*/}
                                        {/*</Grid>*/}

                                    </Grid>

                                ))
                            ) :
                            (<Typography variant={"body1"} style={{color: 'gray'}}>
                                Transcript will appear here ...
                            </Typography>)
                    }


                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default withStyles(styles)(Transcript);
