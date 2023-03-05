import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const UserInfo = (props) => 
{
    // const [show,setShow] = useState(false)
    const {addInfoToggle,modalToggle} = props
    const [degree,setDegree] = useState("")
    const [occupation,setOccupation] = useState("")
    const [maritalStatus,setMaritalStatus] = useState("")
    const [homeTown,setHomeTown] = useState("")
    const [state,setState] = useState("")
    const [formData,setFormData] = useState({})
    const [errData,setErrData] = useState({})
    let errObj = {}
    let formObj = {}

    useEffect(() => 
    {
        if(Object.keys(formData).length >0)
        {
            axios.put("http://localhost:3050/api/app1/add-user-info",formData,{
                headers:{
                    "Authorization" : `${localStorage.getItem("token")}`
                }
            })
                .then((user) => 
                {
                    console.log("userInfo",user.data)
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }
    },[formData])

    const handleClose = () => 
    {
        modalToggle()        
    }
    const handleChange = (e) => 
    {
        const input = e.target.value
        if(e.target.name == "degree")
        {
            // console.log(input)
            setDegree(input)
        }
        else if(e.target.name == "occupation")
        {
            // console.log(input)
            setOccupation(input)
        }
        else if(e.target.name == "maritalStatus")
        {
            // console.log(input)
            setMaritalStatus(input)
        }
        else if(e.target.name == "homeTown")
        {
            // console.log(input)
            setHomeTown(input)
        }
        else
        {
            // console.log(input)
            setState(input)
        }
    }
    const validations = () => 
    {
        if((!degree) || (!occupation) || (!maritalStatus) || (!homeTown) || (!state))
        {
            errObj.errMessage = "Please fill all the fields"
        }
        else
        {
            const obj = {
                degree,
                occupation,
                maritalStatus,
                homeTown,
                state
            }
            formObj = {...obj}
        }
    }
    const handleSubmit = (e) => 
    {
        validations()
        if(Object.keys(errObj).length > 0)
        {
            setErrData(errObj)
        }
        else
        {
            console.log(formObj)
            setFormData(formObj)
            setDegree("")
            setOccupation("")
            setMaritalStatus("")
            setHomeTown("")
            setState("")
            setErrData({})
        }
    }
    return(
        <div>
            <Modal show={addInfoToggle} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Bio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Highest degree*</Form.Label>
                            <Form.Control type="text" name="degree" value={degree} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Occupation*</Form.Label>
                            <Form.Select name="occupation" value={occupation} onChange={handleChange}>
                                <option>Select</option>
                                <option>Student</option>
                                <option>Working</option>
                                <option>Non-working</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Marital Status*</Form.Label>
                            <Form.Select name="maritalStatus" value={maritalStatus} onChange={handleChange}>
                                <option>Select</option>
                                <option>Married</option>
                                <option>Single</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hometown*</Form.Label>
                            <Form.Control type="text" name="homeTown" value={homeTown} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>State*</Form.Label>
                            <Form.Control type="text" name="state" value={state} onChange={handleChange}></Form.Control>
                        </Form.Group>
                    </Form>
                    <div style={{color:"red"}}>{(Object.keys(errData).length >0) && (errData.errMessage)}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}
export default UserInfo