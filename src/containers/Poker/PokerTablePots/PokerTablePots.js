import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

class PokerTablePots extends Component {

    render() {
        return (
            	<React.Fragment>
                    {this.renderTablePots(this.props.table.pots, this.props.table.numPots)}
                </React.Fragment>

        )
    }

      renderTablePots(pots, numpots) {
    	  console.log(pots);
    	  if (pots == null || pots.length === 0 || pots[0].pot === 0) {
    		  return;
    	  } else {
    		  return(
    				  <React.Fragment>
    		         <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>Pots</Typography>

   	            	<Grid container spacing={3}>
    	            	{pots.map(this.renderPot)}
                    </Grid>  
                    </React.Fragment>
    		  );
    		  
    	  }
      }
      
      renderPot(pot, index) {
    		if (pot == null || pot.pot === 0) {
    			return;
    		} else {
    			
    		// TODO show players involved in each sidepot
    		   	 return <Grid item xs><Paper>pot{index + 1} -> {pot.pot}</Paper></Grid>

    		}
    	}
}
 
    
// Whatever is returned is going to show up as props inside UserList
function mapStateToProps(state) {
    return {
        table: state.table,
    }
}

// Promote component to container
export default connect(mapStateToProps)(PokerTablePots);



