/**
 * Copyright 2024 Allison Berkowitz and Andrew Hadden
 * Licensed under the MIT License. See the LICENSE.txt file in the project root for full license information.
 */

// Component: TenBillsTable.js
// Hamilton College Fall '24 Thesis
// Ally Berkowitz and Andrew Hadden
// Description: Displays the top 10 most recently updated bills for the main page in a table.
// Properties passed:
// - data: Array of bill objects used for displaying all the bill data.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TenBillsTable.css'; 

const Display10BillsTable = ({ data }) => {
    const navigate = useNavigate();

    // Check if data is still loading
    const isLoading = !data || data.length === 0;

    // Sort function compares actionDate as Date values in js to arrange in newest to oldest order
    // Note that ...data creates a shallow copy of the array to avoid editing the original
    const sortedData = [...data].sort((a, b) =>  
        new Date(b.bill.actionDate) - new Date(a.bill.actionDate)
    );

    const handleRowClick = (id) => {
        navigate(`/bill/${id}`);
    };

    return (
        <div className="table-container">
            {isLoading ? (
                    <p className="loading-message">Loading data...</p>
                ) : (
                <table className="bill-table">
                    <thead>
                        <tr>
                            <th>Bill</th>
                            <th>Title</th>
                            <th>Congress Year</th>
                            <th>Action</th>
                            <th>Action Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* We want to show only the top 10 most recent bills in our table */}
                        {sortedData.slice(0, 10).map((item) => (
                            <tr 
                                key={item._id} 
                                className="clickable-row" 
                                onClick={() => handleRowClick(item._id)}
                            >
                                <td>{item.bill.bill.type}.{item.bill.bill.number}</td>
                                <td>{item.bill.bill.title}</td>
                                <td>{item.bill.bill.congress}</td>
                                <td>{item.bill.actionDesc}</td>
                                <td>{item.bill.actionDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Display10BillsTable;