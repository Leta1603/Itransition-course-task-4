import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUsers,
  setSelectedUsers,
  UserSelectors,
} from "../../redux/reducers/userSlice.ts";
import { UserInfoResponse } from "../../redux/@type.ts";

const Table = () => {
  const users = useSelector(UserSelectors.getUsers);
  const dispatch = useDispatch();

  const btnFlag = useSelector(UserSelectors.getBtnFlag);

  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);
  const [rows, setRows] = useState<UserInfoResponse[]>([]);

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedIds(selectionModel);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [btnFlag]);

  useEffect(() => {
    dispatch(setSelectedUsers([...selectedIds]));
  }, [selectedIds.length]);

  useEffect(() => {
    const usersArray: UserInfoResponse[] = [];
    if (users) {
      users?.forEach((user) => {
        usersArray.push({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          status: user.status,
          lastLoginTime: user.lastLoginTime,
          registrationTime: user.registrationTime,
        });
      });
      setRows(usersArray);
    }
  }, [users]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "lastLoginTime",
      headerName: "Last login time",
      flex: 1,
    },
    {
      field: "registrationTime",
      headerName: "Registration time",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        keepNonExistentRowsSelected
        onRowSelectionModelChange={(newSelection) =>
          handleSelectionChange(newSelection)
        }
        sx={{ border: 0 }}
      />
    </div>
  );
};

export default Table;
