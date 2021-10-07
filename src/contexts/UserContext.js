import { createContext } from "react";

const UserContext = createContext({ user: {}, setUser: (userInfo) => {} });

export default UserContext;
