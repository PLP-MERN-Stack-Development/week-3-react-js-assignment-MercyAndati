import React, { useState, useEffect } from "react";
import { fetchPosts, fetchUsers } from "./jsonPlaceholder";
import Button from "@/components/Button";
import { Card } from "@/components/ui/card";

const ApiData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataType, setDataType] = useState('posts');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = dataType === 'posts' 
          ? await fetchPosts() 
          : await fetchUsers();
        setData(result);
        // Reset search term when changing data type
        setSearchTerm("");
        setFilteredData(result);
        setCurrentPage(1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        if (dataType === 'posts') {
          return (
            item.title.toLowerCase().includes(searchLower) ||
            item.body.toLowerCase().includes(searchLower)
          );
        } else {
          return (
            item.name.toLowerCase().includes(searchLower) ||
            item.email.toLowerCase().includes(searchLower)
          );
        }
      });
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleTabChange = (type) => {
    setDataType(type);
    setSearchTerm(""); // Clear search when changing tabs
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-2">
          <Button 
            variant={dataType === 'posts' ? 'primary' : 'secondary'}
            onClick={() => handleTabChange('posts')}
          >
            Posts
          </Button>
          <Button 
            variant={dataType === 'users' ? 'primary' : 'secondary'}
            onClick={() => handleTabChange('users')}
          >
            Users
          </Button>
        </div>
        
        <input
          type="text"
          placeholder={`Search ${dataType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4 mb-6">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <Card key={item.id} className="p-4">
              <h3 className="font-bold">
                {dataType === 'posts' ? item.title : item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {dataType === 'posts' ? item.body : item.email}
              </p>
            </Card>
          ))
        ) : (
          !loading && (
            <div className="text-center p-8">
              <p className="text-gray-500">
                {searchTerm
                  ? `No ${dataType} found matching "${searchTerm}"`
                  : `No ${dataType} available`}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )
        )}
      </div>

      {filteredData.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApiData;