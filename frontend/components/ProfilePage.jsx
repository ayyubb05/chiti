import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage({ profileData }) {
  return (
    <div>
      <div className="px-2 py-1 bg-green-400">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">PROFILE</h2>

          <div className="flex space-x-2"> 
            <button
              className="w-10 h-8 bg-green-400 hover:bg-green-500 rounded-full flex 
                items-center justify-center text-white"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center p-2">
        {/* Profile Card */}
        <div className="w-full max-w-md bg-green-800 shadow-lg rounded-lg p-6 text-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-green-900 border-2 border-white rounded-full mx-auto mb-4"></div>

          {/* User Info */}
          <h2 className="text-xl font-semibold">{profileData.full_name}</h2>
          <p className="text-md text-white">@{profileData.username}</p>
          {profileData.phone_number && (
            <p className="text-white">{profileData.phone_number}</p>
          )}
        </div>

        {/* Menu Section */}
        <div className="w-full max-w-md mt-6">
          <div className="bg-green-800 shadow-md rounded-lg p-4 flex flex-col gap-3">
            <button className="w-full py-3 bg-green-500 rounded hover:bg-green-600">My Groups</button>
            <button className="w-full py-3 bg-green-500 rounded hover:bg-green-600">Financial Management</button>
            <button className="w-full py-3 bg-green-500 rounded hover:bg-green-600">Account Settings</button>
          </div>
        </div>

      </div>
    </div>
  );
}
