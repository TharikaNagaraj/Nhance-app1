import React, { useState,useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import './home.css'
import UserInfo from './UserInfo';
import axios from 'axios';
import ShowInfo from './ShowInfo';
import validator from 'validator';
import swal from 'sweetalert2'
import ShowSearch from "./ShowSearch"

const Home = (props) => 
{
    const [addInfoToggle,setAddInfoToggle] = useState(false)
    const {toggle} = props
    const [userData,setUserData] = useState({})
    const [showToggle,setShowToggle] = useState(false)
    const [userSearchToggle,setUserSearchToggle] = useState(false)
    const [searchEmail,setSearchEmail] = useState("")
    const [searchObj,setSearchObj] = useState({})
    const [searchErr,setSearchErr] = useState({})
    const [searchedUser,setSearchedUser] = useState({})
    const [userInfo,setUserInfo] = useState({})
    const obj = {}
    const err = {}

    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/app1/user",{
            headers:{
            "Authorization" : localStorage.getItem("token")
        }})
            .then((user) => 
            {
                console.log('userdata',user.data)
                setUserData(user.data)
            })
            .catch((err) => 
            {
                console.log(err)
            })
    },[])

    useEffect(() => 
    {
        if(Object.keys(searchObj).length >0)
        {
            axios.get(`http://localhost:3050/api/app1/search-email/${searchObj.email}`)
            .then((user) => 
            {
                console.log('data from DB-2',user.data)
                // const obj = user.data[0]
                const obj ={
                    name : user.data[0].name,
                    email:user.data[0].email,
                    degree:user.data[0].degree,
                    occupation:user.data[0].occupation,
                    maritalStatus:user.data[0].maritalStatus,
                    homeTown:user.data[0].homeTown,
                    state:user.data[0].state
                }
                console.log("obj",obj)
                setSearchedUser(obj)
                searchUserToggle()
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }       
    },[searchObj])

    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/app1/get-user-info",{
            headers:{
                "Authorization":`${localStorage.getItem("token")}`
            }
        })
        .then((ele) => 
        {
            console.log("showInfo",ele.data)
            const obj = {
                name:ele.data.name,
                email:ele.data.email,
                degree:ele.data.degree,
                occupation:ele.data.occupation,
                maritalStatus:ele.data.maritalStatus,
                homeTown:ele.data.homeTown,
                state:ele.data.state
            }
            setUserInfo(obj)
        })
        .catch((err) => 
        {
            console.log(err)
        })
    },[showToggle])

    const modalToggle = () => 
    {
        setAddInfoToggle(!addInfoToggle)
    }
    const handleAddInfo = (e) => 
    {
        // console.log(e)
        modalToggle()
    }
    const toggleShowInfo = () => 
    {
        setShowToggle(!showToggle)
    }
    const handleShowInfo = (e) => 
    {
        toggleShowInfo()
    }
    const searchUserToggle = () => 
    {
        setUserSearchToggle(!userSearchToggle)
    }
    const handleSearch = (e) => 
    {
        const input = e.target.value
        // console.log(input)
        setSearchEmail(input)
    }
    const validations = () => 
    {
        if(!searchEmail)
        {
            err.message = "Please enter an email id"
        }
        else
        {
            if(!(validator.isEmail(searchEmail)))
            {
                err.message = "Please enter a valid email id"
            }
            else
            {
                obj.email = searchEmail
            }
        }
    }
    
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        validations()
        if(Object.keys(err).length >0)
        {
            setSearchErr(err)
        }
        else
        {
            console.log(obj)
            setSearchObj(obj)
            setSearchEmail("")
            setSearchErr({})
        }
    }
    const handleLogout = (e) =>
    {
        localStorage.removeItem("token")
        toggle()
        props.history.push("/")
    }
   
    return(
        <div>
            <div className='app'>
            <Navbar bg="navStyle" variant='dark'  >
                <Nav.Link className='home' style={{fontSize:"25px"}}>Home</Nav.Link>
                <Nav.Link className='logout' style={{fontSize:"25px"}} onClick={handleLogout}>Logout</Nav.Link>
            </Navbar>
            </div>
            <div>
                <div className='application1'>APPLICATION - 1</div>
                <div className='labelStyle'>Welcome, {userData.name}</div>
                <div className='addStyle'><button type="button" className={`btn btn-primary`} onClick={handleAddInfo}>Add Info</button></div>
                <div className='showStyle'><button type='button' className={`btn btn-primary`} onClick={handleShowInfo}>Show Info</button></div>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" className={`form-control searchTextStyle`} placeholder="search user info by email"
                value={searchEmail} onChange={handleSearch}/>
                <div className='searchErr'>{(Object.keys(searchErr).length >0) && (searchErr.message)}</div>
                <input type="submit" value='search' className={`searchStyle btn btn-primary`}/>
            </form>
            {(addInfoToggle)  && (<UserInfo addInfoToggle={addInfoToggle} modalToggle={modalToggle}/>)}
            {(showToggle) &&
            (<ShowInfo toggleShowInfo={toggleShowInfo} showToggle={showToggle} userInfo={userInfo}/>)}
            {(userSearchToggle) && 
            (<ShowSearch searchUserToggle={searchUserToggle} userSearchToggle={userSearchToggle}
            searchedUser={searchedUser}/>)}
            
        </div>
        
       
    )
}
export default Home