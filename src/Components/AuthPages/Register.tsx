import { useContext, useState } from 'react'
import "./Register.css"
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ViewMode";
import {Link} from 'react-router-dom'

import {auth} from '../../config/firebase.js';
import {AuthError, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';


export default function Register() {
    const navigate = useNavigate();
    const {mode} = useContext(ThemeContext)
    const [loginData, setLoginData] = useState<Login>({
      email: "",
      password: "",
      confPassword: ""
    });

    interface Login {
      email: string;
      password: string;
      confPassword: string;
    }
    const [errorMessage, setErrorMessage] = useState<string>('');    

    const signIn = async (event: React.FormEvent)=> {
      
      event.preventDefault();
      try
      { 
        if(loginData.password === loginData.confPassword)
        {
          await createUserWithEmailAndPassword(auth,loginData.email, loginData.password);
          navigate('../login');
        }
        else 
        {
          setErrorMessage(prev => "the passwords do not match!");

        }
        
        // await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      }catch(err:any)
      {
        if ((err as AuthError).code === 'auth/email-already-in-use') {
          setErrorMessage(prev => "The email already exists!");
          
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
    // console.log(loginData)
  return (
    <main id={mode}>
      <section className={`header${mode} formSection`}>
        <h2>Create a BookLook account</h2>
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
          <label htmlFor="confPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            value={loginData.confPassword}
            className='primaryInput secondaryInput'
            type="password"
            name="confPassword"
            id="confPassword"
            placeholder="Password"
          />
          <p className='errorMessage'>{errorMessage}</p>
          <p className='question'>Already have an account?</p>
          <div className='loginButtons'>
            <button onClick={signIn} className={`primaryButton button${mode}`}>
                Sign Up
            </button>
            
            <Link to="/login" className={`primaryButton  ${mode} logInButton`}>
                Log in
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
