import { Route } from 'react-router-dom'
import { AdminView } from '../../components/AdminView/AdminView'
import { AuthGuard } from '../../Guards/Auth-guard'
import { AdminRoutes } from '../../components/AdminView/adminRoutes/AdminRoutes';

const Admin = () => {
  console.log(AdminRoutes);
  return (
    <div>
      <Route element={<AuthGuard />}>
        <Route path={`${[AdminRoutes]}/admin/*`} element={<AdminView />} />
      </Route>
    </div>
  )
}

export default Admin
