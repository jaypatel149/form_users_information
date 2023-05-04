import React, { useState,useEffect } from "react";
import "./Table.css";

const Table = ({ tableData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);

  // Update filteredData whenever tableData, sortOrder or searchTerm change
  useEffect(() => {
    // Sort the user data by date of birth
    const sortedData = tableData.sort((a, b) => {
      const dateA = new Date(a.dateOfBirth);
      const dateB = new Date(b.dateOfBirth);

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    // Filter the user data by name
    const filteredData = sortedData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredData);
    setCurrentPage(1);
  }, [tableData, sortOrder, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSortOrderChange = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={handleSortOrderChange}>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>
              Date of Birth
              <button onClick={handleSortOrderChange}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(startIndex, endIndex).map((user) => (
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
        <button
          className="pre"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <span className="count">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="next"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
