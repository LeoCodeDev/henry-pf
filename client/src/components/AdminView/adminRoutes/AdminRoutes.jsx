import { Dashboard } from "../scenes/Dashboard/Dashboard";
import { Graphics } from "../scenes/Graphics/Graphics";
import { TableSales } from "../scenes/Tables/TableSales";
import { TableUpdate } from "../scenes/Tables/TableUpdate";
import { TableUsers } from "../scenes/Tables/TableUsers";

export const AdminRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    title: "dashboard",
  },
  {
    path: "/admin/table-sales",
    element: <TableSales />,
    title: "table sales",
  },
  {
    path: "/admin/table-update",
    element: <TableUpdate />,
    title: "table update",
  },
  {
    path: "/admin/table-users",
    element: <TableUsers />,
    title: "table users",
  },
  {
    path: "/admin/graphics",
    element: <Graphics />,
    title: "graphics",
  },
];
