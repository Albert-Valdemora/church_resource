import React from 'react';
import { MdOutlineDateRange } from "react-icons/md";
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const Fecha = ({ onDateChange, currentDate }) => {
  const handleDateChange = (e) => {
  
    const formattedDate = e.target.value.replace(/-/g, '/');
    onDateChange(formattedDate);
  };

  const inputDate = currentDate ? currentDate.replace(/\//g, '-') : '';

  return (
    <div className="flex flex-row justify-center items-center gap-4   sm:justify-between">
      <div className="flex items-center gap-2">
        <MdOutlineDateRange className="h-5 w-5 text-gray-500" />
        <input
          type="date"
          value={inputDate}
          onChange={handleDateChange}
          className="rounded-md border dark:text-black border-gray-300 bg-slate-100 px-2 py-2"
        />
      </div>
      <Button asChild>
        <Link to="/subir">Upload New Resource</Link>
      </Button>
    </div>
  );
};