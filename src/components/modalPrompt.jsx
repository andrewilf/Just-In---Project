import React, { useState } from 'react';
import {
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { connect, useDispatch } from "react-redux"

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.data,
    currentProfile: state.currentProfile,
    payload: state.payload,
    basicModal: state.basicModal
  };
}

function ModalPrompt(props) {
  const [input, setInput] = useState("")

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  function validateInput(input) {
    const re = /^[a-zA-Z][a-zA-Z0-9-_\s]{2,32}$/
    console.log(re.test(String(input)))
    return re.test(String(input));
}

  return (
    <>
   
      <MDBModal show={props.basicModal} getOpenState={(e) => { props.dispatch({ type: "SET_MODAL", value: e }) }} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Profiles</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => { props.dispatch({ type: "TOGGLE_MODAL" }) }}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody><MDBInput label='must be longer than 2 characters, only numbers and letters' type='text' value={input || ''} onChange={handleInput}/></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => { 
                props.dispatch({ type: "TOGGLE_MODAL" })
                console.log(input)
             }}>
                Close
              </MDBBtn>
              <MDBBtn onClick={(e) => {
                if(validateInput(input)) {
                props.dispatch({ type: "ADD_NEW_PROFILE", value: input })
                props.dispatch({ type: "UPDATE_CURRENT_PROFILE", value: input })
                props.dispatch({ type: "TOGGLE_MODAL" })
                setInput("")
                }
                //console.log(e.getOpenState())
              }}>Create profile</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
    </>
  );
}




export default connect(mapStateToProps)(ModalPrompt)
