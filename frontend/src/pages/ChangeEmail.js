import Form from "react-validation/build/form";
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return ( 
      <div className="alert alert-danger" role="alert">
        This is not a valid Email
      </div>
     );
  }
}

const validConfirmEmail = (value) => {
    if (!isEmail(value)) {
      return ( 
        <div className="alert alert-danger" role="alert">
          This is not a valid Email
        </div>
       );
    }
  }

const ChangeEmail = () => {
    const form = useRef()
    const checkBtn = useRef()
    const navigate = useNavigate()

    const [email, SetEmail] = useState("")
    const [confirmemail, SetConfirmEmail] = useState("")
    const [error, SetError] = useState("")
    const [isloading, SetIsLoading] = useState(false)
    const [disabled, Setdisabled] = useState(true)

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (confirmemail !== email) {
            SetError("The emails do not match.")
            Setdisabled(true)
        } 
        else if (email.length < 10) {
            SetError("This is not a valid email")
            Setdisabled(true)
        }
        else {
            SetError("")
            Setdisabled(false)
        }
    }, [email, confirmemail]);


    const EmailChangeHandler = (e) => {
        SetEmail(e.target.value);
    }

    const ConfirmEmailChangeHandler = (e) => {
        SetConfirmEmail(e.target.value);
    }



    const SubmitHandler = (e) => {
        e.preventDefault();

        form.current.validateAll();

        SetIsLoading(true)
        if (checkBtn.current.context._errors.length === 0) {
            fetch('http://localhost:5000/api/users/changeemail', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    email: email,
                    returnSecureToken: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                SetIsLoading(false)
                if (res.ok) {
                    alert("Email successfully changed")
                    return res.json();
                } else {
                    return res.json().then((data) => {
                      let errorMessage = 'Email Change failed!';
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
            <h2>Change Email</h2>
            <Form className="mt-5" onSubmit={SubmitHandler} ref={form}>
                <div className="mb-3">
                    <label htmlFor="email">New Email</label>
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={EmailChangeHandler}
                            validations={[required, validEmail]}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Confirm New Email</label>
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={confirmemail}
                            onChange={ConfirmEmailChangeHandler}
                            validations={[required, validConfirmEmail]}
                        />
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
                        <span>Change Email</span>
                        )}
                    </Button>
                </div>
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </div>
    );
}
 

 
export default ChangeEmail;