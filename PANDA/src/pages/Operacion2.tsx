import React, { useState } from 'react';
import '../Dashboard.css';

interface Cancion {
  ID: number;
  Title: string;
  Artist: string;
  BPM: number;
  Energy: number;
  Danceability: number;
  Length: number;
  Popularity: number;
}

const Operacion2: React.FC = () => {
  const [data, setData] = useState<Cancion[]>([]);
  const [consolaOutput, setConsolaOutput] = useState<string>('');

  const parsearCSV = (text: string) => {
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    const parsedData: Cancion[] = lines.slice(1).map((line) => {
      const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || line.split(',');
      const clean = values.map((v) => v.replace(/^"|"$/g, '').trim());

      return {
        ID: Number(clean[0]) || 0,
        Title: clean[1] || '',
        Artist: clean[2] || '',
        BPM: Number(clean[5]) || 0,
        Energy: Number(clean[6]) || 0,
        Danceability: Number(clean[7]) || 0,
        Length: Number(clean[10]) || 0,
        Popularity: Number(clean[13]) || 0,
      };
    });
    setData(parsedData);
    setConsolaOutput('✅ Archivo CSV cargado con éxito. Haz clic en una operación para ver los resultados.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      parsearCSV(text);
    };
    reader.readAsText(file);
  };

  const ejecutarProcedimiento1 = () => {
    if (data.length === 0) return setConsolaOutput('⚠️ Primero debes cargar un archivo CSV con el botón verde.');
    const bpms = data.map((c) => c.BPM);
    const suma = bpms.reduce((a, b) => a + b, 0);
    const media = (suma / bpms.length).toFixed(2);
    const max = Math.max(...bpms);
    const min = Math.min(...bpms);

    setConsolaOutput(
      `--- OPERACIÓN 1: ESTADÍSTICAS AVANZADAS DE BPM ---\n` +
      `Total Registros: ${data.length}\nSuma Total BPM: ${suma}\n` +
      `Media (Promedio): ${media}\nBPM Máximo: ${max}\nBPM Mínimo: ${min}`
    );
  };

  const ejecutarProcedimiento2 = () => {
    if (data.length === 0) return setConsolaOutput('⚠️ Primero debes cargar un archivo CSV con el botón verde.');
    const pops = data.map((c) => c.Popularity);
    const max = Math.max(...pops);
    const min = Math.min(...pops);
    const normalizados = pops.map((p) => ((p - min) / (max - min)).toFixed(4));

    setConsolaOutput(
      `--- OPERACIÓN 2: NORMALIZACIÓN MIN-MAX DE POPULARIDAD ---\n` +
      `Valores Originales: [${pops.slice(0, 10).join(', ')}...]\n` +
      `Arreglo Normalizado (0 - 1): [${normalizados.slice(0, 10).join(', ')}...]`
    );
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>Sección LIPNUMPY</h2>

      <div className="dashboard-toolbar" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <label className="btn-upload" style={{ cursor: 'pointer', background: '#4CAF50', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold' }}>
          📂 CARGAR CSV (LIPNUMPY)
          <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
        <button className="btn-action" onClick={ejecutarProcedimiento1}>P1: Estadística BPM</button>
        <button className="btn-action" onClick={ejecutarProcedimiento2}>P2: Normalizar Popularidad</button>
      </div>

      <pre style={{ background: '#000', color: '#00FF00', padding: '15px', borderRadius: '5px', minHeight: '120px' }}>
        {consolaOutput || 'Esperando archivo CSV... Presiona "CARGAR CSV" para iniciar.'}
      </pre>
    </div>
  );
};

export default Operacion2;