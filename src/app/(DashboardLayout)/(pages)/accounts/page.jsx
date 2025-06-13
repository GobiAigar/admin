"use client";
import { useEffect, useMemo, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import { format, parseISO, isValid } from "date-fns";
import { mn } from "date-fns/locale";
import { Box } from "@mui/material";
import { Backend_Endpoint } from "@/constants/constants";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "../../components/features/DeleteButton";
import AddUser from "./AddUser";
import DashboardCard from "../../components/shared/DashboardCard";

const Page = () => {
  const [datas, setDatas] = useState([]);

  const handleRefresh = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/user`);
      const data = await response.json();
      setDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "ui_id",
      headerName: "№",
      width: "70",
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "username",
      headerName: "Хэрэглэгчийн нэр",
      type: "string",
      flex: 1,
    },
    {
      field: "email",
      headerName: "И-мэйл",
      type: "string",
      flex: 1,
    },
    {
      field: "regiter_date",
      headerName: "Үүсгэсэн огноо",
      type: "text",
      flex: 1,
      renderCell: (params) => {
        const rawDate = params.row?.regiter_date;

        if (!rawDate) {
          return "-";
        }

        const parsed = parseISO(rawDate);
        if (!isValid(parsed)) {
          return "-";
        }

        return format(parseISO(rawDate), "PPPp", { locale: mn });
      },
    },
    {
      field: "action",
      align: "center",
      headerAlign: "center",
      headerName: "Үйлдэл",
      width: "167",
      sortable: false,
      filterable: false,
      HideSource: false,

      renderCell: (params) => {
        const rowData = params.row;
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {rowData.id !== "e952ac39-37fc-4019-98fe-e152d82d4990" && (
              <DeleteButton
                type={"user"}
                id={rowData}
                onSuccess={handleRefresh}
              />
            )}
          </Box>
        );
      },
    },
  ];
  const processedRows = useMemo(
    () =>
      (datas || []).map((row, idx) => ({
        ...row,
        ui_id: idx + 1,
      })),
    [datas]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Админууд">
      <DashboardCard>
        <Box sx={{ height: "100vh", width: "100%" }}>
          <Box
            sx={{
              width: "full",
              display: "flex",
              gap: 2,
              marginBottom: 3,
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <AddUser />
          </Box>
          <DataGrid
            rows={processedRows}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            disableMultipleRowSelection
            pageSizeOptions={[5]}
            sx={{
              border: "2px solid #ddd",
              borderRadius: 2,
              "& .MuiDataGrid-cell": {
                borderRight: "1px solid #ddd",
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid #ddd",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid #ddd",
              },
              "& .MuiDataGrid-columnHeader": {
                borderRight: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
