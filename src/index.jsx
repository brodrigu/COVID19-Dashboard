import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from '~app/store';

import { calculateModelData } from '~ducks/data/model';

import Dashboard from '~components/Dashboard/Home';
import themeJson from './theme.json';

const theme = createMuiTheme(themeJson);

render((
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <Switch>
                    <Route
                        path="/"
                        render={() => {
                            store.dispatch(calculateModelData());
                            return (
                                <Dashboard />
                            );
                        }}
                    />
                </Switch>
            </HashRouter>
        </MuiThemeProvider>
    </Provider>
), document.getElementById('root'));
