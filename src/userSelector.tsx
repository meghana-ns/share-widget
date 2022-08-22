import React from 'react';
import AccessLevelDropdown from './accessLevelDropdown';

interface IUserProps {
    users: any,
    groups: any,
    setSelectedUsersGroups: Function
}

interface ISelectedUsersGroups {
    selectedUsersGroups: any,
}

const UserSelector = (props: IUserProps) => {
    const { users, groups, setSelectedUsersGroups } = props;
    const [showModal, toggleModal] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [userSearchSuggestions, setUserSearchSuggestions] = React.useState([]);
    const [groupSearchSuggestions, setGroupSearchSuggestions] = React.useState([]);
    const [selectedUsersAndGroups, setSelectedUsersAndGroups] = React.useState([]);

    const searchUsers = (searchTerm: string) => {
        setSearchTerm(searchTerm);

        let searchKey = searchTerm.trim().toLowerCase(),
            userSuggestions: any = [],
            groupSuggestions: any = [];

        if (searchKey === '') {
            setUserSearchSuggestions(userSuggestions);
            setGroupSearchSuggestions(groupSuggestions);
        }
        else {
            users.forEach((user: any) => {
                if (user.name.trim().toLowerCase().includes(searchKey) || user.email.trim().toLowerCase().includes(searchKey)) {
                    userSuggestions.push(user);
                }
            });
            setUserSearchSuggestions(userSuggestions);

            groups.forEach((group: any) => {
                if (group.name.trim().toLowerCase().includes(searchKey) || group.groupEmail.trim().toLowerCase().includes(searchKey)) {
                    groupSuggestions.push(group);
                }
            });
            setGroupSearchSuggestions(groupSuggestions);
        }

    }

    const addUserGroupToList = (userOrGroup: any) => {
        let updatedUserGroupSelection: any = [...selectedUsersAndGroups];
        updatedUserGroupSelection.push(userOrGroup);
        setSelectedUsersAndGroups(updatedUserGroupSelection);
    }

    const removeUserGroupFromList = (userOrGroup: any) => {
        let updatedUserGroupSelection: any = [...selectedUsersAndGroups];
        updatedUserGroupSelection.splice(updatedUserGroupSelection.indexOf(userOrGroup), 1);
        setSelectedUsersAndGroups(updatedUserGroupSelection);
    }

    const inviteHandler = () => {
        setSelectedUsersGroups(selectedUsersAndGroups);
        toggleModal(!showModal);
    }

    const modalHandler = () => {
        let modal = document.getElementById('userList');
        if (modal) {
            if (showModal) {
                modal.style.display = 'inherit';
            }
            else {
                modal.style.display = 'none';
            }
        }
    }

    React.useEffect(() => {
        modalHandler();
    })

    return (
        <>
            <div id='share-invite-input'>
                <input type='text' placeholder='People, emails, groups' onClick={() => toggleModal(!showModal)} onChange={() => toggleModal(!showModal)} />
                <button onClick={() => toggleModal(!showModal)}>Invite</button>
            </div>
            <div className='modal' id="userList" tabIndex={-1} role="dialog" aria-labelledby="userListModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {selectedUsersAndGroups.length > 0 ?
                                selectedUsersAndGroups.map((userOrGroup: any, index: number) => {
                                    return (<>
                                        <div key={userOrGroup.id}>{userOrGroup.name}</div>
                                        <button key={index} onClick={() => removeUserGroupFromList(userOrGroup)}>x</button>
                                    </>
                                    )
                                })
                                : <></>}
                            <input type='text' value={searchTerm} placeholder={selectedUsersAndGroups.length > 0 ? '' : 'Search emails, names, or groups'} onChange={(event) => searchUsers(event.target.value)} />
                            <AccessLevelDropdown />
                            <button type="button" onClick={inviteHandler}>Invite</button>
                        </div>
                        <div className="modal-body">
                            {userSearchSuggestions.length > 0 ?
                                <>
                                    <div>Select a person</div>
                                    <ul>
                                        {userSearchSuggestions.map((user: any) => <li key={user.id} onClick={() => addUserGroupToList(user)}>{user.name}</li>)}
                                    </ul>
                                </>
                                : <></>
                            }

                            {groupSearchSuggestions.length > 0 ?
                                <>
                                    <div>Select a group</div>
                                    <ul>
                                        {groupSearchSuggestions.map((group: any) => <li key={group.id} onClick={() => addUserGroupToList(group)}>{group.name}</li>)}
                                    </ul>
                                </>
                                : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSelector;