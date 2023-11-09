const express = require("express");
import { getSystemInfo } from './sysInfos';

const app = express();

app.get('/api/v1/sysinfo', getSystemInfo);

app.get('*', (req,res)=>
    res.status(404).send("404 Not found"));

export default app;
  