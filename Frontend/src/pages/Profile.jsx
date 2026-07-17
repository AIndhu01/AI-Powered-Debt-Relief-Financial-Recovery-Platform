import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setProfile(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) {
    return (
      <div className="p-8">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        My Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl">

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="space-y-4">

          <p>
            <strong>Username:</strong> {profile.username}
          </p>

          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <p>
            <strong>Total Loans:</strong> {profile.total_loans}
          </p>

          <p>
            <strong>Total Debt:</strong> ₹ {profile.total_debt}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;