const request = require('supertest');
const si = require('systeminformation');
const { getSystemInfo } = require('../src/sysInfos');
import app from '../src/app';

describe('Test de getSystemInfo', () => {
  test('doit renvoyer un code 200 et les informations système', async () => {
    const response = await request(app).get("/api/v1/sysinfo")
        expect(response.statusCode).toBe(200);
        const systemInfo = response.body;
        expect(systemInfo.cpu).toBeDefined();
        expect(systemInfo.system).toBeDefined();
        expect(systemInfo.mem).toBeDefined();
        expect(systemInfo.os).toBeDefined();
        expect(systemInfo.currentLoad).toBeDefined();
        expect(systemInfo.processes).toBeDefined();
        expect(systemInfo.diskLayout).toBeDefined();
        expect(systemInfo.networkInterfaces).toBeDefined();
    });

//   test('doit renvoyer un code 500 en cas d\'erreur', async () => {
//     si.cpu.mockRejectedValue(new Error('Une erreur'));

//     const response = await request(app).get('/api/v1/sysinfo');
//     expect(response.status).toBe(500);
//   });

  test('GET /quelquechose doit renvoyer un code 404', async () => {
    const response = await request(app).get('/aaa');
    expect(response.status).toBe(404);
  });
});
