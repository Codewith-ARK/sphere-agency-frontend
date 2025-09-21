import Sidebar from "@/components/navigation/Sidebar";
import React from "react";

export default function layout({ children }) {
  return <Sidebar>{children}</Sidebar>;
}
