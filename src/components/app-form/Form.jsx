import React, { useState } from "react";
import uploadImg from "../../assets/5007170.png";
import { useEffect } from "react";
import Button from "../UI/Button";
import { AppService } from "../../service";

const Form = () => {
  const [token, setToken] = useState("");
  const [positions, setPositions] = useState([]);
  const appService = new AppService()

  const getTokenAndPositions = async () => {
    const { token } = await appService.serviceFetch('token')
    const { positions } = await appService.serviceFetch('positions')
    setToken(token)
    setPositions(positions);
  };

  const createUser = async () => {
    await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: new FormData(formUser),
    });
  };

  useEffect(() => {
    getTokenAndPositions()
  }, []);

  return (
    <div className="w-full grid place-items-center pt-2 pb-10">
      <h2 className="text-3xl sm:text-4xl text-center font-semibold my-5">Working with POST request</h2>

      <form
        onSubmit={createUser}
        id="formUser"
        className="flex flex-col items-start space-y-2 bg-white rounded-lg shadow-lg p-5 w-72 sm:w-[350px]"
      >
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
        />
        <label htmlFor="" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
        />
        <label htmlFor="" className="font-semibold">
          Phone
        </label>
        <input
          type="phone"
          name="phone"
          placeholder="Your Phone"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
        />
        <ul>
          {positions.map(({ id, name }) => (
            <li key={id} className="flex items-center">
              <input
                type="radio"
                name="positionId"
                id={name}
                value={id}
                className="mr-4"
              />
              <label htmlFor={name}>{name}</label>
            </li>
          ))}
        </ul>
        <label
          htmlFor="photo"
          className="flex items-center cursor-pointer bg-blue-300 w-full hover:bg-blue-400 duration-200"
        >
          <img className="w-10 h-10 mr-5" src={uploadImg} alt="img" />
          <strong>Upload Your Photo</strong>
        </label>
        <input id="photo" name="photo" type="file" className="hidden" />
          <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default Form;
