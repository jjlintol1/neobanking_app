import React from "react";
import { Avatar } from "../ui/avatar";

interface UserAvatarProps {
  size?: number | string;
  firstInitial: string;
  lastInitial: string;
  textSize?: number | string;
  avatarTextColor: string;
}

const UserAvatar = ({
  size = 40,
  textSize = 16,
  firstInitial,
  lastInitial,
  avatarTextColor,
}: UserAvatarProps) => {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: "#00F5A0",
    color: avatarTextColor,
  };
  const textStyle = {
    fontSize: typeof textSize === "string" ? textSize : `${textSize}px`,
    color: avatarTextColor,
  };

  return (
    <Avatar style={avatarStyle} className="flex items-center justify-center">
      <p style={textStyle}>{firstInitial + lastInitial}</p>
    </Avatar>
  );
};

export default UserAvatar;
