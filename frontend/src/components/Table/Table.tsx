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
  const dispatch = useDispatch();
  const users = useSelector(UserSelectors.getUsers);

  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedIds(selectionModel);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(setSelectedUsers([...selectedIds]));
  }, [selectedIds.length]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full name", flex: 1 },
    { field: "email", headerName: "Last name", flex: 1 },
    {
      field: "lastLoginTime",
      headerName: "last login time",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Full name",
      width: 160,
    },
  ];

  const rows: UserInfoResponse[] = [];

  users.forEach((user) => {
    rows.push({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      lastLoginTime: user.lastLoginTime,
      status: user.status,
    });
  });

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
