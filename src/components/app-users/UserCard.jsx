import { useEffect, useState } from "react";
import { AppService } from "../../service";

const UserCard = ({users, setUser, setActiveMod, activeMod }) => {
  const appService = new AppService()

  const getUserById = async(id) => {
    const {user} = await appService.serviceFetch(`users/${id}`)
    setUser(user)
    setActiveMod(!activeMod)
  }

  return (
    <>
      {users.map((user) => (
        <li
          key={user.id}
          onClick={() => getUserById(user.id)}
          className="bg-white shadow-md rounded-lg p-2 flex flex-col m-2 items-center justify-around w-60 sm:w-80 min-h-40 overflow-hidden"
        >
          <img
            className="w-16 h-116 rounded-[50%]"
            src={`${import.meta.env.VITE_BASE_URL}${user.photo}`}
            alt="avatar"
          />
          <span>{user.name}</span>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.position_user}</p>
        </li>
      ))}
    </>
  );
};

export default UserCard;
