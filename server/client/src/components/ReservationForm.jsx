import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../style/styles.css";
import Row from 'react-bootstrap/Row';
import api from '../api';
import dateFormat from 'dateformat'

const fieldStyle = {
  width:"57%",
  minWidth:"168px",
  borderColor: "#d3d3d3",
  borderWidth: '.0937499em',
  color:'#535353',
}
const labelStyle = {
  width:"57%",
  marginLeft:"0px",
}
const titleStyle = {
  fontWeight: "450",
  fontStyle: "normal",
  textTransform: "none",
  fontSize: '.85em',
  lineHeight: '.6em',
  color: "#202020",
  letterSpacing: "0.1em",
  paddingBottom: "30px"
}
const labelColStyle = {
  padding:"0px",
  height: "1.44em",
  width: '150px'
}
const fieldColStyle = {
  padding:"0px",
  height: "1.44em",
  marginRight: "20px",
}
const rowStyle = {
  width: "100%"
}
const submitStyle = {
  width: "80px",
  height: "35px",
  padding: "0px",
  letterSpacing: "0.05em",
  fontSize: '.85em',
  fontWeight: '600'
}
const buttonRowStyle = {
  paddingTop: "10px"
}
const errorStyle = {
  paddingTop: "3px",
  fontSize: "14px",
  letterSpacing: "0.05em",
  fontWeight: "300",
}

const FormFields = (initialValues, inputType, style, name, text) => {
  return(
      <Row style = {rowStyle}>
        <div style={labelColStyle}>
          <label htmlFor={name} style={labelStyle}>{text}</label>
        </div>
        <div style={fieldColStyle}>
          <Field name={name} type={inputType} style={style} initialvalue={initialValues[name]} />
        </div>
        <div style={errorStyle}>
          <ErrorMessage name={name}/>
        </div>
       
      </Row>
  )
}

const deleteButtonClicked = () => {
  alert('Are you sure you wish to delete?')
  alert('too bad, max still needs to program that ;) ')
}

const FormButtons = (formType) => {
  if(formType === 'submit') {
    return(
      <Row style={buttonRowStyle}>
        <button type="submit" style={submitStyle}>SEND</button>
      </Row>
    )
  }
  if(formType === 'updateCancel') {
    return(
      <Row style={buttonRowStyle}>
        <div>
          <button type="submit">Update</button>
        </div>
      </Row>
    )
  }
  
}

const ReservationForm = (values) => {
  let initialValues = {}
  let data = values.data
  let formType = values.formType
  let title = values.title
  if(formType === 'updateCancel') {
    initialValues = { fullName: data.fullName, email: data.email, address: data.address, instagram: data.instagram, 
                        checkInDate: dateFormat(data.checkInDate, "mm-dd-yyyy"), 
                        checkOutDate: dateFormat(data.checkOutDate, "mm-dd-yyyy"), 
                        numberBeds: data.numberBeds, phoneNumber: data.phoneNumber}
  } else {
    initialValues = { fullName: '', email: '', address: '', instagram:'', 
                        checkInDate:'', checkOutDate:'', numberBeds:'', phoneNumber:''}
  }
  return (
    <div>
      <div style={titleStyle}>{title}</div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .max(300, 'Must be 15 characters or less')
            .required('Required'),
          phoneNumber: Yup.string()
            .required('Required'),
          address: Yup.string()
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          instagram: Yup.string()
            .required('Required'),
          checkInDate: Yup.date()
            .typeError('Use MM-DD-YYYY format')
            .required('Required'),
          checkOutDate: Yup.date()
            .typeError('Use MM-DD-YYYY format')
            .required('Required'),
          numberBeds: Yup.number()
            .max(14, 'There are only 14 beds in the dorm')
            .required('Required'),
        })}
        onSubmit={async (formValues) => {
          if(formType === 'submit') {
            await api.insertReservation(formValues)
              .then(() => {
                window.location.href = `/bookingComplete`
              })
              .catch(error => {
                console.log(error.response.data.message)
                window.location.href = `/bookingFailed`
              })
          }
          if(formType === 'updateCancel') {
            formValues._id = data._id
            await api.updateReservationById(formValues)
              .then(() => {
                alert('Updated Successfully!')
                window.location.href = `/reservations`
              })
              .catch(error => {
                alert('Update failed!')
                console.log(error.response.data.message)
                
              })
          }
          
        }}
      >
        <Form>
          {FormFields(initialValues, "text", fieldStyle, "fullName", "FULL NAME")}
          {FormFields(initialValues, "text", fieldStyle, "phoneNumber", "PHONE NUMBER")}
          {FormFields(initialValues, "text", fieldStyle, "address", "ADDRESS")}
          {FormFields(initialValues, "text", fieldStyle, "email", "EMAIL")}
          {FormFields(initialValues, "text", fieldStyle, "instagram", "INSTAGRAM")}
          {FormFields(initialValues, "text", fieldStyle, "checkInDate", "CHECK-IN DATE")}
          {FormFields(initialValues, "text", fieldStyle, "checkOutDate", "CHECK-OUT DATE")}
          {FormFields(initialValues, "text", fieldStyle, "numberBeds", "NUMBER OF BEDS")}
          
          {}

          {FormButtons(formType)}

        </Form>
      </Formik>
    </div>
  );
};



export default ReservationForm