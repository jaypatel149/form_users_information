import React, { useState } from "react";
import "./Form.css";
import Table from "../table/Table";
import { toast } from "react-toastify";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [tableData, setTableData] = useState([]);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number is invalid";
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }
    setNameError(errors.name || "");
    setEmailError(errors.email || "");
    setPasswordError(errors.password || "");
    setPhoneNumberError(errors.phoneNumber || "");
    setDateOfBirthError(errors.dateOfBirth || "");
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        console.error(error);
      });
    } else {
      setTableData([...tableData, formData]);
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateOfBirth: "",
      });
      event.target.reset();
    }
  };


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
           {nameError && <span className="error">{nameError}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
           {emailError && <span className="error">{emailError}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <div className="phone-input">
            <select id="country-code">
              <option value="+91">+91(Ind)</option>
              <option value="+1">+1(USA)</option>
              <option value="+44">+44(UK)</option>
            </select>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your mobile number"
              onChange={handleChange}
            />
          </div>
            {phoneNumberError && <span className="error">{phoneNumberError}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Enter your date of birth"
            onChange={handleChange}
          />
          {dateOfBirthError && <span className="error">{dateOfBirthError}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <Table tableData={tableData} />
    </div>
  );
};

export default Form;
