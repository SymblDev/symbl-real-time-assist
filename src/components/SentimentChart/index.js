import React, {useEffect, useRef, useState} from "react";
import {Container, Paper, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: false,
        },
    },
    interaction: {
        intersect: false,
        mode: 'index'
    },
    scales: {
        x: {
            display: true,
            grid: {
                display: false
            }
        },
        y: {
            display: false,
            suggestedMin: -1,
            suggestedMax: 1,
            grid: {
                display: false
            }
        },
    }
};


const neutral = (ctx, value) => ctx.p0.parsed.y > -0.2 && ctx.p1.parsed.y <= 0.2 ? value : undefined;
const positive = (ctx, value) => ctx.p0.parsed.y > 0.2 && ctx.p1.parsed.y <= 1 ? value : undefined;
const negative = (ctx, value) => ctx.p0.parsed.y >= -1 && ctx.p1.parsed.y < -0.2 ? value : undefined;
const lightNegative = (ctx, value) => ctx.p1.parsed.y <= 0.2 ? value : undefined;
const lightPositive = (ctx, value) => ctx.p1.parsed.y > 0.2 ? value : undefined;

const buildChartData = (sentiments = []) => {
    return {
        labels: sentiments.map(s => s.timestamp),
        datasets: [
            {
                label: 'Sentiment',
                data: sentiments.map(s => s.sentiment),
                borderColor: 'rgb(40,201,9)',
                backgroundColor: 'rgba(104,255,99,0.5)',
                borderWidth: 2,
                segment: {
                  borderColor: ctx =>
                      positive(ctx, 'rgb(2,217,54)') ||
                      negative(ctx, 'rgb(239,55,55)') ||
                      neutral(ctx, 'rgb(246,219,85)') ||
                      lightNegative(ctx, 'rgb(229,151,67)') ||
                      lightPositive(ctx, 'rgb(207,219,60)') || console.log(ctx.p0.parsed.y, ctx.p1.parsed.y)
                },
                tension: 0.4,
                pointRadius: 0,
                spanGaps: true
            }
        ]
    };
};

const SentimentChart = ({messages = [], classes}) => {
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            console.log(chart)
        }
    }, []);


    const sentiments = messages
        .filter(m => m.sentiment && m.sentiment.polarity && m.sentiment.polarity.score)
        .map(m => {
            return {
                sentiment: m.sentiment.polarity.score,
                timestamp: (m.timeOffset - (m.timeOffset %= 60)) / 60 + (9 < m.timeOffset ? ':' : ':0') + Math.ceil(m.timeOffset)
            }
        });
    const data = buildChartData(sentiments);
    return (
        <Paper variant={"outlined"} className={classes.paper}>
            <Typography variant={"h6"} style={{marginBottom: 2, paddingBottom: 5}}>
                Sentiment
            </Typography>
            <Container style={{padding: 0}}>
                <Line options={options}
                      data={data}
                      type={"line"}
                      ref={chartRef}
                />
            </Container>
            {/*// /!*<canvas id={'sentimentChart'} width={"500"} height={"200"} ref={chartRef}/>*!/*/}
        </Paper>
    );
}

export default withStyles(styles)(SentimentChart);
