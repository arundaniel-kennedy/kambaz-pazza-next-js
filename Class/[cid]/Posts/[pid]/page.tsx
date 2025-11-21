"use client";
import { useParams } from 'next/navigation';
import React from 'react'

export default function Posts() {
  const {cid,pid} = useParams();
  return (
    <div>
      Post {pid} for Class {cid}
    </div>
  )
}