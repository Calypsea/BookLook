import { useContext,useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ViewMode";
import { Link } from "react-router-dom"

import {auth} from '../../config/firebase.js';
import {signInWithEmailAndPassword,AuthError, signOut, onAuthStateChanged} from 'firebase/auth';
export default function Login()
{

  const {mode} = useContext(ThemeContext)
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage]= useState<string>("");
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  
  interface Login {
    email: string;
    password: string;
  }
  const LogIn = async (event: React.FormEvent)=> {
    event.preventDefault();
    try{ 
      await signInWithEmailAndPassword(auth,loginData.email, loginData.password);
      
      navigate("../favourites");
    }
    catch(err:any)
    {
      if ((err as AuthError).code === 'auth/invalid-credential') {
        setErrorMessage(prev => "Wrong email or password!");
        
      }
      else if((err as AuthError).code === 'auth/weak-password')
      {
        setErrorMessage(prev => "The password must be longer than 6 characters!");
      }
      else 
      {
        setErrorMessage(prev => "Something went wrong. Try again later");
        console.error(err);
      }
    }
  }

     
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setLoginData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  
  return (
      <main id={mode}>
      <section className={`header${mode} formSection`}>
          <h2>Log into BookLook</h2>

          <form className='authorKeywordContainer'>
          <label htmlFor="email">Email address</label>
          <input
              onChange={handleChange}
              value={loginData.email}
              className='primaryInput secondaryInput'
              type="text"
              name="email"
              id="email"
              placeholder="Email address"
          />
  
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          value={loginData.password}
          className='primaryInput secondaryInput'
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <p className='errorMessage'>{errorMessage}</p>
          <p className='question'>Don't have an account?</p>
          
          <div className='loginButtons'>
              <button onClick={LogIn}className={`primaryButton button${mode}`}>
                  Log in
              </button>
              <Link to="/register" className={` primaryButton  ${mode} logInButton `}>
                  Sign Up
                  <FontAwesomeIcon
                  icon={faArrowRight}
                  className="primaryButtonArrow"
                  />
              </Link>
          </div>
          </form>
      </section>
      </main>
  );
    
}