import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import Net from '../../common/Net';
import Token from '../../common/Token';

import Profile from '../profile/Profile';
import HeadToHead from '../head_to_head/HeadToHead';

// https://material.io/guidelines/style
class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            redirect: false,
            drawerOpen: false,
            currentPage: 'profile',
            currentPageCaption: 'Profile',
            pieData: []
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onRequestChangeDrawer = this.onRequestChangeDrawer.bind(this);
        this.openProfilePage = this.openProfilePage.bind(this);
        this.openHeadToHeadPage = this.openHeadToHeadPage.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    onRequestChangeDrawer(open) {
        this.setState({
            drawerOpen: open
        });
    }

    openProfilePage() {
        this.setState({
            currentPage: 'profile',
            currentPageCaption: 'Profile',
            drawerOpen: false
        });
    }

    openHeadToHeadPage() {
        this.setState({
            currentPage: 'headToHead',
            currentPageCaption: 'Head to Head',
            drawerOpen: false
        });
    }

    logOut() {
        Net.revokeToken().then(() => {
            Token.remove();
            this.setState({
                redirect: true
            });
        });
    }

    componentWillMount() {
        if (!Token.exists()) {
            this.setState({
                redirect: true
            });
        }
    }

    componentDidMount() {
        if (this.state.redirect) {
            return;
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/login' />);
        }

        var content = null;
        if (this.state.currentPage === 'profile') {
            content = <Profile />;
        } else if (this.state.currentPage === 'headToHead') {
            content = <HeadToHead />;
        }

        return (
            <div className="home">
              { /* Navigation */ }
              <AppBar onLeftIconButtonTouchTap={ this.toggleDrawer } title={ this.state.currentPageCaption } />
              <Drawer docked={ false } open={ this.state.drawerOpen } onRequestChange={ this.onRequestChangeDrawer }>
                <MenuItem onClick={ this.openProfilePage }>Profile</MenuItem>
                <MenuItem onClick={ this.openHeadToHeadPage }>Head to Head</MenuItem>
                <Divider />
                <MenuItem onClick={ this.logOut }>Log Out</MenuItem>
              </Drawer>
              { /* Content */ }
              { content }
            </div>
            );
    }
}

export default Home;