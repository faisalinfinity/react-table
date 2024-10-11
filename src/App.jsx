import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./styles/App.css"
import { apiUrl, ITEMS_PER_PAGE } from "../constants/constants";
import UserDetails from "./components/UserDetails";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import TableLayout from "./components/TableLayout";
import Loader from "./components/Loader";

export default function ModernUserTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}?limit=100`);
        setData(response.data.users);
      } catch (error) {
        setError("Failed to fetch user data.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered data based on search input
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    const startsWithSearchTerm = data.filter(
      (user) =>
        typeof user.firstName === "string" &&
        user.firstName.toLowerCase().startsWith(lowerSearchTerm)
    );

    const containsSearchTerm = data.filter(
      (user) =>
        typeof user.firstName === "string" &&
        !user.firstName.toLowerCase().startsWith(lowerSearchTerm) &&
        user.firstName.toLowerCase().includes(lowerSearchTerm)
    );

    return [...startsWithSearchTerm, ...containsSearchTerm];
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Pagination logic
  const visibleData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to page 1 on new search
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Display loading state
  if (isLoading) {
    return <Loader/>;
  }

  // Display error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1>User Directory</h1>
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />

      {filteredData.length === 0 ? (
        <h2 className="no-results">No matching users found</h2>
      ) : (
        <>
          <TableLayout headers={["ID", "Name", "Age", "Email", "Role"]}>
            {visibleData.map((user) => (
              <UserDetails {...user} key={user.id} />
            ))}
          </TableLayout>
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
