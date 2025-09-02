import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";



const Admin = () => {
  const [users, setUsers] = useState([]);
  const [admin,setAdmin]=useState(false);
  const sessionId=sessionStorage.getItem("login");
  const sessionAdmin=sessionStorage.getItem("admin");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin");
        if (res) {
          setUsers(res.data);
        } else {
          console.log("Cannot fetch the user");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser()
  }, [admin]);
  const makeAdmin= async(id)=>{
    try{
    const result=axios.post("http://localhost:3000/makeAdmin",{id:id})
    console.log(result.data)
    setAdmin(!admin)
    }
    catch(e){
        console.log(e)
    }
  }
  async function removeAdmin(id){
    try{
    const result=axios.post("http://localhost:3000/removeAdmin",{id:id})
    console.log(result.data);
    setAdmin(!admin)
    }
    catch(e){
        console.log(e);
    }
    
  }
if(sessionAdmin=="false"){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full mx-4">
          <div className="text-center">
            {/* Simple X icon using text */}
            <div className="text-5xl text-red-500 mb-4">⚠️</div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
}
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Panel
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage user roles and permissions
                </p>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) =>user._id!=sessionId && (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-800 font-medium text-lg">
                                {user.fullname[0]?.toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.fullname}
                              </div>
                              <div className="text-sm text-gray-500">
                                Joined{" "}
                                {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.isAdmin
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.isAdmin ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.isAdmin?(<button onClick={()=>removeAdmin(user._id)}
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Remove Admin
                            </button>):(
                            <button onClick={()=>makeAdmin(user._id)}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              Make Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
