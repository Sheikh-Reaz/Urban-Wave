import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

const SUPER_ADMIN_EMAIL = "skreazuddin87@gmail.com";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState(""); // buyer/manager/admin
  const limit = 10;
useDocumentTitle("Manage Users");
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users", searchText, page, roleFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${searchText}&page=${page}&limit=${limit}&role=${roleFilter}`
      );
      return res.data; // { users: [...], totalUsers: n }
    },
    keepPreviousData: true,
  });

  const handleRoleChange = async (user, newRole) => {
    try {
      await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.userName} role updated to ${newRole}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({ icon: "error", text: err.response?.data?.message });
    }
  };

  const handleSuspend = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: `Suspend ${user.userName}`,
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Reason">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Feedback">',
      focusConfirm: false,
      preConfirm: () => {
        const reason = document.getElementById("swal-input1").value.trim();
        const feedback = document.getElementById("swal-input2").value.trim();
        if (!reason || !feedback) {
          Swal.showValidationMessage("Reason and feedback cannot be empty!");
          return false;
        }
        return { reason, feedback };
      },
    });

    if (!formValues) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        status: "suspended",
        suspendReason: formValues.reason,
        suspendFeedback: formValues.feedback,
      });
      refetch();
      Swal.fire("Suspended!", `${user.userName} has been suspended.`, "success");
    } catch (err) {
      Swal.fire({ icon: "error", text: err.response?.data?.message });
    }
  };

  const handleApprove = async (user) => {
    try {
      await axiosSecure.patch(`/users/${user._id}/role`, { status: "approved" });
      refetch();
      Swal.fire("Approved!", `${user.userName} is now approved.`, "success");
    } catch (err) {
      Swal.fire({ icon: "error", text: err.response?.data?.message });
    }
  };

  const totalPages = data ? Math.ceil(data.totalUsers / limit) : 0;

  const statusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-200 text-green-800";
      case "suspended":
        return "bg-red-200 text-red-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl mb-4">Manage Users ({data?.totalUsers || 0})</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search User"
          className="input mb-2 w-full max-w-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Sort buttons */}
        <div className="btn-group">
          {["", "buyer", "manager", "admin"].map((role, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${roleFilter === role ? "btn-primary" : ""}`}
              onClick={() => setRoleFilter(role)}
            >
              {role === "" ? "All" : role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : data?.users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              data.users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{(page - 1) * limit + idx + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`px-2 py-1 rounded ${statusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    {/* Admin Role Buttons */}
                    {user.role === "admin" ? (
                      <div className="relative group">
                        <button
                          className={`btn btn-sm ${
                            user.email === SUPER_ADMIN_EMAIL
                              ? "bg-yellow-500 cursor-not-allowed"
                              : "bg-red-500"
                          }`}
                          onClick={() => handleRoleChange(user, "buyer")}
                          disabled={user.email === SUPER_ADMIN_EMAIL}
                        >
                          <FiShieldOff />
                        </button>
                        {user.email === SUPER_ADMIN_EMAIL && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-white text-black shadow-lg border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap flex items-center gap-1">
                            <span className="text-yellow-500">⚠️</span> Cannot remove Super Admin
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {/* Make Admin */}
                        <div className="relative group">
                          <button
                            className="btn btn-sm bg-primary"
                            onClick={() => handleRoleChange(user, "admin")}
                          >
                            <FaUserShield />
                          </button>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-white text-black shadow-lg border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Make Admin
                          </div>
                        </div>

                        {/* Conditional Manager/Buyer */}
                        {user.role === "buyer" ? (
                          <div className="relative group">
                            <button
                              className="btn btn-sm bg-blue-500"
                              onClick={() => handleRoleChange(user, "manager")}
                            >
                              Manager
                            </button>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-white text-black shadow-lg border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Make Manager
                            </div>
                          </div>
                        ) : user.role === "manager" ? (
                          <div className="relative group">
                            <button
                              className="btn btn-sm bg-purple-500"
                              onClick={() => handleRoleChange(user, "buyer")}
                            >
                              Buyer
                            </button>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-white text-black shadow-lg border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Make Buyer
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}

                    {/* Status Buttons */}
                    {user.email !== SUPER_ADMIN_EMAIL && (
                      <>
                        {user.status === "approved" ? (
                          <div className="relative group">
                            <button
                              className="btn btn-sm bg-yellow-500"
                              onClick={() => handleSuspend(user)}
                            >
                              Suspend
                            </button>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-white text-black shadow-lg border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Suspend User
                            </div>
                          </div>
                        ) : (
                          <div className="relative group">
                            <button
                              className="btn btn-sm bg-green-500"
                              onClick={() => handleApprove(user)}
                            >
                              Approve
                            </button>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-sm rounded bg-white text-black shadow-lg border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Approve User
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
