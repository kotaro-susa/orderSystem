"use client";

import Link from "next/link";
import React from "react";

const Button = () => {
  return (
    <div>
      <Link
        className="border-blue-700 text-base text-white bg-slate-700 rounded-sm p-3 font-bold mr-3"
        href="/order"
      >
        注文新規作成
      </Link>
      <Link
        className="border-blue-700 text-base text-white bg-slate-700 rounded-sm p-3 font-bold"
        href="/productRegister"
      >
        商品登録
      </Link>
    </div>
  );
};

export default Button;
