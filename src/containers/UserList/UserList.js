import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import CheckCircle from 'material-ui-icons/CheckCircle';
import { connect } from 'react-redux';

class UserList extends Component {

    render() {
        if (!this.props.table.players || this.props.table.players.length < 1) {
            return '';
        }

        return (<div style={{ textAlign: 'left' }}>
            <Drawer width={200} docked={true}>
                <AppBar title="Players" showMenuIconButton={false} />
                {this.renderPlayerList()}
            </Drawer>
        </div>
        );
    }

    renderPlayerList() {
           	
  
        return this.props.table.players.map(player => player == null ? 
            <MenuItem key='empty' leftIcon={<CheckCircle color={"#2BB673"} />}>Empty Seat</MenuItem>
        		:
            <MenuItem key={player.name} leftIcon={<CheckCircle color={"#2BB673"} />}> {player.name} {player.chips} </MenuItem>
        );
    }
}

function mapStateToProps(state) {
    return {
        table: state.table
    }
}

export default connect(mapStateToProps)(UserList);