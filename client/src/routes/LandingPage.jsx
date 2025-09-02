import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen ">
        {/* Hero Section */}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pt-[100px] ">
          <div className="bg-white ml-[12rem] py-20 w-[50rem] rounded-2xl shadow-lg">
            <div className="logo-container flex justify-center items-center">
              <img
                src="/llogo.png"
                alt="Company Logo"
                class="logo"
                width="150"
                height="50"
                loading="lazy"/>
                
              
            </div>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Welcome to
                <span className="text-blue-600"> Yatra Diaries</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                “Discover new paths, create memories, and tell your epic story.”
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
