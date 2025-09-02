import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import Navbar from "../components/Navbar";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
//   const userId = sessionStorage.getItem("login");
    const {id}=useParams()
    const userId=id

  useEffect(() => {
    if (!userId) {
      navigate("/landingPage");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/getUser/${userId}`);
        setUser(userResponse.data);
        
        const postsResponse = await axios.get(`http://localhost:3000/getUserPosts/${userId}`);
        setUserPosts(postsResponse.data.reverse());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        profilePicture: e.target.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullname', formData.fullname);
      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      await axios.post(
        `http://localhost:3000/updateUser/${userId}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Refresh user data
      const userResponse = await axios.get(`http://localhost:3000/getUser/${userId}`);
      setUser(userResponse.data);
      
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Profile Info Section */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
              {user.profilePicture ? (
                <img 
                  src={`http://localhost:3000/${user.profilePicture}`}
                  alt={user.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-indigo-600">
                    {user.fullname[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.fullname}</h1>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">{userPosts.length}</span>
                  <span className="text-gray-500">Stories</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="text-gray-500">Joined {format(user.createdAt)}</div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-6">Travel Stories</h2>

          {/* Content Section */}
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {userPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/${post._id}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row h-[250px]">
                    <div className="w-full md:w-[350px] h-[250px] flex-shrink-0">
                      <img
                        src={`http://localhost:3000/${post.photo}`}
                        alt={post.title}
                        className="w-[350px] h-[250px] object-cover"
                        style={{ width: '350px', height: '250px' }}
                      />
                    </div>
                    <div className="flex-1 p-6 overflow-hidden">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          {post.category}
                        </span>
                        <span>•</span>
                        <span>{format(post.createdAt)}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.shortDescription}
                      </p>
                      <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
