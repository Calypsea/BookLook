import { useContext } from 'react'
import "./Register.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ViewMode";
import { Link } from "react-router-dom"


export default function Login()
{
     const {mode} = useContext(ThemeContext)
   
       
    return (
        <main id={mode}>
        <section className={`header${mode} formSection`}>
            <h2>Log into BookLook</h2>
            <p className='tip'>Use 'testing@mail.com' and '123' for a faster demo!</p>

            <form className='authorKeywordContainer'>
            <label htmlFor="email">Email address</label>
            <input
                className='primaryInput secondaryInput'
                type="text"
                name="email"
                id="email"
                placeholder="Email address"
            />
    
            <label htmlFor="confPassword">Password</label>
            <input
            className='primaryInput secondaryInput'
            type="password"
            name="confPassword"
            id="confPassword"
            placeholder="Password"
          />
            <p className='question'>Don't have an account?</p>
            
            <div className='loginButtons'>
                <button className={`primaryButton button${mode}`}>
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