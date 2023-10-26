import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function UserAdmin() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    const { data } = await axios.get('/users/allUsers')
    setUsers(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const handleToggleActive = async (id_user, active) => {
    try {
      await axios.put(`/users/manageUser?id_user=${id_user}`, { active })
      fetchUsers()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return loading ? (
    <Typography variant='h1' sx={{color: '#fff'}}>Loading...</Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id_user}>
                <TableCell>{user.id_user}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Switch
                      checked={user.active}
                      onChange={() =>
                        handleToggleActive(user.id_user, !user.active)
                      }
                      color="secondary"
                      inputProps={{ 'aria-label': 'toggle user active state' }}
                    />
                    <Link
                      style={{ textDecoration: 'none', color: '#bfbfbf' }}
                      to={`/admin/table-users/user-details/${user.email}`}>
                      View User Details
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Toaster position="top-center" reverseOrder={false} />
    </TableContainer>
  )
}
