import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import {
    LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,
} from 'recharts';
import Title from './Title';

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
                    <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ fill: theme.palette.text.primary, textAnchor: 'middle' }}
                        >
                            Infections
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="currentlyInfected" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
