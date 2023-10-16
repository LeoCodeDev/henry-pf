import { Dashboard } from "../scenes/Dashboard/Dashboard";
import { TableSales } from "../scenes/Tables/TableSales";
import { TableUpdate } from "../scenes/Tables/TableUpdate";
import { TableUsers } from "../scenes/Tables/TableUsers";
import { Line } from "../scenes/Graphics/Line";
import { Bar } from "../scenes/Graphics/Bar";
import { Pie } from "../scenes/Graphics/Pie";
import { Geography } from "../scenes/Graphics/Geography";
import { Update } from '../scenes/ProductUpdate/ProductUpdate'




export const AdminRoutes = [
  {
    path: '/admin/',
    element: <Dashboard />,
    title: 'dashboard'
  },
  {
    path: '/admin/table-sales',
    element: <TableSales />,
    title: 'table sales'
  },
  {
    path: 'admin/update',
    element: <Update />,
    title: 'product update'
  },
  {
    path: '/admin/table-update',
    element: <TableUpdate />,
    title: 'table update'
  },
  {
    path: '/admin/table-users',
    element: <TableUsers />,
    title: 'table users'
  },
  {
    path: '/admin/line',
    element: <Line />,
    title: 'line graphics'
  },
  {
    path: '/admin/bar',
    element: <Bar />,
    title: 'line graphics'
  },
  {
    path: '/admin/pie',
    element: <Pie />,
    title: 'line graphics'
  },
  {
    path: '/admin/geography',
    element: <Geography />,
    title: 'geography graphics'
  }
]
