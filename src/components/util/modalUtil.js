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

export const DeleteModal = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.handleClick();
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if(props.data) toggle();
  }, [props.data])
  return (
    <React.Fragment>
      <MDBContainer>
        <button
          type="button"
          onClick={toggle}
          className="btn btn-outline-danger btn-rounded btn-sm m-0 waves-effect waves-light"
        >
          Delete
        </button>
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle} className="text-center">
            <p className="heading">Are you sure?</p>
          </MDBModalHeader>
          <MDBModalBody className="text-center">
            <i className="fas fa-times fa-4x animated rotateIn"></i>
          </MDBModalBody>
          <MDBModalFooter>
            <button
              type="button"
              onClick={toggle}
              className="btn  btn-teal btn-rounded btn-sm m-1 waves-effect waves-light"
            >
              No
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="btn btn-danger btn-rounded btn-sm m-1 waves-effect waves-light"
            >
              Yes
            </button>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    </React.Fragment>
  );
};

export const EditModal = (props) => {
  const [modal, setModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (props.data) {
      toggle();
    }
  }, [props.data]);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <MDBContainer>
        <button
          type="button"
          onClick={toggle}
          className="btn  btn-outline-info btn-rounded btn-sm m-0 waves-effect waves-light"
        >
          Edit
        </button>
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>{props.name}</MDBModalHeader>
          <MDBModalBody>{props.children}</MDBModalBody>
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
              onClick={props.onClick}
              className="btn btn-teal btn-rounded btn-sm m-1 waves-effect waves-light"
            >
              Save
            </button>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    </React.Fragment>
  );
};
