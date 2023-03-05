import React,{useState,useEffect} from 'react'
import signupcss from './signup.module.css'
import axios from 'axios'
import swal from 'sweetalert2'

const SignUp = (props) => 
{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [formData,setFormData] = useState({})
    const [errData,setErrData] = useState({})
    const errObj = {}
    const formObj = {}

    useEffect(() => 
    {
        if(Object.keys(formData).length >0)
        {   
            axios.post("http://localhost:3050/api/app1/register",formData)
                .then((user) => 
                {
                    console.log(user.data)
                    if(user.data.email==formData.email)
                    {
                        swal.fire({
                            title:"Registration complete",
                            text:"You are now redirected to the login page"
                        })
                        props.history.push("/")
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
        if(e.target.name === "uName")
        {
            // console.log(input)
            setName(input)
        }
        else if(e.target.name === "uEmail")
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
    const handleBack = () => 
    {
        props.history.push("/")
    }
    const validations = () => 
    {
        if(name)
        {
            formObj.name = name
        }
        else
        {
            errObj.name = "name cannot be blank"
        }
        if(email)
        {
            formObj.email = email
        }
        else
        {
            errObj.email = "Email cannot be blank"
        }
        if(password)
        {
            if((password.length >= 8) && (password.length <= 15))
            {
                formObj.password = password
            }
            else
            {
                errObj.password = "Password length should be between 8 and 15."
            }
        }
        else
        {
            errObj.password = "password cannot be blank"
        }
    }
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        validations()
        if(Object.keys(errObj).length == 0)
        {
            setFormData(formObj)
            console.log(formObj)
            setName("")
            setEmail("")
            setPassword("")
            setErrData({})
        }
        else
        {
            setErrData(errObj)
        }

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
               <h4 className={`${signupcss.register}`}>NEW USER REGISTER</h4> 
               <div>
                    <label className={`${signupcss.name}`}>Name</label>
                    <input type="text"  className={`form-control ${signupcss.nameText}`} name='uName' value={name} onChange={handleChange}/>
                    <div className={`${signupcss.nameError}`}>{(Object.keys(errData).length >0) && (errData.name)}</div>
               </div>
               <div>
                    <label className={`${signupcss.email}`}>Email</label>
                    <input type="text" className={`form-control ${signupcss.emailText}`} name='uEmail' value={email} onChange={handleChange} />
                    <div className={`${signupcss.emailError}`}>{(Object.keys(errData).length >0) && (errData.email)}</div>
               </div>
               <div>
                    <label className={`${signupcss.password}`}>Password</label>
                    <input type="password" className={`form-control ${signupcss.passwordText}`} placeholder="password length should be between 8 and 15"
                    name='password' value={password} onChange={handleChange}/>
                    <div className={`${signupcss.pwdError}`}>{(Object.keys(errData).length >0) && (errData.password)}</div>
               </div>
               <div>
                    <input className={`${signupcss.btn} btn btn-primary`} type="submit" value="register"/>
                    <button className={`btn btn-primary ${signupcss.btnBack}`} type="button" onClick={handleBack}>Back</button>
               </div>
              

            </form>
        </div>
    )
}

export default SignUp
