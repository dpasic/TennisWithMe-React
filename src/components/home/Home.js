import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import List from 'material-ui/svg-icons/action/list';
import Input from 'material-ui/svg-icons/action/input';

import Net from '../../common/Net';
import Token from '../../common/Token';

import Profile from '../profile/Profile';
import HeadToHead from '../head_to_head/HeadToHead';
import Leaderboards from '../leaderboards/Leaderboards';

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
        this.openLeaderboards = this.openLeaderboards.bind(this);
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

    openLeaderboards() {
        this.setState({
            currentPage: 'leaderboards',
            currentPageCaption: 'Leaderboards',
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
        } else if (this.state.currentPage === 'leaderboards') {
            content = <Leaderboards />;
        }

        return (
            <div className="home">
              { /* Navigation */ }
              <AppBar onLeftIconButtonTouchTap={ this.toggleDrawer } title={ this.state.currentPageCaption } />
              <Drawer docked={ false } open={ this.state.drawerOpen } onRequestChange={ this.onRequestChangeDrawer }>
                <MenuItem leftIcon={ <AccountBox /> } primaryText="Profile" onClick={ this.openProfilePage } />
                <MenuItem leftIcon={ <CompareArrows /> } primaryText="Head to Head" onClick={ this.openHeadToHeadPage } />
                <MenuItem leftIcon={ <List /> } primaryText="Leaderboards" onClick={ this.openLeaderboards } />
                <Divider />
                <MenuItem leftIcon={ <Input /> } primaryText="Log Out" onClick={ this.logOut } />
              </Drawer>
              { /* Content */ }
              { content }
            </div>
            );
    }
}

export default Home;