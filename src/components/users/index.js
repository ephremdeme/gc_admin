import { useMutation, useQuery } from "@apollo/client";
import { MDBBtn, MDBDataTable, MDBDropdownToggle, MDBSwitch } from "mdbreact";
import React, { useEffect } from "react";
import { GET_USERS, SUSPEND_USER, UN_SUSPEND_USER } from "./graphql";
import {
  DeleteUserModal,
  EditUserModal,
  DeleteUser,
  AddUserModal,
} from "./UserModal";

const SuspendUser = ({ id, status }) => {
  const [suspendUser, { data }] = useMutation(SUSPEND_USER);
  const [unSuspendUser, { data: unData, error }] = useMutation(UN_SUSPEND_USER);

  return (
    <React.Fragment>
      {status ? (
        <MDBBtn
          size="sm"
          outline
          rounded
          color="danger"
          onClick={() =>
            suspendUser({
              variables: {
                id: id,
              },
            })
          }
        >
          Suspend
        </MDBBtn>
      ) : (
        <MDBBtn
          size="sm"
          outline
          rounded
          color="light-blue"
          onClick={() =>
            unSuspendUser({
              variables: {
                id: id,
              },
            })
          }
        >
          unSuspend
        </MDBBtn>
      )}
    </React.Fragment>
  );
};

const UsersPage = () => {
  const { error, loading, data } = useQuery(GET_USERS);

  useEffect(() => {
    setDatatable({
      ...datatable,
      rows: data?.users?.map((user) => {
        let user1 = Object.assign({}, user);
        user1.edit = <EditUserModal user={user}/>;
        user1.delete = <DeleteUserModal id={user.id} />;
        user1.suspend = <SuspendUser id={user.id} status={user1.status} />;
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
        label: "Username",
        field: "username",
        width: 200,
      },
      {
        label: "Phone",
        field: "phone",
        width: 200,
      },
      {
        label: "Suspend",
        field: "suspend",
        sort: "disabled",
        width: 50,
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
      <MDBSwitch
        onChange={() => console.log()}
        checked={true}
        labelLeft={"All Users"}
        labelRight={"Suspended User"}
      />
      <AddUserModal />
      <MDBDataTable striped bordered hover data={datatable} />
    </React.Fragment>
  );
};

export default UsersPage;
