"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="grid place-items-center h-screen">
      {!session ? (
        <div>ロード中</div>
      ) : (
        <div className="shadow-lg p-8 flex flex-col gap-2 my-6">
          <div>
            Name:<span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email:<span className="font-bold">{session?.user?.email}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            ログアウトする
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
