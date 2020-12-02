import { useQuery } from "@apollo/client";
import { MDBBtn, MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { GET_ALL_CATEGORIES } from "../products/graphql";
import { GET_ALL_PRODUCTS } from "./graphql";
import {
  DeleteProductModal,
  EditProductModal,
  AddProductModal,
} from "./ProductModal";

const CategoriesPage = () => {
  const { error, loading, data } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    setDatatable({
      ...datatable,
      rows: data?.categories?.map((cat) => {
        let category = Object.assign({}, cat);
        category.edit = <EditProductModal {...category} />;
        category.delete = <DeleteProductModal id={category.id} />;
        category.category = cat?.category;
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
      <AddProductModal />
      <MDBDataTable striped bordered hover data={datatable} />
    </React.Fragment>
  );
};

export default CategoriesPage;
