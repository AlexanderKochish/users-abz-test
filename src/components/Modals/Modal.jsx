import Button from "../UI/Button";

const Modal = ({ activeMod, setActiveMod, user }) => {
  const closeModal = () => setActiveMod(!activeMod);

  return (
    <div
      className={
        activeMod
          ? "fixed top-0 left-0 grid place-items-center w-full h-full bg-black/40"
          : "hidden"
      }
    >
      <div className="bg-white sm:w-96 min-h-96 px-3 rounded-lg flex items-start justify-between flex-col">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-2xl font-bold text-green-600 text-center">
            Info by {user?.name}
          </h3>
          <Button handler={closeModal}>X</Button>
        </div>
        <div className="flex flex-col w-full h-full mb-3">
          <img
            className="w-24 h-24"
            src={`${import.meta.env.VITE_BASE_URL}${user?.photo}`}
            alt="user-photo"
          />
          <h3>
            Name: <strong>{user?.name}</strong>
          </h3>
          <p>
            Email: <strong>{user?.email}</strong>
          </p>
          <p>
            Phone: <strong>{user?.phone}</strong>
          </p>
          <p>
            Position: <strong>{user?.position_user}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
