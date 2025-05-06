import React from 'react';
import './ReportsTable.css';

const ReportsTable = ({ reports, onView, onSeenFilterChange, seenFilter, onResolvedFilterChange, resolvedFilter }) => {
  // Format date and time from uploadedAt
  const formatDate = (dateObj) => {
    if (!dateObj) return 'N/A';
    const date = new Date(dateObj);
    return date.toLocaleDateString();
  };

  const formatTime = (dateObj) => {
    if (!dateObj) return 'N/A';
    const date = new Date(dateObj);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="table-container">
      <div className="reports-header">
        <h2>Damage Reports</h2>
        <div className="filter-controls">
          {onSeenFilterChange && (
            <>
              <button 
                className={`filter-button ${seenFilter === 'all' ? 'active' : ''}`}
                onClick={() => onSeenFilterChange('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${seenFilter === 'seen' ? 'active' : ''}`}
                onClick={() => onSeenFilterChange('seen')}
              >
                Seen
              </button>
              <button 
                className={`filter-button ${seenFilter === 'unseen' ? 'active' : ''}`}
                onClick={() => onSeenFilterChange('unseen')}
              >
                Unseen
              </button>
            </>
          )}
          
          {onResolvedFilterChange && (
            <button 
              className={`filter-button ${resolvedFilter === 'resolved' ? 'active' : ''}`}
              onClick={() => onResolvedFilterChange('resolved')}
            >
              Resolved Only
            </button>
          )}
        </div>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Username</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.length > 0 ? (
            reports.map((r) => (
              <tr key={r.id} className="table-row">
                <td>
                  <div className="profile-circle">
                    <div className="profile-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#1a73e8"/>
                      </svg>
                    </div>
                  </div>
                </td>
                <td>{r.userEmail}</td>
                <td>{formatDate(r.uploadedAt)}</td>
                <td>{formatTime(r.uploadedAt)}</td>
                <td>
                  {r.progress === 'Resolved' ? (
                    <span className="status-label resolved">Resolved</span>
                  ) : r.status === 'Seen' ? (
                    <span className="status-label seen">Seen</span>
                  ) : (
                    <span className="status-label unseen">Unseen</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => onView(r.id)}
                    className="view-button"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-reports">No reports found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
