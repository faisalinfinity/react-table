import React from "react";

const TableLayout = ({ children, headers }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          {headers && headers.map((header) => <th key={header}>{header}</th>)}
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableLayout;
