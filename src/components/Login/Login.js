import React, { useContext, useRef,useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const[enteredCollege,setEnteredCollege]=useState('');
  // const[collegeIsValid,setCollegeIsValid]=useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);
  
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  useEffect(() => {
    console.log("Effect Running");

    return () => {
      console.log("Effect CleanUp");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(emailIsValid && passwordIsValid);
     
    }, 500);
    return () => {
      console.log("CleanUp");
      clearTimeout(identifier);
    };
  }, [emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid&& enteredCollege.trim().length>4

    //       );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASSWORD", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && enteredCollege.trim().length>4
    // );
  };

  // const enterCollegeHandler=(event)=>{
  //   setEnteredCollege(event.target.value);

  //   setFormIsValid(
  //    event.target.value.trim().length>4 && emailState.isValid && passwordState.isValid
  //   );
  // }

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASS_BLUR" });
  };

  // const validateCollegeHandler=()=>{
  //   setCollegeIsValid(enteredCollege.trim().length>4);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
emailInputRef.current.focus();
    }else{
passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
          type="email"
          id="email"
          value={emailState.value}
          label="E-Mail"
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
        ref={passwordInputRef}
          type="password"
          id="password"
          value={passwordState.value}
          label="Password"
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        {/* <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
        <label htmlFor="college">College</label>
        <input type="text"
        value={enteredCollege}
        onChange={enterCollegeHandler}
        onBlur={validateCollegeHandler}  
        />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
