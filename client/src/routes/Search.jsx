import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import Navbar from "../components/Navbar";
import MainCategories from "../components/MainCategories";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/search?q=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);



  if (!query) {
    return (
      <>
        <Navbar />
        <MainCategories />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Next Adventure</h1>
            <p className="text-gray-600">Enter a search term to discover amazing travel stories.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <MainCategories />
      <div className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600">
              Found {searchResults.length} {searchResults.length === 1 ? 'story' : 'stories'}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Results List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-[350px] h-[250px] bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-8 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-600">Try adjusting your search to find what you're looking for.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {searchResults.map((post) => (
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
                    <div className="flex-1 p-6 overflow-auto">
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
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {post.userId?.fullname?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {post.userId?.fullname}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
