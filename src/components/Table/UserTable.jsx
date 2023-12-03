import React, { useContext } from 'react'
import UserItem from './UserItem'
import { currentUsersContext } from '../../App'

function UserTable() {
    const currentUsers = useContext(currentUsersContext);
    return (
        <table id='user-container' cellPadding={15} className='table'>
            <thead>
                <UserItem values={{ tableHeading: true }} />
            </thead>
            <tbody>
                {currentUsers.map((user) => {
                    return (<UserItem key={user.id} values={{ heading: false, id: user.id, name: user.name, email: user.email, role: user.role }} />)
                })}
            </tbody>
        </table>
    )
}

export default UserTable