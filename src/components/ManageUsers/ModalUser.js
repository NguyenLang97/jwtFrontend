import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createNewUser, fetchGroup } from '../../service/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) => {
  const defaultUserData = {
    email: '',
    phone: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    group: ''
  };

  const validInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [userGroups, setUserGroups] = useState([]);
  const [validInputs, setValidInput] = useState(validInputDefault);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroups(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInput = () => {
    // create user
    setValidInput(validInputDefault);
    const arr = ['email', 'phone', 'password', 'group'];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[arr[i]] = false;
        setValidInput(_validInputs);

        toast.error(`Empty input ${[arr[i]]}`);
        check = false;
        break;
      }
      return check;
    }
  };

  const handleConfirmUser = async () => {
    let check = checkValidateInput();
    if (check) {
      let res = await createNewUser({
        ...userData,
        groupId: userData['group']
      });

      if (res.data && res.data.EC === 0) {
        props.onHide();
        let groups = res.data.DT;
        setUserData({ ...defaultUserData, group: userGroups[0].id });
      } else {
        toast.error('Error create user ...');
      }
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  return (
    <>
      <Modal
        show={props.isShowModalUser}
        size='lg'
        centered
        className='modal-user'
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-center'>
            <span>{props.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='content-body row'>
            <div className='col-12 col-sm-6 form-group'>
              <label htmlFor='email'>
                Email address (<span className='red'>*</span>):
              </label>
              <input
                type='text'
                className={
                  validInputs.email ? 'form-control' : 'form-control is-invalid'
                }
                id='email'
                value={userData.email}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, 'email')
                }
              />
            </div>
            <div className='col-12 col-sm-6 form-group'>
              <label htmlFor='phone'>
                Phone number (<span className='red'>*</span>):
              </label>
              <input
                type='text'
                className={
                  validInputs.phone ? 'form-control' : 'form-control is-invalid'
                }
                id='phone'
                value={userData.phone}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, 'phone')
                }
              />
            </div>
            <div className='col-12 col-sm-6 form-group'>
              <label htmlFor='username'>Username :</label>
              <input
                type='text'
                className='form-control'
                id='username'
                value={userData.username}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, 'username')
                }
              />
            </div>
            <div className='col-12 col-sm-6 form-group'>
              <label htmlFor='password'>
                Password (<span className='red'>*</span>):
              </label>
              <input
                type='password'
                className={
                  validInputs.password
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                id='password'
                value={userData.password}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, 'password')
                }
              />
            </div>
            <div className='col-12 col-sm-12 form-group'>
              <label htmlFor='address'>Address :</label>
              <input
                type='text'
                className='form-control'
                id='address'
                value={userData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, 'address')
                }
              />
            </div>
            <div className='col-12 col-sm-6 form-group'>
              <label htmlFor='gender'>Gender :</label>
              <select
                className='form-select'
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, 'sex')
                }
              >
                <option defaultValue value='Male'>
                  Male
                </option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div className='col-12 col-sm-6 form-group'>
              <label htmlFor='password'>
                Group (<span className='red'>*</span>):
              </label>
              <select
                className={
                  validInputs.group ? 'form-select' : 'form-select is-invalid'
                }
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, 'group')
                }
              >
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.onHide}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleConfirmUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
