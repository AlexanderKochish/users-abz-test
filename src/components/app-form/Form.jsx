import uploadImg from "../../assets/5007170.png";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import PositionsInputs from "./PositionsInputs";
import { useDispatch, useSelector } from "react-redux";
import { positionsThunk } from "../../store/slices/positionsSlice";
import { tokenThunk } from "../../store/slices/tokenSlice";
import { createNewUser } from "../../store/slices/userSlice";

const Form = () => {
  const[nameError,setNameErr] = useState('')
  const[emailError,setEmailErr] = useState('')
  const[phoneError,setPhoneErr] = useState('')
  const[photoError,setPhotoErr] = useState('')
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[phone,setPhone] = useState('')
  const { positions } = useSelector(state => state.positions)
  const { token } = useSelector(state => state.token)
  const dispatch = useDispatch()
  
  const getTokenAndPositions = async () => {
    dispatch(tokenThunk())
    dispatch(positionsThunk()) 
  };
  
  useEffect(() => {
    getTokenAndPositions()
  }, []);

  const createUser = async(e) =>{ 
    e.preventDefault()
    let nameTest = e.target[0].value;
    let emailTest = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    let phoneTest = /^[\+]{0,1}380([0-9]{9})$/;
    let photo = e.target[7].files[0]
    if(nameTest.length < 2 || nameTest.length > 60 || !nameTest){
      return setNameErr('Name length must be min-2 max-60')
    }else{
      setNameErr('')
    }
    if(!emailTest.test(String(email))){
      return setEmailErr('Invalid Email')
    }else{
      setEmailErr('')
    }
    if(!phoneTest.test(String(phone))){
      return setPhoneErr('Invalid Phone number')
    }else{
      setPhoneErr('')
    }
    if(!photo || photo.size > 500000){
      return setPhotoErr('Photo must be required and max size 500 kilobytes')
    }else{
      setPhotoErr('')
    }
    return dispatch(createNewUser({e,token}))
  }


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
        {nameError?<span className="text-red-500">Name length must be min-2 max-60</span>:''}
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="font-semibold">
          Email
        </label>
        {emailError?<span className="text-red-500">Invalid Email</span>:''}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold">
          Phone
        </label>
        {phoneError?<span className="text-red-500">Invalid Phone number</span>:''}
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          className="p-2 w-full outline-yellow-500 bg-cyan-100"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span className='text-md'>+38 (0XX) XXX - XX - XX</span>
          <PositionsInputs positions={positions}/>
          {photoError?<span className="text-red-500">Photo must be required and max size 500 kilobytes</span>:''}
        <label
          htmlFor="img"
          className="flex items-center cursor-pointer bg-blue-300 w-full hover:bg-blue-400 duration-200"
        >
          <img className="w-[40px] h-[40px] mr-5" src={uploadImg} alt="img" />
          <strong>Upload Your Photo</strong>
        </label>
        <input id="img" name="photo" type="file" className="hidden" />
          <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default Form;
