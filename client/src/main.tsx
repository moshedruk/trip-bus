import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { io } from "socket.io-client";
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'

export const socket = io("http://localhost:2212");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <App />
    </BrowserRouter>     
  </StrictMode>,
)
