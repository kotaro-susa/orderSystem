"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row justify-between w-full bg-slate-700 items-center p-2">
      <div className="text-3xl text-white font-bold">Alternative-Force</div>
      <div className="flex flex-row items-center">
        <div className="text-white font-bold text-1xl mr-4">
          ユーザー名 : {session?.user?.name}
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-600 text-white font-bold cursor-pointer px-5 py-2 text-1xl"
        >
          ログアウトする
        </button>
      </div>
    </div>
  );
};

export default Header;
