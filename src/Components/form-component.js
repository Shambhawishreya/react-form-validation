import React from "react";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const phoneValidator = /^\+\d{1,4} \d{10}$/; // Updated format: +91 1234567890
const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharValidator = /^\d{12}$/;

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      phoneNo: "",
      country: "",
      city: "",
      panNo: "",
      aadharNo: "",
      errors: {},
      isFormSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleBlur(event) {
    const { name } = event.target;
    this.validateField(name);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formFields = [
      "firstName",
      "lastName",
      "username",
      "emailAddress",
      "password",
      "passwordConfirmation",
      "phoneNo",
      "country",
      "city",
      "panNo",
      "aadharNo"
    ];
    let isValid = true;
    formFields.forEach(field => {
      isValid = this.validateField(field) && isValid;
    });

    if (isValid) {
      this.setState({ isFormSubmitted: true });
    } else {
      this.setState({ isFormSubmitted: false });
    }
  }

  validateField(name) {
    let isValid = false;
    switch (name) {
      case "firstName":
        isValid = this.validateFirstName();
        break;
      case "lastName":
        isValid = this.validateLastName();
        break;
      case "username":
        isValid = this.validateUsername();
        break;
      case "emailAddress":
        isValid = this.validateEmailAddress();
        break;
      case "password":
        isValid = this.validatePassword();
        break;
      case "passwordConfirmation":
        isValid = this.validatePasswordConfirmation();
        break;
      case "phoneNo":
        isValid = this.validatePhoneNo();
        break;
      case "country":
        isValid = this.validateCountry();
        break;
      case "city":
        isValid = this.validateCity();
        break;
      case "panNo":
        isValid = this.validatePanNo();
        break;
      case "aadharNo":
        isValid = this.validateAadharNo();
        break;
      default:
        break;
    }
    return isValid;
  }

  validateFirstName() {
    const value = this.state.firstName;
    let error = "";
    if (value.trim() === "") error = "First Name is required";
    this.setState({ errors: { ...this.state.errors, firstName: error } });
    return error === "";
  }

  validateLastName() {
    const value = this.state.lastName;
    let error = "";
    if (value.trim() === "") error = "Last Name is required";
    this.setState({ errors: { ...this.state.errors, lastName: error } });
    return error === "";
  }

  validateUsername() {
    const value = this.state.username;
    let error = "";
    if (value.trim() === "") error = "Username is required";
    this.setState({ errors: { ...this.state.errors, username: error } });
    return error === "";
  }

  validateEmailAddress() {
    const value = this.state.emailAddress;
    let error = "";
    if (value.trim() === "") error = "Email Address is required";
    else if (!emailValidator.test(value)) error = "Email is not valid";
    this.setState({ errors: { ...this.state.errors, emailAddress: error } });
    return error === "";
  }

  validatePassword() {
    const value = this.state.password;
    let error = "";
    if (value.trim() === "") error = "Password is required";
    else if (!passwordValidator.test(value))
      error =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
    this.setState({ errors: { ...this.state.errors, password: error } });
    return error === "";
  }

  validatePasswordConfirmation() {
    const value = this.state.passwordConfirmation;
    let error = "";
    if (value !== this.state.password) error = "Password does not match Confirmation";
    this.setState({ errors: { ...this.state.errors, passwordConfirmation: error } });
    return error === "";
  }

  validatePhoneNo() {
    const value = this.state.phoneNo;
    let error = "";
    if (value.trim() === "") error = "Phone Number is required";
    else if (!phoneValidator.test(value)) error = "Phone Number is not valid";
    else if (!value.includes(" ")) error = "Please include a space between country code and phone number";
    this.setState({ errors: { ...this.state.errors, phoneNo: error } });
    return error === "";
  }

  validateCountry() {
    const value = this.state.country;
    let error = "";
    if (value.trim() === "") error = "Country is required";
    this.setState({ errors: { ...this.state.errors, country: error } });
    return error === "";
  }

  validateCity() {
    const value = this.state.city;
    let error = "";
    if (value.trim() === "") error = "City is required";
    this.setState({ errors: { ...this.state.errors, city: error } });
    return error === "";
  }

  validatePanNo() {
    const value = this.state.panNo;
    let error = "";
    if (value.trim() === "") error = "PAN Number is required";
    else if (!panValidator.test(value)) error = "PAN Number is not valid";
    this.setState({ errors: { ...this.state.errors, panNo: error } });
    return error === "";
  }

  validateAadharNo() {
    const value = this.state.aadharNo;
    let error = "";
    if (value.trim() === "") error = "Aadhar Number is required";
    else if (!aadharValidator.test(value)) error = "Aadhar Number is not valid";
    this.setState({ errors: { ... this.state.errors, aadharNo: error } });
    return error === "";
  }

  render() {
    const { isFormSubmitted, errors } = this.state;
    return (
      <div className="main">
        <h3><b>SignUp Form</b></h3>
        {isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>Username: {this.state.username}</div>
            <div>Email Address: {this.state.emailAddress}</div>
            <div>Phone Number: {this.state.phoneNo}</div>
            <div>Country: {this.state.country}</div>
            <div>City: {this.state.city}</div>
            <div>PAN No: {this.state.panNo}</div>
            <div>Aadhar No: {this.state.aadharNo}</div>
          </div>
        ) : (
          <div style={{textAlign:"center"}}>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.firstName && <div className="errorMsg">{errors.firstName}</div>}
              
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.lastName && <div className="errorMsg">{errors.lastName}</div>}
              
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.username && <div className="errorMsg">{errors.username}</div>}
              
              <input
                type="email"
                placeholder="Email Address"
                name="emailAddress"
                value={this.state.emailAddress}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.emailAddress && <div className="errorMsg">{errors.emailAddress}</div>}
              
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.password && <div className="errorMsg">{errors.password}</div>}
              
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.passwordConfirmation && <div className="errorMsg">{errors.passwordConfirmation}</div>}
              
              <input
                type="text"
                placeholder="Phone Number (e.g., +91 1234567890)"
                name="phoneNo"
                value={this.state.phoneNo}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.phoneNo && <div className="errorMsg">{errors.phoneNo}</div>}
              
              <select className="dropdown" 
                name="country"
                value={this.state.country}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              >
                <option value="" disabled selected>Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="New York">New York</option>
                {/* Add more countries as needed */}
              </select>

              <br />
              {errors.country && <div className="errorMsg">{errors.country}</div>}
              
              <select className="dropdown"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              >
                <option value="" diabled selected>City</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                {/* Add more cities as needed */}
              </select>

              <br />
              {errors.city && <div className="errorMsg">{errors.city}</div>}
              
              <input
                type="text"
                placeholder="PAN No"
                name="panNo"
                value={this.state.panNo}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.panNo && <div className="errorMsg">{errors.panNo}</div>}
              
              <input
                type="text"
                placeholder="Aadhar No"
                name="aadharNo"
                value={this.state.aadharNo}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <br />
              {errors.aadharNo && <div className="errorMsg">{errors.aadharNo}</div>}
              
              <button type="submit">Signup</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponent;
