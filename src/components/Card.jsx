import React from "react";
import { Button } from "./ui/button";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiMusic } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Card = ({ id, title, type, date, icon }) => {
  const navigate = useNavigate();

  const iconMap = {
    image: <CiImageOn className="text-2xl" />,
    pdf: <IoDocumentTextOutline className="text-2xl" />,
    music: <FiMusic className="text-2xl" />,
  };

  const handleViewResource = () => [navigate(`/resource/${id}`)];

  return (
    <div className="sm:w-[420px] sm:h-[220px] w-[370px] h-[200px] p-5 flex flex-col border-2 items-start justify-center gap-4 rounded-lg">
      <div className="flex items-center gap-3">
        {iconMap[icon]}
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <div>
        <p className="text-gray-500">
          Type: <span>{type}</span>
        </p>
        <p className="text-gray-500">
          Date: <span>{date}</span>
        </p>
      </div>
      <div className="w-full flex justify-center">
        <Button
          className="w-full transition-all duration-300 hover:scale-105"
          onClick={handleViewResource}
        >
          View Resource
        </Button>
      </div>
    </div>
  );
};
