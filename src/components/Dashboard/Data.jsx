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
                    {model.map(row => (
                        <TableRow key={row.day}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.newlyInfected}</TableCell>
                            <TableCell>{row.icuAdmitted}</TableCell>
                            <TableCell>{row.currentlyInfected}</TableCell>
                            <TableCell align="right">{row.cumulativeDeaths}</TableCell>
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
