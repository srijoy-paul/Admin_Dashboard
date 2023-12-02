import React, { useContext, useState } from 'react';
import { usersContext, selectedUsersIdContext, isSelectAllContext, currentUsersContext } from '../App';


function UserItem({ values }) {
    const { heading, id, name, email, role } = values;

    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({ name, email, role });


    let { users, setUsers } = useContext(usersContext);
    let { selectedUsersId, setSelectedUsersId } = useContext(selectedUsersIdContext);
    let { isSelectAll, setIsSelectAll } = useContext(isSelectAllContext);
    let currentUsers = useContext(currentUsersContext);

    function deleteAction(userId) {
        let updateUsers = users.filter(user => user.id !== userId);
        setUsers(updateUsers);
    }

    const handleAllChange = () => {
        let updateSelectedUsersId;

        updateSelectedUsersId = isSelectAll ? [] : currentUsers.map(userId => userId);
        setIsSelectAll(!isSelectAll);
        setSelectedUsersId(updateSelectedUsersId);
    };

    function handleUpdate(e, field) {
        setEditValues((preValue) => ({ ...preValue, [field]: e.target.value }));
    }

    const handleSaveClick = () => {
        const updateUsers = users.map(user => (user.id === id) ? { ...user, ...editValues } : user);
        // console.log("after updating", updateUsers);
        setUsers(updateUsers);
        setIsEditing(false);
    };

    const handleEdit = () => {
        if (isEditing) handleSaveClick()

        else setIsEditing(!isEditing)
    }


    return (
        <>
            <tr id={id}>
                {(() => {
                    if (heading) {
                        return (
                            <>
                                <th scope="col"><input type="checkbox" name="" id="all" onChange={handleAllChange} /></th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Actions</th>
                            </>)
                    }
                    else {
                        return <>
                            <td><input checked={selectedUsersId.includes(id)} type="checkbox" name="" id={id} onChange={(e) => {
                                if (e.target.checked) {

                                    setSelectedUsersId([...selectedUsersId, id]);
                                    // console.log(selectedUsersId)
                                    document.getElementById(id).classList.add("userSelected");
                                }
                                else {
                                    setSelectedUsersId((preValue) =>
                                        preValue.filter(value => value != id)
                                    )
                                    document.getElementById(id).classList.remove("userSelected");
                                }
                            }} /></td>

                            <td><input type="text" name="name" id="" value={editValues.name} readOnly={!isEditing} onChange={(e) => { handleUpdate(e, "name") }} className={id} /></td>

                            <td><input type="text" name="email" id="" value={editValues.email} readOnly={!isEditing} onChange={(e) => { handleUpdate(e, "email") }} className={id} /></td>

                            <td><input type="text" name="role" id="" value={editValues.role} readOnly={!isEditing} onChange={(e) => { handleUpdate(e, "role") }} className={id} /></td>

                            <td>
                                <div id='action-btns'>
                                    <div id="edit" onClick={handleEdit}>
                                        {isEditing ?
                                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                                            </svg>)
                                            :
                                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>)}

                                    </div>
                                    <div id="delete" onClick={() => deleteAction(id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    </div>
                                </div>
                            </td></>
                    }
                })()}

            </tr>
        </>
    )
}

export default UserItem;
// export deleteAction;