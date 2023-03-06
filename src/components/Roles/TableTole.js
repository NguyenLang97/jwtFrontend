import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import { fetchAllRoles, deleteRoles } from '../../service/roleService';

const TableRole = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    fetchListRoles() {
      getAllRoles();
    }
  }));

  const [listRoles, setListRoles] = useState([]);
  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };
  const handleDeleteRoles = async (roles) => {
    let data = await deleteRoles(roles);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    }
  };
  return (
    <>
      <table className='table table-hover table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Url</th>
            <th scope='col'>Description</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>
                    <td>
                      <span
                        title='Delete'
                        className='delete'
                        onClick={() => handleDeleteRoles(item)}
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
              <td colSpan={4}>Not found roles</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
});
export default TableRole;
