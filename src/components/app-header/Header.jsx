import logo from "../../assets/Logo.png";
import Button from "../UI/Button";

const Header = () => {

  const clazz = 'mr-2 sm:mr-4'
  return (
    <header className="flex items-center justify-between w-full px-2 lg:px-0 min-h-[50px]">
      <img className="w-18 h-7" src={logo} alt="logo" />
      <div className="text-slate-600">
        <Button clazz={clazz}>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
};

export default Header;
