import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers } from '../../service/userService';
import ReactPaginate from 'react-paginate';
import { deleteUser } from '../../service/userService';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  // modal update/create user
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState('CREATE');
  const [dataModalUser, setDataModalUser] = useState({});

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

  const handleDeleteUser = (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setDataModal({});
    setIsShowModalDelete(false);
  };

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal);
    if (response && response.data.EC === 0) {
      toast.success(response.data.EM);
      await fetchUsers();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.data.EM);
    }
  };

  const onHideModalUser = async () => {
    setIsShowModalUser(false);
    setDataModalUser({});
    await fetchUsers();
  };

  const handleEditUser = (user) => {
    setActionModalUser('UPDATE');
    setDataModalUser(user);
    setIsShowModalUser(true);
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  return (
    <>
      <div className='container'>
        <div className='manage-users-container'>
          <div className='user-header d-flex justify-content-between'>
            <div className='title mt-3'>
              <h3>Manage Users</h3>
            </div>
            <div className='actions my-3'>
              <button
                className='btn btn-success refresh'
                onClick={() => handleRefresh()}
              >
                <i className='fa fa-refresh'></i>
                Refesh
              </button>
              <button
                className='btn btn-primary'
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser('CREATE');
                }}
              >
                <i className='fa fa-plus-circle'></i>
                Add new user
              </button>
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
                          <th>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </th>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ''}</td>
                          <td>
                            <span
                              title='Edit'
                              className='edit'
                              onClick={() => handleEditUser(item)}
                            >
                              <i className='fa fa-pencil-square'></i>
                            </span>
                            <span
                              title='Delete'
                              className='delete'
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className='fa fa-trash'></i>
                            </span>
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
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
      <ModalUser
        isShowModalUser={isShowModalUser}
        onHide={onHideModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
};
export default Users;
