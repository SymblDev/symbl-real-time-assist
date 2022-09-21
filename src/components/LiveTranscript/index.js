import {Paper, Typography, Divider} from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";
import {ThemeProvider} from "@material-ui/styles";
import theme from "../../Theme";

export const LiveCaptionText = ({text, speaker}) => {
    return (

            <Typography variant={"body1"} style={{color: 'gray'}}>
                {`${speaker && speaker.name ? `${speaker.name}: ` : ''}${text}`}
            </Typography>


    )
}


const LiveTranscript = ({captions = [], classes}) => {

    return (
        <ThemeProvider theme={theme}>
            <Paper variant={"outlined"} className={classes.paper} style={{
                marginBottom: 15,
                width: '100%'
            }}>

                <Typography variant={"h6"} style={{marginBottom: 15, paddingBottom: 10}}>
                    Live Captioning
                </Typography>
                <Typography>
                    {
                        captions.length > 0 ?
                            (
                                captions.map(caption => (<div><LiveCaptionText text={caption.text}
                                                                         speaker={caption.speaker}/>
                            <Divider style={{
                                marginBottom: '10px'
                            }}/></div>))
                            ) :

                            (<Typography variant={"caption"} style={{color: 'gray'}}>
                                Live captioning will appear here ...
                            </Typography>)
                    }
                </Typography>
            </Paper>
        </ThemeProvider>
    );
};

export default withStyles(styles)(LiveTranscript);
