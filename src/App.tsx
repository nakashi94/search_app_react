import "./App.css";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { User } from "./types/user";

const SContainer = styled.div`
  text-align: center;
`;

const SMain = styled.div`
  padding: 70px 150px;
`;

const SInput = styled.input`
  margin-bottom: 30px;
  padding: 10px 20px;
  outline: none;
  border-radius: 2px;
  width: 200px;
`;

const SContent = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 60px;
`;

const SBox = styled.div`
  width: 200px;
  height: 150px;
  border: 1px solid black;
  padding: 4px;
`;

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const ref: any = useRef();
  const [searchQuery, setSearchQuery] = useState<Array<User> | null>([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      console.log(res);
      setUsers(res.data);
      setSearchQuery(res.data);
    });
  }, []);

  const handleSearchText = () => {
    console.log(ref.current.value);

    setSearchQuery(
      users.filter((user: User) =>
        user.name.toLowerCase().includes(ref.current.value)
      )
    );

    console.log(searchQuery);
    console.log(
      users.filter((user: User) =>
        user.name.toLowerCase().includes(ref.current.value)
      )
    );
  };

  return (
    <SContainer>
      <SMain>
        <h2>Search App</h2>
        <SInput type="text" ref={ref} onChange={handleSearchText} />
        <SContent>
          {searchQuery?.map((user: User) => (
            <SBox key={user.id}>
              <h3>{user.name}</h3>
              <hr />
              <p>{user.email}</p>
            </SBox>
          ))}
        </SContent>
      </SMain>
    </SContainer>
  );
}

export default App;
