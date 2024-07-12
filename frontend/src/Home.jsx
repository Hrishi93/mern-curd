import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import './form.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    mail: '',
    password: '',
  });

  useEffect(() => {
    // Fetch user data from backend
    axios.get('http://localhost:5001/getusers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5001/update/${currentUser._id}`, currentUser)
      .then(response => {
        setUsers(users.map(user => (user._id === currentUser._id ? response.data : user)));
        setIsEditing(false);
        setCurrentUser({
          _id: '',
          name: '',
          mail: '',
          password: '',
        });
      })
      .catch(error => {
        console.error('There was an error updating the user data!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/delete/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  const handleCreateUser = () => {
    axios.post('http://localhost:5001/createuser', currentUser)
      .then(response => {
        setUsers([...users, response.data]);
        setCurrentUser({
          name: '',
          mail: '',
          password: '',
        });
      })
      .catch(error => {
        console.error('There was an error creating the user!', error);
      });
  };

  return (
     <div>
      <div className="form-container">
        <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={currentUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mail:</label>
          <input
            type="email"
            name="mail"
            value={currentUser.mail}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={currentUser.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          {isEditing ? (
            <div>
              <button type="button" onClick={handleUpdate}>Update</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button type="button" onClick={handleCreateUser}>Create</button>
          )}
        </div>
      </div>
      <h2>User Data</h2>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Mail</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.mail}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
