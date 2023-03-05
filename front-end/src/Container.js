import React, { useState } from 'react'
import Signup from './SignUp'
import LogIn from "./LogIn"
import Home from './Home'
import {Link,Route} from 'react-router-dom'

const Container = (props) => 
{
    const [loginToggle,setLoginToggle] = useState((localStorage.getItem("token")) ? (true) :(false))

    const toggle = () => 
    {
        setLoginToggle(!loginToggle)
    }
    
    return(
        <div>
            {(loginToggle) ? 
            (<Route path={"/home"} render={(props) => 
            {
                return(
                    <Home
                    {...props}
                    toggle={toggle}
                    />
                )
            }}/>)
            :
            (<div>
            <Route path={"/"} render={(props) => {
                return(
                    <LogIn
                    {...props}
                    toggle={toggle}
                    />
                )
            }} exact={true}/>
            <Route path={"/signup"} component={Signup}/>
            </div>)
            }
        </div>
    )
}
export default Container