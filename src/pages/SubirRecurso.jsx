import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import supabase from "../supabase-client";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

export const SubirRecurso = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fecha = new Date().toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Si es un recurso de archivo
      if (file && type !== "Link") {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("resources")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Formatear la fecha al formato YYYY/MM/DD
        const formattedDate = date.replace(/-/g, "/");

        const { error: dbError } = await supabase.from("resources").insert([
          {
            title,
            type,
            date: formattedDate,
            file_path: fileName,
            link: null,
          },
        ]);

        if (dbError) throw dbError;
      }

      // Si es un recurso tipo Link
      if (type === "Link" && link) {
        // Formatear la fecha al formato YYYY/MM/DD
        const formattedDate = date.replace(/-/g, "/");

        const { error: dbError } = await supabase.from("resources").insert([
          {
            title,
            type,
            date: formattedDate,
            file_path: null,
            link,
          },
        ]);

        if (dbError) throw dbError;
      }

      setTitle("");
      setType("");
      setDate("");
      setLink("");
      setFile(null);

      toast("El evento ha sido creado", {
        description: `${title} - ${fecha}`,
        action: {
          label: '❌',
          onClick: () => toast.dismiss(),
        },
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="container mx-auto p-4 h-screen overflow-hidden mt-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Subir Nuevo Recurso</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingrese el título del recurso"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Recurso</label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Flyer">Flyer</SelectItem>
                  <SelectItem value="Pdf">PDF</SelectItem>
                  <SelectItem value="Hymn">Himno</SelectItem>
                  <SelectItem value="Link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Archivo</label>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required={type !== "Link"}
                disabled={type === "Link"}
              />
            </div>


            <div className="space-y-2">
              <label className="text-sm font-medium">Link</label>
              <Input
                type="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Ingrese el link del recurso (opcional)"
                disabled={type !== "Link"}
                required={type === "Link" ? true : false}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Subiendo..." : "Subir Recurso"}
            </Button>
          </form>
        </CardContent>
        <Toaster />
      </Card>
    </div>
  );
};
