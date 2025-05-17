import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import React, { useState } from "react";
import supabase from "../supabase-client";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sdata, setSdata] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSdata(data);
      navigate("/");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <h2 className="text-3xl font-bold">Login</h2>
      <span className="font-medium text-lg text-gray-600">
        Enter your credentials to access your account
      </span>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <div className="  sm:w-[400px] h-[35%]">
        <form
          className="sm:w-full w-[300px] h-full border-2 rounded-md flex justify-center items-center flex-col gap-3"
          onSubmit={handleLogin}
        >
          <div className="w-[90%] mb-3">
            <span className="font-bold">Email</span>
            <Input
              type="email"
              placeholder="people@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="w-[90%]">
            <span className="font-bold">Password</span>
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* <button className="w-[50%] h-10 flex justify-center items-center text-lx font-bold mt-8 ">
            Login
          </button> */}
          <Button className="w-[90%] mt-5">Login</Button>
        </form>
      </div>
    </div>
  );
};
