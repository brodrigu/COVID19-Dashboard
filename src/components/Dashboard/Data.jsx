import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const formatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2 });

export default function Orders() {
    const classes = useStyles();
    const model = useSelector(state => state.data.model);
    return (
        <React.Fragment>
            <Title>Recent Data</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>newlyInfected</TableCell>
                        <TableCell>icuAdmitted</TableCell>
                        <TableCell>currentlyInfected</TableCell>
                        <TableCell align="right">cumulativeDeaths</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {model.slice(0).reverse().map(row => (
                        <TableRow key={row.day}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell align="right">{formatter.format(row.newlyInfected)}</TableCell>
                            <TableCell align="right">{formatter.format(row.icuAdmitted)}</TableCell>
                            <TableCell align="right">{formatter.format(row.currentlyInfected)}</TableCell>
                            <TableCell align="right">{formatter.format(row.cumulativeDeaths)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#foo" onClick={preventDefault}>
                    See more data
                </Link>
            </div>
        </React.Fragment>
    );
}
