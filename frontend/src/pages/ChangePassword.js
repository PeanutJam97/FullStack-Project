import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button } from "react-bootstrap";
import AuthContext from "../Store/auth-context";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required
        </div>
      );
    }
  };


const ChangePassword = () => {

    const form = useRef()
    const checkBtn = useRef()
    const navigate = useNavigate()

    const [password, SetPassword] = useState("")
    const [confirmpassword, SetConfirmPassword] = useState("")
    const [email, SetEmail] = useState("")
    const [error, SetError] = useState("")
    const [showPassword, SetShowPassword] = useState(false)
    const [showConfirmPassword, SetShowConfirmPassword] = useState(false)
    const [isloading, SetIsLoading] = useState(false)
    const [disabled, Setdisabled] = useState(true)

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if ((confirmpassword !== password) || (password.length < 8)) {
            SetError("The passwords do not match.")
            Setdisabled(true)
        } 
        else if ((checkBtn.current.context._errors.length !== 0) || email.length === 0) {
            SetError("")
            Setdisabled(true)
        }
        else {
            SetError("")
            Setdisabled(false)
        }
    }, [email, password, confirmpassword]);


    const PasswordChangeHandler = (e) => {
        SetPassword(e.target.value);
    }

    const ConfirmPasswordChangeHandler = (e) => {
        SetConfirmPassword(e.target.value);
    }

    const EmailChangeHandler = (e) => {
        SetEmail(e.target.value);
    }

    const togglePassword = (e) => {
        SetShowPassword((showPassword) => (!showPassword));
    };

    const toggleConfirmPassword = (e) => {
        SetShowConfirmPassword((showConfirmPassword) => (!showConfirmPassword));
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

    const validEmail = (value) => {
        if (!isEmail(value)) {
          return ( 
            <div className="alert alert-danger" role="alert">
              This is not a valid Email
            </div>
           );
        }
    }
     


    const SubmitHandler = (e) => {
        e.preventDefault();

        form.current.validateAll();

        SetIsLoading(true)
        if (checkBtn.current.context._errors.length === 0) {
            fetch('http://localhost:5000/api/users/changepassword', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                SetIsLoading(false)
                if (res.ok) {
                    alert("Password successfully changed")
                    return res.json();
                } else {
                    return res.json().then((data) => {
                      let errorMessage = 'Password Change failed!';
                      // if (data && data.error && data.error.message) {
                      //     errorMessage = data.error.message;
                      // }
                      throw new Error(errorMessage);
                    });
                }    
            }).then(data => {
                authCtx.logout()
                navigate("/login");
            })
              .catch((err) => {
                alert(err.message);
            });
        };
    }

    return ( 
        <div className="form-container">
            <h2>Change Password</h2>
            <Form className="mt-5" onSubmit={SubmitHandler} ref={form}>
                <div className="mb-3">
                    <label htmlFor="password">Re-enter your email</label>
                    <div className="input-group">
                        <input
                            type={email}
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={EmailChangeHandler}
                            validations={[required, validEmail]}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">New Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={PasswordChangeHandler}
                            validations={[required, vPassword]}
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
                    <label htmlFor="password">Confirm New Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={confirmpassword}
                            onChange={ConfirmPasswordChangeHandler}
                            validations={[required, vConfirmpassword]}
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
                    <Button variant="warning" type="submit" disabled={disabled}>
                        {isloading && (
                        <span className="spinner-border spinner-border-sm"></span>
                        )}
                        {!isloading && (
                        <span>Change Password</span>
                        )}
                    </Button>
                </div>
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </div>
    );
}
 
export default ChangePassword;