import React from 'react';
import './Table.css';
import { FiInfo, FiList, FiCheck, FiTrash2 } from 'react-icons/fi';

const ActionButton = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`action-btn ${className}`}>
    {children}
  </button>
);

const Table = ({ data, columns, totalEntries = 109, onActionClick, showActions = true, showPagination = true }) => {
  if (!data || data.length === 0 || !columns || columns.length === 0) {
    return <p>No data available to display.</p>;
  }

  const handleAction = (action, rowItem) => {
    if (onActionClick) {
      onActionClick(action, rowItem);
    } else {
      console.log(`${action}:`, rowItem);
    }
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            {showActions && <th>Option</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((rowItem, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.key}`}>
                  {column.render ? column.render(rowItem) : rowItem[column.key]}
                </td>
              ))}
              {showActions && (
                <td className="action-cell">
                  <ActionButton 
                    onClick={() => handleAction('info', rowItem)} 
                    className="btn-info"
                    title="View Info"
                  >
                    <FiInfo />
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleAction('list', rowItem)} 
                    className="btn-list"
                    title="View List"
                  >
                    <FiList />
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleAction('check', rowItem)} 
                    className="btn-check"
                    title="Approve"
                  >
                    <FiCheck />
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleAction('delete', rowItem)} 
                    className="btn-delete"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </ActionButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && (
        <div className="table-footer">
          <span>{data.length} of {totalEntries} entries</span>
          <div className="pagination-controls">
            <button className='page-btn'>&lt;</button>
            <button className='page-btn active'>1</button>
            <button className='page-btn'>2</button>
            <button className='page-btn'>3</button>
            <button className='page-btn'>4</button>
            <button className='page-btn'>5</button>
            <button className='page-btn'>...</button>
            <button className='page-btn'>11</button>
            <button className='page-btn'>&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
