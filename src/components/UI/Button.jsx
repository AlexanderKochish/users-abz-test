const Button = ({ children, handler, clazz }) => {
  return (
    <button
      onClick={handler}
      className={`bg-yellow-300 rounded-2xl py-1 px-3 hover:bg-yellow-400 duration-150 my-5 ${clazz}`}
    >
      {children}
    </button>
  );
};

export default Button;
