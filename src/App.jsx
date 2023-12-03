import { useEffect, useState, useContext, createContext, useCallback } from 'react'
import './App.css';
import Header from './components/Header';
import UserTable from './components/Table/UserTable';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

//Contexts
export const usersContext = createContext();
export const filteredUsersContext = createContext();
export const selectedUsersIdContext = createContext();
export const isSelectAllContext = createContext();
export const currentUsersContext = createContext();
export const currentUsersIdContext = createContext();
export const handlePageChangeContext = createContext();
export const showAlertContext = createContext();

function App() {

  //State Hooks
  let [users, setUsers] = useState([]);
  let [filteredUsers, setFilteredUsers] = useState([]);
  let [searchQuery, setSearchQuery] = useState('');
  let [currentPage, setCurrentPage] = useState(0);
  const [selectedUsersId, setSelectedUsersId] = useState([]);
  let [isSelectAll, setIsSelectAll] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const usersPerPage = 10;
  let data;


  // Data Fetching Effect
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", {
          method: "GET"
        });
        data = await response.json();
        console.log(data);
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

<<<<<<< HEAD
  //Search Effect
  useEffect(() => {
    const filteredData = users.filter((user) => {
      return Object.values(user).some((value) => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
      })
    });
    setFilteredUsers(filteredData);
  }, [users]);

=======
  // Simultaneous search and filtering functionality to update dynamically while typing in the search bar.

  useEffect(() => {
    const filteredData = users.filter((user) => {
      return Object.values(user).some((value) => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
      })
    });
    setFilteredUsers(filteredData);
  }, [users]);
>>>>>>> 3a226add0f19f16241f739b66b013929ce3e0e32

  // Event Handlers
  const handleSearchClick = useCallback(() => {
    document.getElementsByClassName("search-icon")[0].classList.add("trigger-search");
    const filteredData = users.filter((user) => {
      return Object.values(user).some((value) => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
<<<<<<< HEAD

=======
>>>>>>> 3a226add0f19f16241f739b66b013929ce3e0e32
    if (filteredData.length === 0) { alert(`No Users found with name ${searchQuery}`) }
    else {
      setFilteredUsers(filteredData)
    }
<<<<<<< HEAD
  }, [searchQuery, users]);

=======
  };
>>>>>>> 3a226add0f19f16241f739b66b013929ce3e0e32

  const handlePageChange = ({ selected }) => {
    console.log(selected);
    setCurrentPage(selected);
  }


  const handleSelectedDelete = () => {
    if (selectedUsersId.length === 0) { alert("Not selected"); return; }

    let updateUsers = users.filter(user => !selectedUsersId.includes(user.id));
    setUsers(updateUsers);
    setSelectedUsersId([]);
  };


  // Pagination Logic (For Current Page we are in)
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const currentUsersId = currentUsers.map(user => user.id);


  // JSX Structure
  return (
    <>
      <usersContext.Provider value={{ users, setUsers }}>
        <filteredUsersContext.Provider value={filteredUsers}>
          <selectedUsersIdContext.Provider value={{ selectedUsersId, setSelectedUsersId }}>
            <isSelectAllContext.Provider value={{ isSelectAll, setIsSelectAll }}>
              <currentUsersContext.Provider value={currentUsers}>
                <currentUsersIdContext.Provider value={currentUsersId}>
                  <handlePageChangeContext.Provider value={handlePageChange}>
                    <showAlertContext.Provider value={{ showAlert, setShowAlert }}>

<<<<<<< HEAD
                      {/* Content to be rendered */}
                      {showAlert && (
                        <div id='alert' className="row">
                          <div className="col-md-6">
                            <Alert variant="secondary">
                              You are in edit mode now!
                            </Alert>
                          </div>
                        </div>
=======
                    </p>
                  </div>
                  {/* delete button */}
                  <div id="selectDelete" onClick={handleSelectedDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                  </div>
                </header>
                <table id='user-container' cellPadding={15} className='table'>
                  <thead>
                    <UserItem values={{ heading: true }} />
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => {
                      return (<UserItem key={user.id} values={{ heading: false, id: user.id, name: user.name, email: user.email, role: user.role }} />)
                    })}
                  </tbody>
                </table>
                <footer>

                  <div id='selection-info'>{selectedUsersId.length} of {filteredUsers.length} row(s) selected.</div>

                  <div id='pages-info'>
                    <div id='pg-number'>Page {currentPage + 1} of {Math.ceil(filteredUsers.length / usersPerPage)}</div>

                    <div id='pagination-container'>
                      <div>
                        <button className='first-page' onClick={() => handlePageChange({ selected: 0 })}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                          </svg>
                        </button>
                      </div>
                      {filteredUsers.length > usersPerPage && (
                        <ReactPaginate
                          previousLabel={'<'}
                          nextLabel={'>'}
                          breakLabel={'...'}
                          pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          forcePage={currentPage}
                          onPageChange={handlePageChange}
                          containerClassName={'pagination'}
                          activeClassName={'selected'}
                          previousClassName={'previous-page'}
                          nextClassName={'next-page'}
                        />
>>>>>>> 3a226add0f19f16241f739b66b013929ce3e0e32
                      )}

                      <div id='parent-container'>
                        <Header values={{ setSearchQuery, handleSearchClick, handleSelectedDelete }} />

                        <UserTable />

                        <Footer values={{ currentPage, usersPerPage }} />
                      </div>

                    </showAlertContext.Provider>
                  </handlePageChangeContext.Provider>
                </currentUsersIdContext.Provider>
              </currentUsersContext.Provider>
            </isSelectAllContext.Provider>
          </selectedUsersIdContext.Provider>
        </filteredUsersContext.Provider>
      </usersContext.Provider>
    </>);
}

export default App
