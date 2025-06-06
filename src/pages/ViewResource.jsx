import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import supabase from "../supabase-client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ViewResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setResource(data);

        const { data: urlData } = await supabase.storage
          .from("resources")
          .getPublicUrl(data.file_path);

        setFileUrl(urlData.publicUrl);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => navigate("/")}>Volver al Dashboard</Button>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="">Recurso no encontrado</p>
        <Button onClick={() => navigate("/")}>Volver al Dashboard</Button>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Button className="mb-6" onClick={() => navigate("/")}>
          ← Volver al Dashboard
        </Button>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl"> {resource.title} </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tipo</p>
                <p className=" font-medium">{resource.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className=" font-medium">{resource.date}</p>
              </div>
            </div>

            <div className="mt-6">
              {resource.type === "Pdf" && fileUrl && (
                <iframe src={fileUrl} className="w-full h-[600px] border-0" />
              )}




              {resource.type === "Flyer" && fileUrl && (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={fileUrl}
                    className="w-full mx-h-[600px] object-contain"
                    title={resource.title}
                  />
                  <Button>
                    <a href={fileUrl} download>
                      Descargar Flyer
                    </a>
                  </Button>
                </div>
              )}



              {resource.type === "Hymn" && fileUrl && (
                <div className="flex flex-col items-center gap-4">
                  <audio controls className="w-full">
                    <source src={fileUrl} type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio
                  </audio>
                  <Button>
                    <a href={fileUrl} download>
                      Descargar Himno
                    </a>
                  </Button>
                </div>
              )}


              {resource.type === "Link" && (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-blue-500 underline">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      {resource.link}
                    </a>
                  </p>
                  <Button>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      Abrir Link
                    </a>
                  </Button>
                  </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
