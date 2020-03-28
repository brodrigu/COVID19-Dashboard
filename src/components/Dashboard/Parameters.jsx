import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '~ducks/localState/ModelParameters';
import { calculateModelData } from '~ducks/data/model';
import Title from './Title';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    numericInput: {
        textAlign: 'right',
    },
});

export default function Parameters() {
    const classes = useStyles();
    const {
        icuRequirementRate,
        morbidityRate,
        population,
        totalIcuBeds,
        virusDoublingDays,
    } = useSelector(state => state.localState.ModelParameters);

    const modelParams = useSelector(state => state.localState.ModelParameters);

    const dispatch = useDispatch();
    const updateParameters = name => (e) => {
        const payload = {};
        payload[name] = e.target.value;
        dispatch(update(payload));
    };


    return (
        <React.Fragment>
            <Title>Parameters</Title>
            <TextField
                className={classes.numericInput}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="population"
                label="Population"
                name="population"
                autoComplete="population"
                value={population}
                onChange={updateParameters('population')}
            />
            <TextField
                className={classes.numericInput}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="morbidityRate"
                label="Morbidity Rate"
                name="morbidityRate"
                autoComplete="morbidityRate"
                value={morbidityRate}
                onChange={updateParameters('morbidityRate')}
            />
            <TextField
                className={classes.numericInput}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="icuRequirementRate"
                label="ICU Requirement Rate"
                name="icuRequirementRate"
                autoComplete="icuRequirementRate"
                value={icuRequirementRate}
                onChange={updateParameters('icuRequirementRate')}
            />
            <TextField
                className={classes.numericInput}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="totalIcuBeds"
                label="Total ICU Beds"
                name="totalIcuBeds"
                autoComplete="totalIcuBeds"
                value={totalIcuBeds}
                onChange={updateParameters('totalIcuBeds')}
            />
            <TextField
                className={classes.numericInput}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="virusDoublingDays"
                label="Virus Doubling Days"
                name="virusDoublingDays"
                autoComplete="virusDoublingDays"
                value={virusDoublingDays}
                onChange={updateParameters('virusDoublingDays')}
            />
            <div>
                <Link color="primary" href="#foo" onClick={() => dispatch(calculateModelData(modelParams))}>
                    update
                </Link>
            </div>
        </React.Fragment>
    );
}

/*
daysToCalculate: 1000,
    daysUntilIcuEntry: 14,
    daysUntilIcuExit: 21,
    daysUntilMorbidity: 16,
    daysUntilRecovery: 28,
    daysUntilSymptoms: 5,
    initialInfectionCount: 50,
    totalIcuBeds: 84000,
*/
