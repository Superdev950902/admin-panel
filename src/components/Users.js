import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaWhatsapp, FaMailBulk } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { BACKEND_URL } from "../config";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortBy, setSortBy] = useState("username"); // Default sorting
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const usersPerPage = 5;
    const fetchData = async () => {
        setLoading(true); // Show loader
        try {
            const response = await fetch(BACKEND_URL + "/api/users/admin/allusers");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    useEffect(() => {
        let filtered = users;
        if (selectedRole !== "all") {
            filtered = filtered.filter((user) => user.role === selectedRole);
        }
        if (searchQuery) {
            filtered = filtered
                .filter((user) =>
                    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
                );
        }
        filtered = [...filtered].sort((a, b) => {
            if (typeof a[sortBy] === "string") {
                return a[sortBy].localeCompare(b[sortBy]);
            } else if (typeof a[sortBy] === "number") {
                return a[sortBy] - b[sortBy];
            } else if (sortBy === "employedDate") {
                return new Date(a[sortBy]) - new Date(b[sortBy]);
            }
            return 0;
        });
        setFilteredUsers(filtered);
        setCurrentPage(0); // Reset pagination when changing filter
    }, [selectedRole, users, searchQuery, sortBy]);

    useEffect(() => {
        // Fetching mock data (Replace with API call if needed)
        fetchData();
    }, []);

    // Pagination Logic
    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
    const displayedUsers = filteredUsers.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

    // Handle Page Change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleUserSelection = (id) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((userId) => userId !== id) // Deselect if already selected
                : [...prevSelected, id] // Select user if not selected
        );
    };

    const setUsersActive = () => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                selectedUsers.includes(user.id) ? { ...user, status: "active" } : user
            )
        );
        setSelectedUsers([]); // Clear selection after update
    };

    // Handle Sort
    const handleSort = (key) => {
        setSortBy(key);
    };

    // Open Edit Modal
    const handleEdit = (user) => {
        setEditUser(user);
        setShowModal(true);
    };

    // Handle Delete User
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {

            fetch(BACKEND_URL + `/api/users/admin/deleteuser/${id}`) // Replace with your actual backend URL
                .then((response) => response.json())
                .then(() => {
                    setUsers(users.filter((user) => user.id !== id));
                })
                .catch((error) => console.error("Error deleting user:", error));
        }
    };

    const handleSetUserActive = async (id) => {
        try {
            const { isConfirmed } = await Swal.fire({
                title: "Change User Status?",
                text: "Are you sure you want to change this user's status?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "Cancel",
            });
            if (isConfirmed) {
                const res = await fetch(BACKEND_URL + `/api/users/admin/useractive/${id}`);
                const data = await res.json();
                if (data.status) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.id === id ? { ...user, status: data.status } : user
                        )
                    );
                    setSelectedUsers(selectedUsers.filter((userId) => userId !== id)); // Remove from selected list
                    setEditUser({...editUser, status:data.status});
                }
            }
        }
        catch (error) {
            console.error("Error updating user status:", error);
            alert("Failed to activate user. Please try again.");
        }

    };

    const handleSelectAll = () => {
        const allUserIds = displayedUsers.map((user) => user.id);
        if (selectedUsers.length === displayedUsers.length) {
            setSelectedUsers([]); // Deselect all if already selected
        } else {
            setSelectedUsers(allUserIds); // Select all users on the page
        }
    };
    return (
        <div className="main-container mt-4">
            <div className="welcome-logo-section">
                <img
                    src="/assets/icons/logo_text.png" // Replace with your logo path
                    alt="Justenant Logo"
                    style={{ height: '80px', marginRight: '10px' }}
                />
            </div>

            <div className="d-flex justify-content-center mb-3">
                {["all", "superadmin", "cmt", "tenant", "LANDLORD", "SERVICE PROVIDER"].map((role) => (
                    <Button
                        key={role}
                        variant={selectedRole === role ? "info" : "custom-btn"}
                        className="mx-2"
                        onClick={() => setSelectedRole(role)}
                    >
                        {role.toLocaleUpperCase()}
                    </Button>
                ))}
            </div>
            {/* Search Bar */}
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="form-control w-50"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary mt-3" onClick={setUsersActive} disabled={selectedUsers.length === 0}>
                    Set Selected Users as Active
                </button>
            </div>

            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th><input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedUsers.length === displayedUsers.length && displayedUsers.length > 0}
                            /></th>
                            <th onClick={() => handleSort("username")} style={{ cursor: "pointer", fontSize: '20px' }}>Member ⬍</th>
                            <th onClick={() => handleSort("role")} style={{ cursor: "pointer", fontSize: '20px' }}>Role ⬍</th>
                            <th onClick={() => handleSort("phone_number")} style={{ cursor: "pointer", fontSize: '20px' }}>Phone ⬍</th>
                            <th onClick={() => handleSort("status")} style={{ cursor: "pointer", fontSize: '20px' }}>Status ⬍</th>
                            <th onClick={() => handleSort("employedDate")} style={{ cursor: "pointer", fontSize: '20px' }}>Created Date ⬍</th>
                            <th style={{ fontSize: '20px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleUserSelection(user.id)}
                                        checked={selectedUsers.includes(user.id)}
                                        disabled={user.role === "superadmin"} // Allow selection only if "pending"
                                    />
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={user.avatar || "/assets/icons/default_profile.png"}
                                            alt={user.username}
                                            className="rounded-circle me-2"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                        <div>
                                            <strong>{user.username}</strong>
                                            <br />
                                            <small className="text-muted">{user.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <strong>{user.role}</strong>
                                </td>
                                <td>
                                    <strong>{user.phone_number}</strong>
                                </td>
                                <td>
                                    <span className={`badge ${user.status === "active" ? "bg-success" : user.status === "inactive" ? "bg-danger" : "bg-secondary"}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <FaEdit
                                        className="text-muted me-3"
                                        style={{ cursor: "pointer", fontSize: '26px' }}
                                        onClick={() => handleEdit(user)}
                                    />
                                    <FaTrash
                                        className="text-danger me-3"
                                        style={{ cursor: "pointer", fontSize: '26px' }}
                                        onClick={() => handleDelete(user.id)}
                                    />
                                    {user.role === "cmt" && (
                                        user.status === "active" ? (
                                            <FaTimesCircle
                                                className="me-3"
                                                style={{ cursor: "pointer", color: "red", fontSize: '26px' }}
                                                onClick={() => handleSetUserActive(user.id)}
                                            />
                                        ) : (

                                            <FaCheckCircle
                                                className="me-3"
                                                style={{ cursor: "pointer", color: "green", fontSize: '26px' }}
                                                onClick={() => handleSetUserActive(user.id)}
                                            />
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center my-3">
                <span>Showing {displayedUsers.length} of {filteredUsers.length} users</span>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Edit User</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    {editUser && (
                        <>
                            <div className="mb-3">
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={editUser.avatar || "/assets/icons/default_profile.png"}
                                        alt={editUser.username}
                                        className="rounded-circle me-2 border-gray-300"
                                        style={{ width: "100px", height: "100px" }}
                                    />

                                    {/* User Info */}
                                    <div className="mt-3">
                                        <strong className="text-lg">{editUser.username}</strong>
                                        <br />
                                        <small className="text-gray-500">{editUser.role === "cmt" ? "Compound Management Team" : editUser.role}</small>
                                    </div>
                                    <div className="mr-4 mt-3">
                                        <FaWhatsapp className="me-3" style={{ cursor: "pointer", fontSize: '26px' }} />
                                        <FaMailBulk className="me-3" style={{ cursor: "pointer", fontSize: '26px' }} />
                                    </div>
                                    {/* Status Badge */}
                                    <div className="mr-4 mt-3">
                                        <span
                                            onClick={() => handleSetUserActive(editUser.id)}
                                            style={{ cursor: "pointer", fontSize: '16px' }}
                                            className={`badge ${editUser.status === "active" ? "bg-success" : editUser.status === "inactive" ? "bg-danger" : "bg-secondary"}`}>
                                            {editUser.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserTable;
