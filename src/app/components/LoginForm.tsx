"use client";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: SignInResponse | undefined = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res && res.error) {
        setError("メールアドレスもしくはパスワードが正しくありません。");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="font-bold text-xl my-4">ログインする</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[400px]">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="border border-gray-200 p-2"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border border-gray-200 p-2"
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            ログイン
          </button>
          {error && (
            <>
              {" "}
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            </>
          )}
          <Link href={"/register"} className="text-sm mt-3">
            アカウントを持っていますか？
            <span className="underline">登録する</span>
          </Link>
        </form>
        <button onClick={() => signIn("google")}>Googleでログインする</button>
      </div>
    </div>
  );
};

export default LoginForm;
