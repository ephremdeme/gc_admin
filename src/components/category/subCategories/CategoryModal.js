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

import { DeleteModal, EditModal } from "../../util/modalUtil";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_SUB_CATEGORY,
  UPDATE_SUB_CATEGORY,
  ADD_SUB_CATEGORY,
  GET_CATEGORY,
} from "./graphql";
import { useParams } from "react-router-dom";
import { GET_ALL_CATEGORIES } from "../graphql";

export const DeleteCategoryModal = (props) => {
  let { id } = useParams();
  id = parseInt(id);
  const [deleteCategory, { loading, error, data }] = useMutation(
    DELETE_SUB_CATEGORY,
    {
      refetchQueries: [{ query: GET_CATEGORY, variables: { id: id } }],
    }
  );

  const handleClick = () => {
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
    UPDATE_SUB_CATEGORY
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
  let { id } = useParams();
  id = parseInt(id);
  const [values, setValues] = useState({
    category: "",
    categoryId: id,
  });

  const [addCategory, { loading, error, data }] = useMutation(
    ADD_SUB_CATEGORY,
    {
      update(cache, { data: { createSubCategory } }) {
        const { categories } = cache.readQuery({ query: GET_ALL_CATEGORIES });

        if (categories && createSubCategory) {
          cache.writeQuery({
            query: GET_ALL_CATEGORIES,
            data: {
              categories: [...categories, createSubCategory],
            },
          });
        }
      },
    }
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [modal, setModal] = useState(false);
  const [category, setCategories] = useState([]);

  const { data: cData } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    setCategories(
      cData?.categories?.map((cat) => {
        if (cat.id == id) {
          return { text: cat.category, value: String(cat.id), checked: true };
        }
        return { text: cat.category, value: String(cat.id) };
      })
    );
  }, [cData]);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (data) toggle();
  }, [data]);

  const handleCategorySelect = (e) => {
    setValues({ ...values, categoryId: e[0] });
  };

  const Submit = (e) => {
    e.preventDefault();
    addCategory({
      variables: values,
    });
  };

  return (
    <React.Fragment>
      <MDBContainer fluid>
        <button
          type="button"
          onClick={toggle}
          className="btn btn-outline-primary float-right text-center btn-large btn-rounded m-0 waves-effect waves-light"
        >
          Add Sub-Category<i className="ml-4 fas fa-plus "></i>
        </button>
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Add Category</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer>
              <MDBSelect
                options={category}
                getValue={handleCategorySelect}
                selected="Choose Category"
                search
                label="Category"
              />
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
