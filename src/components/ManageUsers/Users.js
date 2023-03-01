import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers } from '../../service/userService';
import ReactPaginate from 'react-paginate';

const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      setListUser(response.data.DT.users);
      setTotalPages(response.data.DT.totalPages);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handlePageCick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  return (
    <div className='container'>
      <div className='manage-users-container'>
        <div className='user-header d-flex justify-content-between'>
          <div className='title'>
            <h3>Table Users</h3>
          </div>
          <div className='actions'>
            <button className='btn btn-success'>Refesh</button>
            <button className='btn btn-primary'>Add new user</button>
          </div>
        </div>
        <div className='user-body'>
          <table className='table table-hover table-bordered'>
            <thead>
              <tr>
                <th scope='col'>Numberoder</th>
                <th scope='col'>Id</th>
                <th scope='col'>Email</th>
                <th scope='col'>Username</th>
                <th scope='col'>Group</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUser && listUser.length > 0 ? (
                <>
                  {listUser.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <th>{index + 1}</th>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : ''}</td>
                        <td>
                          <button className='btn btn-warning'>Edit</button>
                          <button className='btn btn-danger'>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td>Not found user</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 0 && (
          <div className='user-footer'>
            <ReactPaginate
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              forcePage={0}
              previousLabel='Previous'
              nextLabel='Next'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakLabel='...'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              onPageChange={handlePageCick}
              containerClassName='pagination'
              activeClassName='active'
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Users;
