import { AdminView } from '../../components/AdminView/AdminView'
import { AdminRoutes } from '../../components/AdminView/adminRoutes/AdminRoutes';

const Admin = () => {
  console.log(AdminRoutes);
  return (
    <div>
        <AdminView />
    </div>
  )
}

export default Admin
