import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useState, useRef, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import ErrorModal from "../components/ErrorModal";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required
        </div>
      );
    }
  };

const validEmail = (value) => {
  if (!isEmail(value)) {
    return ( 
      <div className="alert alert-danger" role="alert">
        This is not a valid Email
      </div>
     );
  }
}

const vUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return ( 
        <div className="alert alert-danger" role="alert">
            your username must be between 3 and 20 chars
        </div> );
    };
};

const vFirstName = (value) => {
    if (value.length < 1 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          your first name must be between 1 and 20 chars
        </div>
      );
    }
  };
  
  const vLastName = (value) => {
    if (value.length < 1 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          your last name must be between 1 and 20 chars
        </div>
      );
    }
  };
  
  const vAddress = (value) => {
    if (value.length < 5 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          your address must be between 5 and 40 chars
        </div>
      );
    }
  };
  
  const vPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          your password must be between 6 and 40 chars
        </div>
      );
    }
  };
  
  const vConfirmpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          your password must be between 6 and 40 chars
        </div>
      );
    } 
  };
 
  

   

const Register = () => {

    const form = useRef();
    const checkBtn = useRef();
    const[isloading, setisLoading] = useState(false)
    const [email, SetEmail] = useState('');
    const [username, SetUsername] = useState('');
    const [firstname, SetFirstname] = useState('');
    const [lastname, SetLastname] = useState('');
    const [password, SetPassword] = useState('');
    const [address, SetAddress] = useState('');
    const [confirmpassword, SetConfirmPassword] = useState('');
    const [showPassword, SetShowPassword] = useState(false)
    const [showConfirmPassword, SetShowConfirmPassword] = useState(false)
    const [error, SetError] = useState("")
    const [modalerror, SetModalError] = useState("")
    const [disabled, Setdisabled] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (confirmpassword !== password) {
            SetError("The passwords do not match.")
            Setdisabled(true)
        } 
        else if (checkBtn.current.context._errors.length !== 0) {
            SetError("")
            Setdisabled(true)
        }
        else {
            SetError("")
            Setdisabled(false)
        }
    }, [username, firstname, lastname, address, email, password, confirmpassword]);

  

    const EmailChangeHandler = (e) => {
        SetEmail(e.target.value);
    };

    const UsernameChangeHandler = (e) => {
        SetUsername(e.target.value);
    };

    const LastNameChangeHandler = (e) => {
        SetLastname(e.target.value);
    };

    const FirstNameChangeHandler = (e) => {
        SetFirstname(e.target.value);
    };

    const AddressChangeHandler = (e) => {
        SetAddress(e.target.value);
    };
    
    const PasswordChangeHandler = (e) => {
        SetPassword(e.target.value);
    };

    const ConfirmPasswordChangeHandler = (e) => {
        SetConfirmPassword(e.target.value);
    };

    const togglePassword = (e) => {
        SetShowPassword((showPassword) => (!showPassword));
    };

    const toggleConfirmPassword = (e) => {
        SetShowConfirmPassword((showConfirmPassword) => (!showConfirmPassword));
    };

    const SubmitHandler = async (e) => {
      e.preventDefault();

      form.current.validateAll();

      setisLoading(true);

      if (checkBtn.current.context._errors.length === 0) {
        try {
          const response = await fetch('http://localhost:5000/api/users/signup', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                firstname: firstname,
                lastname: lastname,
                address: address,
                email: email,
                password: password
              })
            });

            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            console.log(responseData)
            setisLoading(false);
          } catch (err) {
            console.log(err);
            setisLoading(false);
            SetModalError(err.message || 'Something went wrong, please try again.');
          }
        }
      };

    const errorHandler = () => {
      SetModalError(null);
    };
    

    return (
        <>
          <ErrorModal error={modalerror} onClear={errorHandler}/>
          <div className="form-container">
              <h2>Register</h2>
                  <Form onSubmit={SubmitHandler} ref={form}>
                      <div className="mb-3">
                          <label htmlFor="username">Username</label>
                          <Input
                              type="text"
                              className="form-control"
                              name="username"
                              value={username}
                              onChange = {UsernameChangeHandler}
                              validations={[required, vUsername]}
                              placeholder="Enter your username"
                          />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="firstname">First Name</label>
                          <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={firstname}
                          onChange = {FirstNameChangeHandler}
                          validations={[required, vFirstName]}
                          placeholder="Enter your first name"
                          />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="lastname">Last Name</label>
                          <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={lastname}
                          onChange = {LastNameChangeHandler}
                          validations={[required, vLastName]}
                          placeholder="Enter your last name"
                          />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="address">Address</label>
                          <Input
                          type="text"
                          className="form-control"
                          name="address"
                          value={address}
                          onChange = {AddressChangeHandler}
                          validations={[required, vAddress]}
                          placeholder="Enter your address"
                          />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="email">Email</label>
                          <Input
                          type="email"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange = {EmailChangeHandler}
                          validations={[required, validEmail]}
                          placeholder="Enter your email"
                          />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="Password">Password</label>
                          <div className="input-group">
                              <input
                                  type={showPassword ? "text" : "password"}
                                  className="form-control"
                                  name="password"
                                  value={password}
                                  onChange = {PasswordChangeHandler}
                                  validations={[required, vPassword]}
                                  placeholder="Enter your password"
                              />
                              <button
                                  type="button"
                                  className="btn btn-outline-dark btn-sm"
                                  onClick={togglePassword}
                              >
                                  Show Password
                              </button>
                          </div>
                      </div>

                      <div className="mb-3">
                          <label htmlFor="Password">Confirm Password</label>
                          <div className="input-group">
                              <input
                                  type={showConfirmPassword ? "text" : "password"}
                                  className="form-control"
                                  name="password"
                                  value={confirmpassword}
                                  onChange = {ConfirmPasswordChangeHandler}
                                  validations={[required, vConfirmpassword]}
                                  placeholder="Confirm password"
                              />
                              <button
                                  type="button"
                                  className="btn btn-outline-dark btn-sm"
                                  onClick={toggleConfirmPassword}
                              >
                                  Show Password
                              </button>
                          </div>

                          {error && (
                              <div className="mb-3">
                                  <div
                                      className={error ? "alert alert-danger" : ""}
                                      role="alert"
                                  >
                                      {error}
                                  </div>
                              </div>
                          )}
                      </div>

                      
                      <div className="mb-3">
                          <Button variant="dark" type="submit" disabled={disabled}>
                            {isloading && (
                            <span className="spinner-border spinner-border-sm"></span>
                            )}
                            {!isloading && (
                            <span>Create Account</span>
                            )}
                          </Button>
                      </div>
                          
                      <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </Form>
            </div>
          </> 
    );
}
 
export default Register;