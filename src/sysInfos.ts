import si from 'systeminformation';
import { Request, Response } from 'express';

interface ISystemInformation {
    cpu: si.Systeminformation.CpuData;
    system: si.Systeminformation.SystemData;
    mem: si.Systeminformation.MemData;
    os: si.Systeminformation.OsData;
    currentLoad: si.Systeminformation.CurrentLoadData;
    processes: si.Systeminformation.ProcessesData;
    diskLayout: si.Systeminformation.DiskLayoutData[];
    networkInterfaces: si.Systeminformation.NetworkInterfacesData | si.Systeminformation.NetworkInterfacesData[];
  }

export async function getSystemInfo(req: Request, res: Response) {
  try {
    const cpu = await si.cpu();
    const system = await si.system();
    const mem = await si.mem();
    const os = await si.osInfo();
    const currentLoad = await si.currentLoad();
    const processes = await si.processes();
    const diskLayout = await si.diskLayout();
    const networkInterfaces = await si.networkInterfaces();

    const systemInfo: ISystemInformation = {
      cpu,
      system,
      mem,
      os,
      currentLoad,
      processes,
      diskLayout,
      networkInterfaces,
    };

    res.json(systemInfo);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des informations système.' });
  }
}
