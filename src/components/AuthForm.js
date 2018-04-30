import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImagaeUrl: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state)
    .then(() => {
      this.props.history.push("/");
    }).catch(() => {
      return;
    })
  };

  render() {
    const { email, username, password, profileImagaeUrl } = this.state;
    const {
      heading,
      buttonText,
      signUp,
      errors,
      removeError,
      history
    } = this.props;

    // If there is any change in the route, the error will be removed
    history.listen(() => {
      removeError()
    })

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password:</label>
              <input
                autoComplete="off"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
              {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    value={profileImagaeUrl}
                    onChange={this.handleOnChange}
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
