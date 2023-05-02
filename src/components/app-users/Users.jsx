import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { AppService } from "../../service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const appService = new AppService()

  const getAllUsers = async () => {
    const data = await appService.serviceFetch('users',`?page=${page}&count=6`)
    const sortUsers = data.users.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    )
    setUsers([...users, ...sortUsers]);
    setPage(data.page);
    setTotalPages(data.total_pages);
  };

  const showMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
    return;
  };

  useEffect(() => {
    getAllUsers();
  }, [page]);

  const hiddenButton = page < totalPages ? "" : "hidden";

  return (
    <div className="w-full text-center grid place-items-center px-2 sm:px-0 pt-10 pb-7">
      <h2 className="text-4xl font-semibold my-5">Working with GET request</h2>
      <ul className="max-w-[740px] grid grid-cols-1 sm:grid-cols-2 place-items-center">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white shadow-md rounded-lg p-2 flex flex-col m-2 items-center justify-around w-60 sm:w-80 min-h-40 overflow-hidden"
          >
            <img
              className="w-12 h-12 rounded-[50%]"
              src={`${import.meta.env.VITE_BASE_URL}${user.photo}`}
              alt="avatar"
            />
            <span>{user.name}</span>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.position_user}</p>
          </li>
        ))}
      </ul>
      <div className={hiddenButton}>
      <Button handler={showMore}>
        Show more
      </Button>
      </div>
    </div>
  );
};

export default Users;
