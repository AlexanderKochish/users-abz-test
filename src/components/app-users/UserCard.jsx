import { useDispatch, useSelector } from "react-redux";
import { getUserById, setActiveModal } from "../../store/slices/userSlice";

const UserCard = ({user}) => {
  const { activeModal } = useSelector((state) => state.user) 
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(getUserById(id))
    dispatch(setActiveModal(!activeModal))
  }
  
  return (
    <li
      onClick={() => handleClick(user.id)}
      className="bg-white shadow-md rounded-lg p-2 flex flex-col m-2 items-center justify-around w-60 sm:w-80 min-h-40 overflow-hidden hover:bg-yellow-200 duration-200 cursor-pointer"
    >
      <img
        className="w-16 h-16 rounded-[50%]"
        src={`${import.meta.env.VITE_BASE_URL}${user.photo}`}
        alt="avatar"
      />
      <span>{user.name}</span>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.position_user}</p>
    </li>
  );
};

export default UserCard;
