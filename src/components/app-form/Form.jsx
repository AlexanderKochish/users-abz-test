import React, { useState } from "react";
import uploadImg from "../../assets/5007170.png";
import { useEffect } from "react";
import Button from "../UI/Button";
import { AppService } from "../../service";
import PositionsInputs from "./PositionsInputs";

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

  const createUser = async (e) => {
    e.preventDefault()
    const userForm = e.target;
    const formData = new FormData(userForm);
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": "Bearer " + token
      }, 
    });
    if(res.ok){
      alert("New User Created")
    }else{
      alert("Pleace add to all fields on inputs")
    }
    userForm.querySelectorAll('input','input[type=radio]')
    .forEach( el => {
        if(el.value) el.value = '';
        if(el.checked) el.checked = false;
      })
  };

  useEffect(() => {
    getTokenAndPositions()
  }, []);

  return (
    <div className="w-full grid place-items-center pt-2 pb-10">
      <h2 className="text-3xl sm:text-4xl text-center font-semibold my-5">Working with POST request</h2>

      <form
        onSubmit={createUser}
        className="flex flex-col items-start space-y-2 bg-white rounded-lg shadow-lg p-5 w-72 sm:w-[350px]"
      >
        <label className="font-semibold">
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
        />
        <label className="font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
        />
        <label className="font-semibold">
          Phone
        </label>
        <input
          type="phone"
          name="phone"
          placeholder="Your Phone"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
        />
          <PositionsInputs positions={positions}/>
        <label
          htmlFor="img"
          className="flex items-center cursor-pointer bg-blue-300 w-full hover:bg-blue-400 duration-200"
        >
          <img className="w-10 h-10 mr-5" src={uploadImg} alt="img" />
          <strong>Upload Your Photo</strong>
        </label>
        <input id="img" name="photo" type="file" className="hidden" />
          <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default Form;
