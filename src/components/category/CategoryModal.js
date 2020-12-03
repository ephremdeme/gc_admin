import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBFileInput,
  MDBSelect,
} from "mdbreact";

import { DeleteModal, EditModal } from "../util/modalUtil";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_CATEGORIES,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
} from "./graphql";

export const DeleteCategoryModal = (props) => {
  const [deleteCategory, { loading, error, data }] = useMutation(
    DELETE_CATEGORY,
    {
      refetchQueries: [{ query: GET_ALL_CATEGORIES }],
    }
  );

  const handleClick = () => {
    console.log(props.id);
    deleteCategory({ variables: { id: props.id } });
  };
  return (
    <React.Fragment>
      <DeleteModal handleClick={handleClick} data={data}></DeleteModal>
    </React.Fragment>
  );
};

export const EditCategoryModal = (props) => {
  const [values, setValues] = useState({
    id: props.id,
    category: props.category,
  });

  const [updateCategory, { loading, error, data }] = useMutation(
    UPDATE_CATEGORY
  );

  const onSubmit = () => {
    updateCategory({
      variables: values,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <React.Fragment>
      <EditModal
        name="Edit Category"
        onClick={onSubmit}
        error={error}
        data={data}
      >
        <MDBContainer>
          <MDBInput
            label="Category"
            group
            type="text"
            validate
            valueDefault={values.category}
            error="wrong"
            name="category"
            success="right"
            onChange={handleInputChange}
          />
        </MDBContainer>
      </EditModal>
    </React.Fragment>
  );
};

export function AddCategoryModal() {
  const [values, setValues] = useState({
    category: "",
  });

  const [addCategory, { loading, error, data }] = useMutation(ADD_CATEGORY, {
    update(cache, { data: { createCategory } }) {
      const { categories } = cache.readQuery({ query: GET_ALL_CATEGORIES });

      if (categories && createCategory) {
        cache.writeQuery({
          query: GET_ALL_CATEGORIES,
          data: {
            categories: [...categories, createCategory],
          },
        });
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const Submit = (e) => {
    e.preventDefault();
    addCategory({
      variables: values,
    });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (data) toggle();
  }, [data]);

  return (
    <React.Fragment>
      <MDBContainer fluid>
        <button
          type="button"
          onClick={toggle}
          className="btn btn-outline-primary float-right text-center btn-large btn-rounded m-0 waves-effect waves-light"
        >
          Add Category<i className="ml-4 fas fa-plus "></i>
        </button>
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Add Category</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer>
              <MDBInput
                label="Category"
                group
                type="text"
                validate
                valueDefault={values.name}
                error="wrong"
                name="category"
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
              disabled={loading}
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
