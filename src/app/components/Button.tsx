"use client";

import Link from "next/link";
import React from "react";

const Button = () => {
  return (
    <div>
      <Link
        className="border-blue-700 text-base text-white bg-slate-700 rounded-sm p-3 font-bold"
        href="/tasks/new"
      >
        新規作成
      </Link>
    </div>
  );
};

export default Button;
