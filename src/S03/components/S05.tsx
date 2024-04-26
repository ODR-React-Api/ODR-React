import React from "react";
import { useLocation } from "react-router-dom"


const S05 = () => {
  const {state} = useLocation()
  return <div>11111 {state.cid}</div>
}

export default S05