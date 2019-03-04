import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Login from '../Login'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'


class AppNav extends Component {
  render() {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar className={this.props.classes.nav}>
            <Typography color="inherit" variant="h6" component="h1" className={this.props.classes.grow}>
              Albums
            </Typography>
            <Login/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles({
  grow:{flexGrow:1, textAlign:'left'},//Quien tenga esta clase, va a crecer y va a consumir tanto espacio como le sea posible
  nav:{
    color:'white'
  }
})(AppNav)

//AppBar: Position: Fixed(Para que me siga por todo el app), Static(Para que cuando haga scroll se quede arriba)