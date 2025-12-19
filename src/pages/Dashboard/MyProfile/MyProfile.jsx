import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
 useDocumentTitle("Profile");
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/profile/${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const isSuspended = profile?.status === "suspended";
  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="bg-base-100 rounded-2xl shadow-lg border p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center text-center">
            <img
              src={user?.photoURL || "/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover ring-4 ring-base-200"
            />
            <h2 className="mt-4 text-lg font-semibold">
              {profile?.userName || user?.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-500 break-all">
              {profile?.email}
            </p>

            <span
              className={`mt-3 px-3 py-1 rounded-full text-xs font-medium capitalize
                ${
                  isSuspended
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
            >
              {profile?.status}
            </span>
          </div>

          {/* Info Section */}
          <div className="md:col-span-2 space-y-4">
            <ProfileRow label="User Name" value={profile?.userName} />
            <ProfileRow label="Email" value={profile?.email} />
            <ProfileRow label="Role" value={profile?.role} />
            <ProfileRow
              label="Account Created"
              value={
                profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString()
                  : "N/A"
              }
            />

            {/* Suspend Info */}
            {isSuspended && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <h3 className="text-sm font-semibold text-red-600 mb-2">
                  Suspension Details
                </h3>

                <div className="space-y-2 text-black text-sm">
                  <p>
                    <span className="font-medium">Reason:</span>{" "}
                    {profile?.suspendReason || "Not provided"}
                  </p>
                  <p>
                    <span className="font-medium">Feedback:</span>{" "}
                    {profile?.suspendFeedback || "Not provided"}
                  </p>
                </div>
              </div>
            )}

            {/* Logout */}
            <div className="pt-6">
              <button
                onClick={logOut}
                className="btn btn-error btn-sm rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-right break-all capitalize">
      {value || "N/A"}
    </span>
  </div>
);

export default MyProfile;
