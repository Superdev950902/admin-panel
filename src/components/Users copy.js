import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nav } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import InvenUserTab from "./InvenUserTab";
import '../assets/css/style.css';
import '../App.css';
import { BACKEND_URL } from "../config.js";
import Table from "react-bootstrap/Table";
import { BsPerson } from "react-icons/bs";

const UserUI = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [storeItems, setStoreItems] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(24);
    const [totalCount, setTotalCount] = useState(0);
    const [sort, setSort] = useState('NL');
    const [activeTabs, setActiveTabs] = useState(['all']);
    const fetchData = async () => {
        setLoading(true);
        try {
            const params = {
                page: pageNum,
                size: pageSize,
                sort: sort,
                tabs: activeTabs.join(',') // Send tabs as comma-separated string
            };

            const response = await fetch(BACKEND_URL + '/api/users/admin/getUsers',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        page: pageNum,
                        size: pageSize,
                        sort: sort,
                        tabs: activeTabs.join(',')
                    })
                }
            );
            const result = await response.json();
            console.log(result);
            setUsers(result.users);
            setTotalCount(result.totalCount);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error (e.g., display error message)
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNum, pageSize, sort, activeTabs]);

    const handlePageClick = (event) => {
        setStoreItems([]);
        setPageNum(event.selected);
    };
    const handleUpdateTabs = (tabs) => {
        setTotalCount(0);
        setPageNum(0);
        setActiveTabs(tabs);
    };
    return (
        <div className="main-container">
            <div className="welcome-logo-section">
                <img
                    src="/assets/icons/logo_text.png" // Replace with your logo path
                    alt="Justenant Logo"
                    style={{ height: '80px', marginRight: '10px' }}
                />
            </div>
            <InvenUserTab selectedTabs={activeTabs} handleUpdateTabs={handleUpdateTabs} />
            <div className='row'>
                <div className='col-md-9'>
                    <div className='pagination-div mt-3 ms-2' >
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={parseInt((totalCount - 1) / pageSize) + 1}
                            previousLabel="< prev"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
                <div className='col-md-3 text-right'>
                    <select className='mt-3' style={{ maxWidth: '200px' }} value={sort} onChange={(e) => { setSort(e.target.value) }}>
                        <option value='NL'>Newest Listing</option>
                        <option value='OL'>Oldest Listing</option>
                    </select>
                </div>
                {loading ? (
                    <div className='text-center mt-5'>Loading...</div>
                ) : ( // Wrap the entire else part in parentheses
                    users.length === 0 ? (
                        <div className='text-center mt-5'>No User</div>
                    ) : (
                        <div style={{ margin: '20px' }}>
                            <Table striped hover bordered responsive="sm">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Phone Number</th>
                                        <th>Profile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.status}</td>
                                            <td>{user.phone_number}</td>
                                            <td>{user.profile}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            
                        </div>
                    )
                )}

            </div>
        </div >
    );
};

export default UserUI;
