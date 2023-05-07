import { useEffect } from "react";
import Button from "../UI/Button";
import UserCard from "./UserCard";
import Spinner from "../UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setPage, usersThunk } from "../../store/slices/usersSlice";

const Users = () => {
  const { users, totalPages, page, loading } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const showMore = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
    return;
  };

  useEffect(() => {
    dispatch(usersThunk(page));
  }, [page]);

  const preloader = loading? <Spinner/> : <View users={users}/>;
  const hiddenButton = page < totalPages ? "" : "hidden";

  return (
    <div className="w-full text-center grid place-items-center px-2 sm:px-0 pt-10 pb-7">
      <h2 className="text-4xl font-semibold my-5">Working with GET request</h2> 
      {preloader}
      <div className={hiddenButton}>
      <Button handler={showMore}>
        Show more
      </Button>
      </div>
    </div>
  );
};


const View = ({users}) => {
  return (
    <ul className="max-w-[740px] grid grid-cols-1 sm:grid-cols-2 place-items-center">
      {users && users.map((user) => (<UserCard key={user.id} user={user} />))}
    </ul>
  )
}

export default Users;
