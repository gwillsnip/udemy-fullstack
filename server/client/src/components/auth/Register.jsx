import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }
  //get the value of whatever the user tapse
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  //lifecylce props
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //this is where users are registered (this is an action)
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <h1 className="display-4 text-center">Register</h1>
                <p className="lead text-center">Create your DevRaum account</p>

                <form noValidate onSubmit={this.onSubmit}>
                  {/** Name form */}
                  <label htmlFor="name">
                    <strong>Name</strong>
                    <span>*</span>
                  </label>
                  <TextFieldGroup
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  {/** Email form */}
                  <label htmlFor="email">
                    <strong>Email</strong>
                    <span aria-hidden="true">*</span>
                  </label>
                  <TextFieldGroup
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="This site uses Gravatar, so if you want a profile image, use a Gravatar email"
                  />

                  {/**Password form */}
                  <label htmlFor="password">
                    <strong>Password</strong>
                    <span>*</span>
                  </label>
                  <TextFieldGroup
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  {/**Password2 form */}
                  <label htmlFor="password2">
                    <strong>Re-confirm Password</strong>
                    <span>*</span>
                  </label>
                  <TextFieldGroup
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  {/**Submit button */}
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//using the redux props in the component
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//here we map state to props and set auth as a prop inside our component
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
