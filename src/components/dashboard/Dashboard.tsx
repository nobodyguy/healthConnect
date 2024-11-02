import Card from "@mui/material/Card";
import DoctorWidgets from "./DoctorWidgets";
import Elibrary from "./ElibraryWidget";
import { usePermissions } from "react-admin";

const Dashboard = () => {
  const { permissions } = usePermissions();
  return (
    <Card sx={{ marginTop: "1rem" }}>
      {permissions === "doctor" ? <DoctorWidgets /> : <Elibrary />}
    </Card>
  );
};

export default Dashboard;
