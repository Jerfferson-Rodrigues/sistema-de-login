import React, { useEffect, useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";

import { getUser } from "../../services/api";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getUser();
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Carregando dados....</div>;
  }

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Sair</button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user._id} - {user.email}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
