import React, { useContext } from 'react'
import { filteredUsersContext, selectedUsersIdContext } from '../App';

function SelectionInfo() {
    const selectedUsersId = useContext(selectedUsersIdContext).selectedUsersId;

    console.log(selectedUsersId.length);
    const filteredUsers = useContext(filteredUsersContext);

    return (
        <div id='selection-info'>{selectedUsersId.length} of {filteredUsers.length} row(s) selected.</div>
    )
}

export default SelectionInfo