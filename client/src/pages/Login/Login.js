import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Toaster, Intent } from '@blueprintjs/core'
import { app, facebookProvider, googleProvider } from '../../base'
import API from "../../utils/API";
import "./Login.css";


const loginStyles = {
  width: "100%",
  maxWidth: "400px",
  margin: "20px auto",
  border: "4px solid #ddd",
  borderRadius: "5px",
  padding: "30px"
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithFacebook = this.authWithFacebook.bind(this)
    this.authWithGoogle = this.authWithGoogle.bind(this)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }

  saveToDatabase(user){
    API.saveUser({
      uid: user.user.uid,
      name: user.user.displayName,
      email: user.user.email,
      image: user.user.photoURL
    })
    .then(res => console.log(res))
    .catch(err => {
      if(err.response.status === 422) {
      } else {
        console.log(err.response)
      }
    });
  }

  saveToDatabaseLocal(user){
    API.saveUser({
      uid: user.uid,
      email: user.email,
    })
    .then(res => console.log(res))
    .catch(err => {
      if(err.response.status === 422) {
      } else {
        console.log(err.response)
      }
    });
  }


  authWithFacebook() {
    app.auth().signInWithPopup(facebookProvider)
      .then((user, error) => {
        if (error) {
          this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
        } else {
          this.props.setCurrentUser(user)
          this.setState({ redirect: true })
          {this.saveToDatabase(user)}
        }
      })
  }

  authWithGoogle() {
    app.auth().signInWithPopup(googleProvider)
      .then((user, error) => {
        if (error) {
          this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" })
        } else {
          this.props.setCurrentUser(user)
          this.setState({ redirect: true })
          {this.saveToDatabase(user)}
        }
      })
  }

  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          this.loginForm.reset()
          this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.props.setCurrentUser(user)
          this.setState({redirect: true})
          this.saveToDatabaseLocal(user)
        }
      })
      .catch((error) => {
        console.log(error)
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    console.log(this.props.user);
    if (this.state.redirect === true) {
      return <Redirect to="/rate" />
    }

    return (
      <div style={loginStyles}>
        <Toaster ref={(element) => { this.toaster = element }} />

        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
          <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
            <h5 className="login-header">Welcome to maXval!</h5>
            <p className="login-text">Create an account</p>
          </div>
          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} ></input>
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} ></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="signup-btn pt-button pt-intent-primary" value="Sign Up"></input>
        </form>

        <h6>OR</h6>
        {/* <hr style={{marginTop: "20px", marginBottom: "20px"}}/> */}
        <button style={{width: "100%"}} className="fb-btn pt-button pt-intent-primary" onClick={() => { this.authWithFacebook() }}>Log in with Facebook</button>
        <button style={{width: "100%"}} className="google-btn pt-button pt-intent-primary" onClick={() => { this.authWithGoogle() }}>Log in with Google</button> 

      </div>


    )
  }
}
export default Login