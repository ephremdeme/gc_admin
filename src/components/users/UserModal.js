import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";
import { useHistory } from "react-router-dom";
import { DeleteModal, EditModal } from "../util/modalUtil";
import { useMutation } from "@apollo/client";
import { DELETE_USER, ADD_USER } from "./graphql";

export const DeleteUserModal = (props) => {
  const [deleteUser, { error, data, loading }] = useMutation(DELETE_USER);

  const onClick = () => {
    deleteUser({ variables: { id: props.id } });
  };

  return (
    <React.Fragment>
      <DeleteModal
        name="Delete User"
        data={data}
        handleClick={onClick}
      ></DeleteModal>
    </React.Fragment>
  );
};

export const EditUserModal = (props) => {
  return (
    <React.Fragment>
      <EditModal name="Edit User">
        <MDBInput label="Name" type="text" />
      </EditModal>
    </React.Fragment>
  );
};

export function AddUserModal() {
  const [values, setValues] = useState({
    phone: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const [createUser, { loading, data, error }] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const Submit = (e) => {
    createUser({
      variables: values,
    });
    e.preventDefault();
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if(data) toggle()
  }, [data])

  return (
    <React.Fragment>
      <MDBContainer fluid>
        <button
          type="button"
          onClick={toggle}
          className="btn btn-outline-primary float-right text-center btn-large btn-rounded m-0 waves-effect waves-light"
        >
          Add User<i className="ml-4 fas fa-plus "></i>
        </button>
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Add User</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer>
              <MDBInput
                label="First Name"
                group
                type="text"
                validate
                error="wrong"
                name="first_name"
                success="right"
                onChange={handleInputChange}
              />
              <MDBInput
                label="Last Name"
                group
                type="text"
                validate
                error="wrong"
                name="last_name"
                success="right"
                onChange={handleInputChange}
              />
              <MDBInput
                label="Username"
                group
                type="text"
                validate
                error="wrong"
                name="username"
                success="right"
                onChange={handleInputChange}
              />
              <MDBInput
                label="Email"
                group
                type="email"
                validate
                error="wrong"
                name="email"
                success="right"
                onChange={handleInputChange}
              />
              <MDBInput
                label="Phone"
                group
                type="tel"
                validate
                error="wrong"
                name="phone"
                success="right"
                onChange={handleInputChange}
              />
              <MDBInput
                label="Password"
                group
                type="password"
                validate
                error="wrong"
                name="password"
                success="right"
                onChange={handleInputChange}
              />
            </MDBContainer>
          </MDBModalBody>
          <MDBModalFooter>
            <button
              type="button"
              onClick={toggle}
              className="btn btn-danger  btn-rounded btn-sm m-1 waves-effect waves-light"
            >
              close
            </button>
            <button
              type="button"
              onClick={Submit}
              className="btn btn-teal btn-rounded btn-sm m-1 waves-effect waves-light"
            >
              Save
            </button>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    </React.Fragment>
  );
}
