import { useEffect, useState } from 'react'
import UserItem from './components/UserItem';
import Search from './components/Search';
import ReactPaginate from 'react-paginate';
import './App.css'

function App() {
  let [users, setUsers] = useState([]);
  // let [filteredUsers, setFilteredUsers] = useState([]);
  // let [searchQuery, setSearchQuery] = useState('');
  // let [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  let data;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", {
          method: "GET"
        });
        data = await response.json()
        setUsers(data);
        // setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const filteredData = users.filter((user) => {
  //     return Object.values(user).some((value) => {
  //       return String(value).toLowerCase().includes(searchQuery.toLowerCase())
  //     })
  //   });
  //   setFilteredUsers(filteredData);
  // }, [searchQuery, users]);

  // const handlePageChange = ({ selected }) => {
  //   setCurrentPage(selected);
  // }


  // const indexOfLastUser = (currentPage + 1) * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <div id='parent-container'>
        {/* <Search onSearch={setSearchQuery} /> */}
        {/* delete button */}
        {/* main table */}
        <table id='user-container' cellPadding={15} className='table'>
          <thead>
            <UserItem values={{ heading: true }} />
          </thead>
          <tbody>
            {users.map((user) => {
              return (<UserItem key={user.id} values={{ heading: false, id: user.id, name: user.name, email: user.email, role: user.role }} />)
            })}
          </tbody>
        </table>
        {/* <footer>

          <div id='selection-info'>0 of {filteredUsers.length} row(s) selected.</div>

          <div id='pages-info'>
            <p id='pg-number'>Page {currentPage + 1} of {Math.ceil(filteredUsers.length / usersPerPage)}</p>

            <div id='pagination-container'>
              <button onClick={() => handlePageChange({ selected: 0 })}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
              </button>
              {filteredUsers.length > usersPerPage && (
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination'}
                  activeClassNameClassName={'active'}
                />
              )}
              <button onClick={() => {
                let lastPage = Math.ceil(filteredUsers.length / usersPerPage);
                return handlePageChange({ selected: lastPage - 1 })
              }}>
              </button>
            </div>
          </div>
        </footer> */}
      </div>
    </>);
}

export default App
