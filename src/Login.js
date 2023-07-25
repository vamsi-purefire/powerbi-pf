import React, { useEffect } from 'react';
import { AuthenticationContext } from 'react-adal';
import { authContext } from './adalConfig'; // Create this file in the n
//import "./login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

const Login = () => {
  const handleLogin = () => {
    authContext.login();
  };

  return (
  
    <MDBContainer >

    <MDBCard>
      <MDBRow className='g-0'>

        <MDBCol md='6'>
          <MDBCardImage src='https://www.aaparx.com/hubfs/aapa_wide_hero_bg.jpg' alt="login form" className='rounded-start w-100'/>
        </MDBCol>

        <MDBCol md='6' className=''>
          <MDBCardBody className='d-flex flex-column '>

            <div className='d-flex flex-row justify-content-center align-items-center'>
              <MDBCardImage src='https://www.aaparx.com/hs-fs/hubfs/aapa_logo.png?width=100&name=aapa_logo.png' />
            </div>

            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

            <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#000'}} onClick={handleLogin}>
              <MDBIcon fab icon="windows" className="mx-2"/>
              Continue with Microsoft
            </MDBBtn>

          </MDBCardBody>
        </MDBCol>

      </MDBRow>
    </MDBCard>

  </MDBContainer>
  );
};

export default Login;