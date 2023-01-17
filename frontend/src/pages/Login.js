import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { useState, useRef } from "react";

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
    const[email, SetEmail] = useState('');
    const[password, SetPassword] = useState('')
    const [showPassword, SetShowPassword] = useState(false)

    const EmailChangeHandler = (e) => {
        SetEmail(e.target.value)
    };

    const PasswordChangeHandler = (e) => {
        SetPassword(e.target.value)
    };
    
    const TogglePassword = (e) => {
        SetShowPassword((showPassword) => (!showPassword))
    };

    const SubmitHandler = (e) => {
        e.preventDefault();

        form.current.validateAll();


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
                        Login
                    </Button>
                </div>
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
                <p style={{textAlign: "center" }}>
                    <a href="/register">Click here to create account</a>
                </p>
            </Form>
        </div>
    );
}
 
export default Login;