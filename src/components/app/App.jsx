import { useState } from "react";
import Form from "../app-form/Form";
import Header from "../app-header/Header";
import Title from "../app-title/Title";
import Users from "../app-users/Users";
import Modal from "../Modals/Modal";

const App = () => {
  const [activeMod, setActiveMod] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <div className="w-full min-h-screen bg-slate-200">
      <div className="container max-w-[1220px] mx-auto">
        <Header />
        <Title />
        <Users setUser={setUser} setActiveMod={setActiveMod} activeMod={activeMod}/>
        <Form />
      </div>
      <Modal
        user={user}
        activeMod={activeMod}
        setActiveMod={setActiveMod}
      />
    </div>
  );
};

export default App;
