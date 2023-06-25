// Necessary imports from React and other components
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import photoPlaceholder from "./assets/photo-cover.svg";
import Button from "./Button";

// Component to fetch and display users data
const Team = () => {
  // State variables
  const [usersData, setUsersData] = useState([]); // Hold fetched users data
  const [page, setPage] = useState(1); // Control fetched page
  const [isLoading, setIsLoading] = useState(false); // Control loading status
  const [totalPages, setTotalPages] = useState(0); // Keep track of total available pages

  // Effect hook to fetch users data when page changes
  useEffect(() => {
    // Function to fetch users data
    const fetchUsersData = async () => {
      setIsLoading(true);
      try {
        // Fetching data
        const res = await fetch(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
        );
        const data = await res.json();
        if (data.success) {
          // Setting page and total pages
          setPage(data.page);
          setTotalPages(data.total_pages);
          // Sorting and setting users data
          const sortedUsers = [...usersData, ...data.users].sort(
            (a, b) => b.registration_timestamp - a.registration_timestamp
          );
          setUsersData(sortedUsers);
        }
      } catch (error) {
        console.log("Error", error);
      }
      setIsLoading(false);
    };

    // Call fetchUsersData
    fetchUsersData(page);
  }, [page]); // useEffect dependency array

  // Function to handle 'Show more' button click
  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Component JSX
  return (
    <div id="usersSection" className="mt-20 mx-auto">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-center text-4xl font-bold">
          Working with Get requests
        </h1>
        <div className="py-5 px-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 gap-3 justify-center">
          {usersData.map((user, i) => (
            <div
              id={`user-${user.id}`}
              key={`user-${user.id}-${i}`}
              className="bg-white rounded-lg flex flex-col items-center justify-between p-5 text-center  h-auto overflow-hidden m-1"
            >
              <div className="hidden">{user.registration_timestamp}</div>
              <div className="flex justify-center flex-col items-center">
                <img
                  className="w-[70px] h-[70px] rounded-full"
                  src={user.photo}
                  alt={`${user.name}, ${user.position} at abz.agency`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = photoPlaceholder;
                  }}
                />
                <p
                  data-tooltip-id="user-email"
                  data-tooltip-content={user.name}
                  className="font-bold my-5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[230px]"
                >
                  {user.name}
                </p>
              </div>
              <div className="max-w-[230px]">
                <p id={`position-${user.position_id}`}>{user.position}</p>
                <p
                  data-tooltip-id="user-email"
                  data-tooltip-content={user.email}
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {user.email}
                </p>
                <Tooltip place="top" id="user-email" />
                <Tooltip place="top" id="user-name" />
                <p>{user.phone}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-10">
          {isLoading ? (
            <div className="loading"></div>
          ) : page < totalPages ? (
            <div onClick={handleShowMore}>
              <Button>Show more</Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Team;
