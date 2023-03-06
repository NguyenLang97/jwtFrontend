import _ from 'lodash';
import { useState, useRef } from 'react';
import './Roles.scss';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../service/roleService';
import TableRole from './TableTole';

const Roles = () => {
  const childRef = useRef();
  const dataChildsDefault = { url: '', description: '', isValidUrl: true };

  const [listChilds, setListChilds] = useState({
    child1: dataChildsDefault
  });

  const handleOnchangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === 'url') {
      _listChilds[key]['isValidUrl'] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildsDefault;
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).find(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description
      });
    });
    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        childRef.current.fetchListRoles();
      }
    } else {
      toast.error('Input URL must not be empty...');
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]['isValidUrl'] = false;
      setListChilds(_listChilds);
    }
  };
  return (
    <div className='role-container'>
      <div className='container'>
        <div className='adding-roles mt-3'>
          <div className='title-role'>
            <h4>Add a new role...</h4>
          </div>
          <div className='role-parent'>
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className={`row role-child ${key}`} key={`child-${key}`}>
                  <div className='col-5 form-group'>
                    <label htmlFor=''>URL:</label>
                    <input
                      type='text'
                      className={
                        child.isValidUrl
                          ? 'form-control'
                          : 'form-control is-invalid'
                      }
                      value={child.url}
                      onChange={(e) =>
                        handleOnchangeInput('url', e.target.value, key)
                      }
                    />
                  </div>
                  <div className='col-5 form-group'>
                    <label htmlFor=''>URL:</label>
                    <input
                      type='text'
                      className='form-control'
                      value={child.description}
                      onChange={(e) =>
                        handleOnchangeInput('description', e.target.value, key)
                      }
                    />
                  </div>
                  <div className='actions col-2 mt-3 d-flex align-items-center justify-content-center'>
                    <i
                      className='fa fa-plus-circle add'
                      onClick={() => handleAddNewInput()}
                    ></i>
                    {index >= 1 && (
                      <i
                        className='fa fa-trash delete'
                        onClick={() => handleDeleteInput(key)}
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}
            <div className=''>
              <button
                className='btn btn-warning mt-3'
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className='mt-3 table-role'>
          <h4>List Current Roles:</h4>
          <TableRole ref={childRef} />
        </div>
      </div>
    </div>
  );
};

export default Roles;
