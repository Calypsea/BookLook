import { useContext } from 'react'
import "./Register.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ViewMode";
import {Link} from 'react-router-dom'

export default function Register() {
    const {mode} = useContext(ThemeContext)
  return (
    <main id={mode}>
      <section className={`header${mode} formSection`}>
        <h2>Create a BookLook account</h2>
        <form className='authorKeywordContainer'>
          <label htmlFor="email">Email address</label>
          <input
            className='primaryInput secondaryInput'
            type="text"
            name="email"
            id="email"
            placeholder="Email address"
          />

          <label htmlFor="password">Password</label>
          <input
            className='primaryInput secondaryInput'
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="confPassword">Confirm Password</label>
          <input
            className='primaryInput secondaryInput'
            type="password"
            name="confPassword"
            id="confPassword"
            placeholder="Password"
          />
          <p className='question'>Already have an account?</p>
          <div className='loginButtons'>
            <button className={`primaryButton button${mode}`}>
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
