import dynamic from "next/dynamic";

import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar, Box } from "@mui/material";
import { IconArrowUpLeft, IconNews } from "@tabler/icons-react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const YearlyBreakup = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";

  return (
    <DashboardCard title="Мэдээний тоо">
      <Grid container spacing={3}>
        {/* column */}
        <Grid
          size={{
            xs: 7,
            sm: 7,
          }}
        >
          <Typography variant="h3" fontWeight="700"></Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Typography variant="subtitle2" color="textSecondary">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <IconNews width={20} color="#FA896B" />
                <Typography>{} Нийтлэл</Typography>
              </Box>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
