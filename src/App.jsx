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

  //Search Effect
  useEffect(() => {
    const filteredData = users.filter((user) => {
      return Object.values(user).some((value) => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase())
      })
    });
    setFilteredUsers(filteredData);
  }, [users]);


  // Event Handlers
  const handleSearchClick = useCallback(() => {
    document.getElementsByClassName("search-icon")[0].classList.add("trigger-search");
    const filteredData = users.filter((user) => {
      return Object.values(user).some((value) => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });

    if (filteredData.length === 0) { alert(`No Users found with name ${searchQuery}`) }
    else {
      setFilteredUsers(filteredData)
    }
  }, [searchQuery, users]);


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

                      {/* Content to be rendered */}
                      {showAlert && (
                        <div id='alert' className="row">
                          <div className="col-md-6">
                            <Alert variant="secondary">
                              You are in edit mode now!
                            </Alert>
                          </div>
                        </div>
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
