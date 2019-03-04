import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import firebase from './initializers/firebase';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp'

class Login extends Component {
  constructor(props){
    super(props);//Linea necesaria en todos los constructores de una clase componente de react. Lo que hace es enviar los props hacia el padre
    //Bindeo el metodo login al componente
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    this.state= {
      userLoggedIn: false,
      photoURL: ''
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{//me permite enviar una funcion que se ejecutara cada vez que el estado de la autentificacion cambien.
      if(user){
        //si usuario es diferente de nulo, existe un inicio de sesion
        this.setState({
          userLoggedIn: true,
          photoURL: user.providerData[0].photoURL
        })
      }else{
        this.setState({
          userLoggedIn: false,
          photoURL: ''
        })
        //no hay inicio sesion
      }
    })
  }

  login(){
    //el provider es una instancia de la clase del sistema de inicio de sesion que quiero usar.
    let provider = new firebase.auth.GoogleAuthProvider();
    //Acto seguido se le agregan los scopes al provider(Permisos que necesito de la cuenta de google.)
    provider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');
    //esta funcion retorna una promesa que se resuelve cuando el usuario logra iniciar sesion con el proveedor indicado.
    //Aparte del Popup, tambien existe el redireccionamiento, el cual se emplea cuando se hacen aplicaciones hibridas, como con ionic. Pero en caso de hacer aplicativos meramente web(pc) es recomendable el popup.
    firebase.auth().signInWithPopup(provider).then(result=>{
      //access tokens: Es el key con el cual google identifica que una persona ya dio permisos para acceder a sus archivos/fotos/loquesea y asi mismo reconocer de quien se trata.
      let token = result.credential.accessToken; //firebase solo da el token luego de que el usuario inicia sesion, pero jamas lo almacena. Es lo unico que no maneja Firebase.
    }).catch(err=>{//aqui puedo manejar si la persona no otorga los permisos
      console.log(err)
    })
  }

  logout(){
    firebase.auth().signOut().then(console.log)
  }

  logginButton() {
    if (this.state.userLoggedIn) return (
      //mandarlo como arreglo me evita divs innecesarios (wrapper hell)
      [<Avatar src={this.state.photoURL}/>,(<IconButton color="inherit" onClick={this.logout}><ExitToApp/></IconButton>)]
    );
    return (<Button variant="contained" onClick={this.login}>
              Login
            </Button>)
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        {this.logginButton()}
      </div>
    );
  }
}

export default withStyles({
  container:{
    display:'flex',
    flexDirection:'row'
  }
})(Login)