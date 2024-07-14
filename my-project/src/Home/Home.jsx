import React, { useState, useEffect } from 'react'; // Import React and hooks for state and effect management.
import axios from 'axios'; // Import Axios for making HTTP requests.

const Home = () => {
    const [jobs, setJobs] = useState([]); // State for storing job data.
    const [page, setPage] = useState(1); // State for the current page number.
    const [totalPages, setTotalPages] = useState(1); // State for the total number of pages.
    const [sortField, setSortField] = useState('jobName'); // State for the field to sort by.
    const [sortOrder, setSortOrder] = useState('asc'); // State for the sort order.
    const [filterField, setFilterField] = useState(''); 
    const [filterValue, setFilterValue] = useState('');

    const API_URL = 'http://localhost:3000/job'; // Set the base URL for the API.

    useEffect(() => {
        fetchJobs(); // Fetch jobs when dependencies change.
    }, [page, sortField, sortOrder, filterField, filterValue]); // Dependencies to trigger useEffect.

    const fetchJobs = async () => { // Function to fetch jobs from the API.
        try {
            const response = await axios.get(API_URL, {
                params: {
                    page, // Current page number.
                    limit: 10, // Number of jobs per page.
                    sortField, // Field to sort by.
                    sortOrder, // Order to sort by (asc or desc).
                    filterField, // Field to filter by.
                    filterValue // Value to filter by.
                }
            });
            setJobs(response.data.jobs); // Set the fetched jobs to state.
            setTotalPages(response.data.totalPages); // Set the total number of pages.
        } catch (error) {
            console.error('Error fetching jobs:', error); // Log errors if any.
        }
    };

    const handleSort = (field) => { // Function to handle sorting.
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order.
        setSortField(field); // Set the sort field.
        setSortOrder(order); // Set the sort order.
    };

    const handleFilterChange = (field, value) => { // Function to handle filter changes.
        setFilterField(field); // Set the filter field.
        setFilterValue(value); // Set the filter value.
    };

    return (
        <div>
            <h1>Job Management</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('jobName')}>Job Name</th> {/* Sort by job name */}
                        <th onClick={() => handleSort('jobDetails')}>Job Details</th> {/* Sort by job details */}
                        <th onClick={() => handleSort('category')}>Category</th> {/* Sort by category */}
                        <th onClick={() => handleSort('salary')}>Salary</th> {/* Sort by salary */}
                        <th onClick={() => handleSort('positions')}>Positions</th> {/* Sort by positions */}
                    </tr>
                    <tr>
                        <th>
                            <input type="radio" onChange={(e) => handleFilterChange('jobName', e.target.value)} /> {/* Filter by job name */}
                        </th>
                        <th>
                            <input type="radio" onChange={(e) => handleFilterChange('jobDetails', e.target.value)} /> {/* Filter by job details */}
                        </th>
                        <th>
                            <input type="radio" onChange={(e) => handleFilterChange('category', e.target.value)} /> {/* Filter by category */}
                        </th>
                        <th>
                            <input type="radio" onChange={(e) => handleFilterChange('salary', e.target.value)} /> 1200
                        </th>
                        <th>
                            <input type="radio" onChange={(e) => handleFilterChange('positions', e.target.value)} /> {/* Filter by positions */}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => ( // Map over jobs to display each job in a table row.
                        <tr key={job._id}>
                            <td>{job.jobName}</td>
                            <td>{job.jobDetails}</td>
                            <td>{job.category}</td>
                            <td>{job.salary}</td>
                            <td>{job.positions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button> {/* Previous page button */}
                <span>Page {page} of {totalPages}</span> {/* Display current page and total pages */}
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button> {/* Next page button */}
            </div>
        </div>
    );
};

export default Home; // Export the component.
