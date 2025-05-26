"use client";
import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const l10 = keyframes`
  0%    {box-shadow: 0 -30px #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6,30px 0 #F4DD51, 0 0 #E3AAD6,
          0 0 #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6}
  12.5% {box-shadow: 0 0 #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6,30px 0 #F4DD51, calc(30px*0.707) calc(30px*0.707) #E3AAD6,
          0 0 #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6}
  25%   {box-shadow: 0 0 #F4DD51, 0 0 #E3AAD6,30px 0 #F4DD51, calc(30px*0.707) calc(30px*0.707) #E3AAD6,
          0 30px #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6}
  37.5% {box-shadow: 0 0 #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, calc(30px*0.707) calc(30px*0.707) #E3AAD6,
          0 30px #F4DD51, calc(-30px*0.707) calc(30px*0.707) #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6}
  50%   {box-shadow: 0 0 #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6,
          0 30px #F4DD51, calc(-30px*0.707) calc(30px*0.707) #E3AAD6,-30px 0 #F4DD51, 0 0 #E3AAD6}
  62.5% {box-shadow: 0 0 #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6,
          0 0 #F4DD51, calc(-30px*0.707) calc(30px*0.707) #E3AAD6,-30px 0 #F4DD51, calc(-30px*0.707) calc(-30px*0.707) #E3AAD6}
  75%   {box-shadow: 0 -30px #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6,
          0 0 #F4DD51, 0 0 #E3AAD6,-30px 0 #F4DD51, calc(-30px*0.707) calc(-30px*0.707) #E3AAD6}
  87.5% {box-shadow: 0 -30px #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6,
          0 0 #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, calc(-30px*0.707) calc(-30px*0.707) #E3AAD6}
  100%  {box-shadow: 0 -30px #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6,30px 0 #F4DD51, 0 0 #E3AAD6,
          0 0 #F4DD51, 0 0 #E3AAD6,0 0 #F4DD51, 0 0 #E3AAD6}
`;

export default function Loading() {
  return (
    <Box
      sx={{
        width: "22px",
        aspectRatio: "1",
        borderRadius: "50%",
        background: "#F10C49",
        animation: `${l10} 1.5s infinite linear`,
      }}
    />
  );
}
