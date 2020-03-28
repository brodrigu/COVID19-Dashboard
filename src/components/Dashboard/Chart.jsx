import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import {
    LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip,
} from 'recharts';
import Title from './Title';


const formatter = new Intl.NumberFormat('en-US', { compactDisplay: 'short', notation: 'compact' });
const detailedFormatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2 });

export default function Chart() {
    const theme = useTheme();
    const model = useSelector(state => state.data.model);

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={model}
                    margin={{
                        bottom: 0,
                        left: 24,
                        right: 16,
                        top: 16,
                    }}
                >
                    <Tooltip
                        formatter={(value, name) => {
                            if (name === 'currentlyInfected') {
                                return [detailedFormatter.format(value), 'Currently Infected'];
                            }
                            return [detailedFormatter.format(value), 'Total Deaths'];
                        }}
                    />
                    <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                    <YAxis
                        yAxisId="infections"
                        stroke={theme.palette.text.secondary}
                        tickFormatter={formatter.format}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{ fill: theme.palette.text.primary, textAnchor: 'middle' }}
                        >
                            Infections
                        </Label>
                    </YAxis>
                    <YAxis
                        yAxisId="deaths"
                        stroke={theme.palette.text.secondary}
                        tickFormatter={formatter.format}
                        orientation="right"
                    >
                        <Label
                            angle={270}
                            position="right"
                            style={{ fill: theme.palette.text.primary, textAnchor: 'middle' }}
                        >
                            Deaths
                        </Label>
                    </YAxis>
                    <Line
                        yAxisId="infections"
                        type="monotone"
                        dataKey="currentlyInfected"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                    <Line
                        yAxisId="deaths"
                        type="monotone"
                        dataKey="cumulativeDeaths"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
