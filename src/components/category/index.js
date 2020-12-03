import { useQuery } from "@apollo/client";
import { MDBBtn, MDBDataTable, MDBSwitch } from "mdbreact";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_ALL_CATEGORIES } from "../products/graphql";
import {
  AddCategoryModal,
  DeleteCategoryModal,
  EditCategoryModal,
} from "./CategoryModal";

const CategoriesPage = () => {
  const { error, loading, data } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    setDatatable({
      ...datatable,
      rows: data?.categories?.map((cat) => {
        let category = Object.assign({}, cat);
        category.edit = <EditCategoryModal {...cat} />;
        category.delete = <DeleteCategoryModal id={cat.id} />;
        category.category = <Link to={"/categories/" + cat.id}>{cat?.category}</Link>;
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

export default CategoriesPage;
