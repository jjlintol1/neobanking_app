import React from "react";
import Theme from "./Theme";
import UserAvatar from "./UserAvatar";

interface LoggedInUserProps {
  user: any;
}

const LoggedInUser = ({ user }: LoggedInUserProps) => {
  return (
    <div className="items-center gap-4 hidden sm:flex">
      <Theme />
      <UserAvatar
        firstInitial={user.firstName[0]}
        lastInitial={user.lastName[0]}
        avatarTextColor={user.avatarTextColor}
      />
      <div className="lg:flex flex-col items-start hidden">
        <p className="foreground-text text-lg font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default LoggedInUser;
