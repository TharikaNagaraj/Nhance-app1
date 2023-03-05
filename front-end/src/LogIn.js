import React,{useState,useEffect} from 'react'
import logincss from './login.module.css'
import {Link} from "react-router-dom"
import axios from 'axios'
import swal from 'sweetalert2'

const LogIn = (props) => 
{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [formData,setFormData] = useState({})
    const [errData,setErrData] = useState({})
    let errObj = {}
    let formObj = {}

    const {toggle} = props
    // console.log(toggle)

    useEffect(() => 
    {
        if(Object.keys(formData).length > 0)
        {
            axios.post("http://localhost:3050/api/app1/login",formData)
                .then((ele) => 
                {
                    if(ele.data == "Invalid email or password")
                    {
                        swal.fire({
                            title:`${ele.data}`
                        })
                    }
                    else
                    {
                        const token = ele.data.token
                        console.log(token)
                        localStorage.setItem("token",token)
                        toggle()
                        props.history.push("/home")
                        
                    }
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }
    },[formData])
    const handleChange = (e) => 
    {
        const input = e.target.value
        // console.log(input)
        if(e.target.name === "uEmail")
        {
            // console.log(input)
            setEmail(input)
        }
        else
        {
            // console.log(input)
            setPassword(input)
        }
    }
    const validations = () => 
    {
        if(email.length == 0)
        {
            errObj.email = "Email cannot be blank"
        }
        else
        {
            formObj.email = email
        }
        if(password.length ==0)
        {
            errObj.password = "Password cannot be blank"
        }
        else
        {
            formObj.password = password
        }
    }
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        validations()
        if(Object.keys(errObj).length == 0)
        {
            console.log(formObj)
            setFormData(formObj)
            setEmail("")
            setPassword("")
            setErrData({})
        }
        else
        {
            setErrData(errObj)
        }
    }
    const handleCancel = (e) => 
    {
        setFormData({})
        setErrData({})
        setEmail("")
        setPassword("")
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h4 className={`${logincss.login}`}>LOGIN</h4>

                <input type="text" className={`${logincss.email} form-control`} placeholder='Email' name='uEmail' value={email} onChange={handleChange} />
                <div className={`${logincss.emailSpan} `}>{(Object.keys(errData).length >0) && (errData.email)}</div>

                <input type="password" className={`${logincss.pwd} form-control`} placeholder='Password'
                name='uPassword' value={password} onChange={handleChange}/>
                <div  className={`${logincss.pwdSpan} `}>{(Object.keys(errData).length >0) && (errData.password)}</div>

                <input type="submit" className={` btn btn-primary ${logincss.submit}`} />{" "}<button type='button' className={`btn btn-primary ${logincss.cancelStyle}`} onClick={handleCancel}>Cancel</button>

                <div className={`${logincss.signup}`}>new user? <Link to={"/signup"}>signup</Link></div>

                <h5 className={`${logincss.app1}`}>APPLICATION - 1</h5>
            </form>
        </div>
    )
}

export default LogIn