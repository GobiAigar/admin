"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { Backend_Endpoint } from "@/constants/constants";
import Loading from "../../loading";
import { Box, Grid } from "@mui/material";
import EditProduct from "../../components/features/EditProduct";
import SeeDetailsProduct from "../../components/features/SeeDetailsProduct";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "entitle",
    headerName: "Гарчиг /Англи/",
    flex: 1,
  },
  {
    field: "mntitle",
    headerName: "Гарчиг /Монгол/",
    flex: 1,
  },
  {
    field: "mndescription",
    headerName: "Дэд гарчиг /Монгол/",
    flex: 1,
  },
  {
    field: "endescription",
    headerName: "Дэд гарчиг /Англи/",
    flex: 1,
  },
];

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelecedData] = useState(null);

  const fetchdata = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/product`);
      const data = await response.json();
      if (data.success) {
        setDatas(data?.data);
        setLoading(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading) return <Loading />;

  return (
    <PageContainer title="Нүүр хуудас">
      <Grid container size={12} spacing={2}>
        <Grid container item size={12} spacing={2}>
          <Grid size={"grow"}>Нүүр хуудас</Grid>
          <Grid size={"auto"}>
            <EditProduct data={selectedData} />
          </Grid>
          <Grid size={"auto"}>
            <SeeDetailsProduct data={selectedData} />
          </Grid>
        </Grid>
        <Box sx={{ height: 800, width: "100%" }}>
          <DataGrid
            rows={datas}
            columns={columns}
            onRowClick={(params) => {
              setSelecedData(params.row);
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 11,
                },
              },
            }}
            pageSizeOptions={[11]}
            checkboxSelection
            disableMultipleRowSelection
          />
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default Page;
