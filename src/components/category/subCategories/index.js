import { useQuery } from "@apollo/client";
import { MDBBtn, MDBDataTable, MDBSwitch } from "mdbreact";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsPage from "../../products";
import { GET_ALL_CATEGORIES } from "../graphql";
import {
  AddCategoryModal,
  DeleteCategoryModal,
  EditCategoryModal,
} from "./CategoryModal";
import { GET_CATEGORY } from "./graphql";

const SubCategoriesPage = (props) => {
  const { error, loading, data } = useQuery(GET_CATEGORY, {
    variables: { id: parseInt(props.match.params.id) },
  });

  useEffect(() => {
    setDatatable({
      ...datatable,
      rows: data?.category?.SubCategory.map((cat) => {
        let category = Object.assign({}, cat);
        category.edit = <EditCategoryModal {...cat} />;
        category.delete = <DeleteCategoryModal id={cat.id} />;
        category.subCategory = cat?.category;
        category.category = data?.category?.category;
        return category;
      }),
    });
  }, [data, datatable]);

  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Id",
        field: "id",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Id",
        },
      },
      {
        label: "Category",
        field: "category",
        width: 200,
      },
      {
        label: "Sub Category",
        field: "subCategory",
        width: 200,
      },
      {
        label: "Edit",
        field: "edit",
        sort: "disabled",
        width: 50,
      },
      {
        label: "Delete",
        field: "delete",
        sort: "disabled",
        width: 50,
      },
    ],
    rows: [],
  });

  return (
    <React.Fragment>
      <AddCategoryModal />
      <MDBDataTable striped bordered hover data={datatable} />
    </React.Fragment>
  );
};

export default SubCategoriesPage;
