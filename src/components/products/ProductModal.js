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
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_CATEGORIES,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
} from "./graphql";

export const DeleteProductModal = (props) => {
  const [deleteProduct, { loading, error, data }] = useMutation(DELETE_PRODUCT);

  const handleClick = () => {
    console.log(props.id);
    deleteProduct({ variables: { id: props.id } });
  };
  return (
    <React.Fragment>
      <DeleteModal handleClick={handleClick} data={data}></DeleteModal>
    </React.Fragment>
  );
};

export const EditProductModal = (props) => {
  const [values, setValues] = useState({
    id: props.id,
    name: props.name,
    price: props.price,
    shortDescription: props.shortDescription,
    fullDescription: props.fullDescription,
    quantity: props.quantity,
    categoryId: props.category.id,
    subCategoryId: props.subCategory.id,
  });
  const [category, setCategories] = useState([]);
  const [subCategory, setSubCategories] = useState([]);
  const [updateProduct, { loading, error, data }] = useMutation(UPDATE_PRODUCT);

  const { data: cData } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    setCategories(
      cData?.categories?.map((cat) => {
        if (cat.id == values.categoryId) {
          return { text: cat.category, value: String(cat.id), checked: true };
        }
        return { text: cat.category, value: String(cat.id) };
      })
    );

    let cat = cData?.categories?.find((cat) => cat.id == values.categoryId);

    setSubCategories(
      cat?.SubCategory?.map((sub) => {
        if (sub.id == values.subCategoryId) {
          return { text: sub.category, value: String(sub.id), checked: true };
        }
        return { text: sub.category, value: String(sub.id) };
      }) || []
    );
  }, [cData]);

  const handleImageFileChange = (e) => {
    setValues({ ...values, images: e });
  };
  const handleFileChange = (e) => {
    setValues({ ...values, file_3d: e[0] });
  };
  const handleCategorySelect = (e) => {
    setValues({ ...values, categoryId: e[0] });
    let cat = cData?.categories?.find((cat) => cat.id == parseInt(e[0]));

    console.log(values.categoryId, values.subCategoryId);

    setSubCategories(
      cat?.SubCategory?.map((sub) => {
        if (sub.id == props.subCategory.id) {
          setValues({ ...values, subCategoryId: props.subCategory.id });
          return { text: sub.category, value: String(sub.id), checked: true };
        }
        return { text: sub.category, value: String(sub.id) };
      })
    );
  };

  const onSubmit = () => {
    values.price = parseFloat(values.price);
    values.quantity = parseInt(values.quantity);
    values.categoryId = parseInt(values.categoryId);
    values.subCategoryId = parseInt(values.subCategoryId);
    updateProduct({
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
        name="Edit Product"
        onClick={onSubmit}
        error={error}
        data={data}
      >
        <MDBContainer>
          <MDBInput
            label="Product Name"
            group
            type="text"
            validate
            valueDefault={values.name}
            error="wrong"
            name="name"
            success="right"
            onChange={handleInputChange}
          />
          <MDBInput
            label="Price"
            group
            type="number"
            validate
            error="wrong"
            name="price"
            success="right"
            valueDefault={values.price}
            onChange={handleInputChange}
          />
          <MDBInput
            label="Quantity"
            group
            type="number"
            validate
            error="wrong"
            name="quantity"
            success="right"
            valueDefault={values.quantity}
            onChange={handleInputChange}
          />
          <MDBSelect
            options={category}
            getValue={handleCategorySelect}
            selected="Choose Category"
            label="Category"
          />
          <MDBSelect
            options={subCategory}
            getValue={(e) => setValues({ ...values, subCategoryId: e[0] })}
            selected="Choose Sub Category"
            label="Sub Category"
          />
          <MDBInput
            label="Short Description"
            group
            type="textarea"
            validate
            error="wrong"
            name="shortDescription"
            success="right"
            valueDefault={values.shortDescription}
            onChange={handleInputChange}
          />
          <MDBInput
            label="Full Description"
            group
            type="textarea"
            validate
            error="wrong"
            name="fullDescription"
            success="right"
            valueDefault={values.fullDescription}
            onChange={handleInputChange}
          />
          <MDBFileInput
            textFieldTitle="Select Multiple Image"
            multiple
            getValue={handleImageFileChange}
          />
          <MDBFileInput
            textFieldTitle="Select 3D model"
            getValue={handleFileChange}
          />
        </MDBContainer>
      </EditModal>
    </React.Fragment>
  );
};

export function AddProductModal() {
  const [values, setValues] = useState({
    name: "Pixel 4",
    price: "3333",
    shortDescription: "",
    fullDescription: "",
    quantity: "12",
    categoryId: "1",
    subCategoryId: "2",
  });

  const [category, setCategories] = useState([]);
  const [subCategory, setSubCategories] = useState([]);

  const [addProduct, { loading, error, data }] = useMutation(ADD_PRODUCT);
  const { data: cData } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    setCategories(
      cData?.categories?.map((cat) => {
        return { text: cat.category, value: String(cat.id) };
      })
    );
  }, [cData]);

  const handleImageFileChange = (e) => {
    setValues({ ...values, images: e });
  };
  const handleFileChange = (e) => {
    setValues({ ...values, file_3d: e[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCategorySelect = (e) => {
    setValues({ ...values, categoryId: e[0] });
    let cat = cData?.categories?.find((cat) => cat.id == parseInt(e[0]));

    setSubCategories(
      cat?.SubCategory?.map((sub) => {
        return {
          value: String(sub.id),
          text: sub.category,
        };
      }) || []
    );
  };

  const Submit = (e) => {
    e.preventDefault();
    values.price = parseInt(values.price);
    values.quantity = parseInt(values.quantity);
    values.categoryId = parseInt(values.categoryId);
    values.subCategoryId = parseInt(values.subCategoryId);
    addProduct({
      variables: values,
    });
  };
  if (data) console.log(data);

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
          Add Product<i className="ml-4 fas fa-plus "></i>
        </button>
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Add Product</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer>
              <MDBInput
                label="Product Name"
                group
                type="text"
                validate
                valueDefault={values.name}
                error="wrong"
                name="name"
                success="right"
                onChange={handleInputChange}
              />
              <MDBInput
                label="Price"
                group
                type="number"
                validate
                error="wrong"
                name="price"
                success="right"
                valueDefault={values.price}
                onChange={handleInputChange}
              />
              <MDBInput
                label="Quantity"
                group
                type="number"
                validate
                error="wrong"
                name="quantity"
                success="right"
                valueDefault={values.quantity}
                onChange={handleInputChange}
              />

              <MDBSelect
                options={category}
                getValue={handleCategorySelect}
                selected="Choose Category"
                label="Category"
              />
              <MDBSelect
                options={subCategory}
                getValue={(e) => setValues({ ...values, subCategoryId: e[0] })}
                selected="Choose Sub Category"
                label="Sub Category"
              />
              <MDBInput
                label="Short Description"
                group
                type="textarea"
                validate
                error="wrong"
                name="shortDescription"
                success="right"
                valueDefault={values.shortDescription}
                onChange={handleInputChange}
              />
              <MDBInput
                label="Full Description"
                group
                type="textarea"
                validate
                error="wrong"
                name="fullDescription"
                success="right"
                valueDefault={values.fullDescription}
                onChange={handleInputChange}
              />
              <MDBFileInput
                textFieldTitle="Select Multiple Image"
                multiple
                getValue={handleImageFileChange}
              />
              <MDBFileInput
                textFieldTitle="Select 3D model"
                getValue={handleFileChange}
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
