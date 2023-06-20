"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const Avatar = () => {
  const params = useParams();
  if (!params.user) {
    return null;
  }
  return (
    <div className="relative aspect-square w-12">
      <Image
        src={`https://source.boringavatars.com/beam/120/${params.user}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
        alt="avatar"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default Avatar;
