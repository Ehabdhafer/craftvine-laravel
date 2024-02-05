import React from "react";
import UserTable from "../UserTable";

const User = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full my-6 md:ml-24 px-10 py-5 rounded-lg">
        <UserTable />
      </div>
    </div>
  );
};

export default User;
