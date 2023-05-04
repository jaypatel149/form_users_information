import React from "react";
import "./Table.css";

const Table = ({ tableData }) => {
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by name"
        // onChange={(e) => onSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th >Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateOfBirth}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="pre" >
          Prev
        </button>
        <span className="count">Page 1 of 5</span>
        <button className="next">
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
