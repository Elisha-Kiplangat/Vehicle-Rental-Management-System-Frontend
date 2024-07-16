import { useState, useRef, useEffect } from 'react';
import { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } from '../../features/auth/AuthSlice';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  profilePicture: string;
}

const Profile = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  // const { data: user, error, isLoading } = useGetUserQuery(Number(userId));
  const pollingInterval = 10000;
  const { data: user, error, isLoading } = useGetUserQuery(Number(userId), { pollingInterval });
  
  const [updateUser] = useUpdateUserMutation(Number(userId));
  const [deleteUser] = useDeleteUserMutation(Number(userId));

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setProfile({
        id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        contact_phone: user.contact_phone,
        address: user.address,
        profilePicture: 'https://via.placeholder.com/150',
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile(prevProfile => prevProfile ? { ...prevProfile, [name]: value } : null);
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prevProfile => prevProfile ? { ...prevProfile, profilePicture: event.target?.result as string } : null);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (profile) {
      try {
        await updateUser(profile).unwrap();
        setEditMode(false);
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error('Failed to update profile.');
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(Number(userId)).unwrap();
      toast.success('Sad to see you go :) Account deleted successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account.');
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (error) return <p>Error loading profile</p>;

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="flex flex-col md:flex-row items-center">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-3/4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">
              Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={profile?.full_name || ''}
              onChange={handleChange}
              disabled={!editMode}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                !editMode ? 'bg-gray-100' : ''
              }`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile?.email || ''}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">
              Phone
            </label>
            <input
              type="text"
              id="contact_phone"
              name="contact_phone"
              value={profile?.contact_phone || ''}
              onChange={handleChange}
              disabled={!editMode}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                !editMode ? 'bg-gray-100' : ''
              }`}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profile?.address || ''}
              onChange={handleChange}
              disabled={!editMode}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                !editMode ? 'bg-gray-100' : ''
              }`}
            />
          </div>
          {editMode ? (
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
          )}
        </form>
        <div className="relative ml-0 md:ml-8 mt-4 md:mt-0">
          <img
            src={profile?.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-md"
          />
          {editMode && (
            <button
              type="button"
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-2 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232a3 3 0 114.243 4.243L7.5 21.5 3 22l.5-4.5L15.232 5.232z"
                />
              </svg>
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
