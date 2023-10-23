"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [Emailerror, setEmailError] = useState<string>("");

  const router = useRouter();
  const regexp =
    /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  const emailCheck = regexp.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("全ての項目に入力が必要です。");
      return;
    }
    try {
      if (!emailCheck) {
        setEmailError("正しいメールアドレスを入力してください");
        return;
      }
      const resUserExists: Response = await fetch(`api/userExists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setError("既に登録されています");
        return;
      }
      const res: Response = await fetch(`api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const form: HTMLFormElement = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="font-bold text-xl my-4">登録する</h1>
        <form className="flex flex-col gap-3 w-[400px]" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="名前"
            className="border border-gray-200 p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="border border-gray-200 p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <> {Emailerror}</>
          <input
            type="パスワード"
            placeholder="Password"
            className="border border-gray-200 p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            登録する
          </button>
          {error && (
            <>
              {" "}
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            </>
          )}
          <Link href={"/"} className="text-sm mt-3">
            すでにアカウントを持っていますか？
            <span className="underline">ログインする</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
