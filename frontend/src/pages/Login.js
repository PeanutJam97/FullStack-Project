import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { useState, useRef, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AuthContext from "../Store/auth-context";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        );
    }
};

const Login = () => {

    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const[email, SetEmail] = useState('');
    const[password, SetPassword] = useState('')
    const [showPassword, SetShowPassword] = useState(false)
    const [isloading, SetIsLoading] = useState(false)

    const authCtx = useContext(AuthContext);

    const EmailChangeHandler = (e) => {
        SetEmail(e.target.value)
    };

    const PasswordChangeHandler = (e) => {
        SetPassword(e.target.value)
    };
    
    const TogglePassword = (e) => {
        SetShowPassword((showPassword) => (!showPassword))
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();

        form.current.validateAll();

        SetIsLoading(true);

        if (checkBtn.current.context._errors.length === 0) {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                

                const responseData = await response.json();
                console.log(responseData)
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                SetIsLoading(false);
                authCtx.login(responseData.token);
                navigate("/Projects")
            } catch (err) {
                SetIsLoading(false)
                alert(err.message)
            }
        }
    }


    return (
        <div className="form-container">
            <h2>Login</h2>
            <Form onSubmit={SubmitHandler} ref={form}>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <Input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={EmailChangeHandler}
                        placeholder="Enter email"
                        validations={[required]}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Password</label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={PasswordChangeHandler}
                            placeholder="Enter password"
                            validations={[required]}
                        />
                    <button
                        type="button"
                        className="btn btn-dark btn-sm"
                        onClick={TogglePassword}
                        >
                        Show Password
                    </button>
                </div>
                <div className="form-group">
                    <Button type="submit" variant="warning">
                        {isloading && (
                        <span className="spinner-border spinner-border-sm"></span>
                        )}
                        {!isloading && (
                        <span>Login</span>
                        )}
                    </Button>
                </div>
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
                <p style={{textAlign: "center" }}>
                    <a href="/CreateAccount">Click here to create account</a>
                </p>
            </Form>
        </div>
    );
}
 
export default Login;