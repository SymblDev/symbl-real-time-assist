import {Button, Card, CardContent, CardMedia, Grid, Paper, Typography} from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";




const Summary = ({summary, classes}) => {
    if (summary && summary.length > 0) {
        return (
            <Paper variant={"outlined"} className={classes.paper}>
                <Typography variant={"h6"} style={{marginBottom: 15, paddingBottom: 10}}>
                    Summary
                </Typography>
                {
                    summary.map(s => (
                        <Typography key={s.id}>
                            {s.text}
                        </Typography>
                    ))
                }
            </Paper>
        );
    }
    return (<div/>);
};

export default withStyles(styles)(Summary);
