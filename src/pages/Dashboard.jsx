import supabase from "../supabase-client";
import { Fecha } from "../components/Fecha";
import { Card } from "../components/card";
import { Button } from "../components/ui/button";
import React, { useEffect, useState } from "react";

export const Dashboard = () => {
  const [seccion, setSeccion] = useState(
    localStorage.getItem("ResumenSeccion") || "All"
  );
  const [visible, setVisible] = useState(true);
  const [resources, setResources] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const [fechaActual] = useState(getCurrentDate());
  const fechamodificada = new Date().toLocaleDateString();

  const handleSeccionChange = (newSeccion) => {
    if (seccion !== newSeccion) {
      setVisible(false);
      setTimeout(() => {
        setSeccion(newSeccion);
        setVisible(true);
        localStorage.setItem("ResumenSeccion", newSeccion);
      }, 300);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewAllResources = () => {
    setSelectedDate(fechaActual);
  };

  const fetchResources = async () => {
    const { data, error } = await supabase.from("resources").select();

    if (error) {
      console.error("Error fetching resources: ", error);
    } else {
      // Formatear las fechas al formato YYYY/MM/DD
      const formattedData = data.map((resource) => ({
        ...resource,
        date: resource.date ? resource.date.replace(/-/g, "/") : "",
      }));
      setResources(formattedData);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = resources.filter((item) => {
    const matchesSection =
      seccion === "All" || seccion === "" || item.type === seccion;
    const matchesDate = !selectedDate || item.date === selectedDate;
    return matchesSection && matchesDate;
  });

  return (
    <div className="scroll-p-0">
      <h2 className="text-3xl font-bold p-5">Dashboard</h2>
      <div className="w-screen min-h-screen flex flex-col items-center gap-5 p-4 justify-center">
        <Fecha onDateChange={handleDateChange} currentDate={selectedDate} />
        <div className="w-[400px] rounded-lg p-4 flex justify-center gap-6 bg-slate-100">
          <div
            className="cursor-pointer hover:scale-[1.1] transition-transform"
            onClick={() => handleSeccionChange("All")}
          >
            {seccion === "All" ? (
              <strong
                className={`text-xl p-2 rounded-lg transition-all duration-300 ease-in-out ${
                  seccion === "All"
                    ? "bg-slate-300 dark:text-black scale-110"
                    : "hover:bg-slate-300"
                }`}
              >
                All
              </strong>
            ) : (
              <strong className="text-xl p-2 hover:bg-slate-300 dark:text-black rounded-lg transition-all duration-300">
                All
              </strong>
            )}
          </div>

          <div
            className="cursor-pointer hover:scale-[1.1] transition-transform"
            onClick={() => handleSeccionChange("Flyer")}
          >
            {seccion === "Flyer" ? (
              <strong className="text-xl p-2 bg-slate-300 dark:text-black rounded-lg transition-all duration-300 ease-in-out scale-110">
                Flyer
              </strong>
            ) : (
              <strong className="text-xl p-2 hover:bg-slate-300 dark:text-black rounded-lg transition-all duration-300">
                Flyer
              </strong>
            )}
          </div>

          <div
            className="cursor-pointer hover:scale-[1.1] transition-transform"
            onClick={() => handleSeccionChange("Pdf")}
          >
            {seccion === "Pdf" ? (
              <strong className="text-xl p-2 bg-slate-300 dark:text-black rounded-lg transition-all duration-300 ease-in-out scale-110">
                Pdf
              </strong>
            ) : (
              <strong className="text-xl p-2 hover:bg-slate-300 dark:text-black rounded-lg transition-all duration-300">
                Pdf
              </strong>
            )}
          </div>

          <div
            className="cursor-pointer hover:scale-[1.1] transition-transform"
            onClick={() => handleSeccionChange("Hymn")}
          >
            {seccion === "Hymn" ? (
              <strong className="text-xl p-2 bg-slate-300 dark:text-black rounded-lg transition-all duration-300 ease-in-out scale-110">
                Hymn
              </strong>
            ) : (
              <strong className="text-xl p-2 hover:bg-slate-300 dark:text-black rounded-lg transition-all duration-300">
                Hymn
              </strong>
            )}
          </div>
        </div>

        <div className="flex gap-6 flex-wrap justify-center p-3">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            {filteredResources.map((item, i) => (
              <div
                key={i}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <Card className="flex" {...item} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Button
            onClick={handleViewAllResources}
            className="transition-all duration-300 hover:scale-105"
          >
            View All Resources {fechamodificada} 👉
          </Button>
        </div>
      </div>
    </div>
  );
};
