import { useQuery } from "@apollo/client";
import { MDBBtn, MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { GET_ALL_PRODUCTS } from "./graphql";
import { DeleteProductModal, EditProductModal, AddProductModal } from "./ProductModal";

const ProductsPage = () => {
  const { error, loading, data } = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    setDatatable({
      ...datatable,
      rows: data?.products?.map((user) => {
        let user1 = Object.assign({}, user);
        user1.edit = <EditProductModal {...user} />;
        user1.delete = <DeleteProductModal id = {user1.id} />;
        user1.category = user1?.category.category
        user1.subCategory = user1?.subCategory.category
        return user1;
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
        label: "Name",
        field: "name",
        width: 200,
      },
      {
        label: "Price",
        field: "price",
        width: 200,
      },
      {
        label: "Quantity",
        field: "quantity",
        width: 200,
      },
      {
        label: "Description",
        field: "description",
        width: 200,
      },
      {
        label: "Category",
        field: "category",
        width: 200,
      },
      {
        label: "SubCategory",
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
      <AddProductModal/>
      <MDBDataTable striped bordered hover data={datatable} />
    </React.Fragment>
  );
};

export default ProductsPage;
