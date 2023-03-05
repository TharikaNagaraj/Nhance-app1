import React, { useState,useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from "axios";

const ShowInfo = (props) => 
{
    const {showToggle,toggleShowInfo,userInfo} = props
    const [show,setShow] = useState(showToggle)
    const [displayUser,setDisplayUser] = useState(userInfo)

    const handleClose = () => 
    {
        toggleShowInfo()
    }
    return( 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Bio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>email</th>
                            <th>Degree</th>
                            <th>Occupation</th>
                            <th>Marital Status</th>
                            <th>Home Town</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {(Object.keys(displayUser).map((ele,i) => 
                            {
                                return(
                                    <td key={i}>{displayUser[ele]}</td>
                                )
                            }))}
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}
export default ShowInfo