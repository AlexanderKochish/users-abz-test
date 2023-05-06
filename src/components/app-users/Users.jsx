import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { AppService } from "../../service";
import UserCard from "./UserCard";
import Spinner from "../UI/Spinner";

const Users = ({setUser, setActiveMod, activeMod }) => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [load,setLoad] = useState(true)
  const appService = new AppService()

  const getAllUsers = async () => {
    setLoad(true)
    const data = await appService.serviceFetch('users',`?page=${page}&count=6`)
    setLoad(false)
    setUsers([...users,...data.users.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))]) 
    setPage(data.page);
    setTotalPages(data.total_pages);
  };

  const showMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
    return;
  };

  useEffect(() => {
    getAllUsers();
  }, [page]);

  const hiddenButton = page < totalPages ? "" : "hidden";
  const preloading = load? <Spinner/> : null;

  return (
    <div className="w-full text-center grid place-items-center px-2 sm:px-0 pt-10 pb-7">
      <h2 className="text-4xl font-semibold my-5">Working with GET request</h2>
      <ul className="max-w-[740px] grid grid-cols-1 sm:grid-cols-2 place-items-center">
        <UserCard users={users} setUser={setUser} setActiveMod={setActiveMod} activeMod={activeMod}/>
      </ul>
      {preloading}
      <div className={hiddenButton}>
      <Button handler={showMore}>
        Show more
      </Button>
      </div>
    </div>
  );
};

export default Users;
