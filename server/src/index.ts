import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import http from "http";


import { connectToMongo } from './DBconfig/DBconnect';

import { Server } from 'socket.io';
import { setupSocketIO } from './socket/io';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

setupSocketIO(io);

connectToMongo()
app.use(cors());
app.use(express.json());




app.use('/ping', (req, res) => {
    res.send('pong');
}
)
server.listen(PORT,()=>{
    console.log(`[Server] running on port ${PORT}`);
})