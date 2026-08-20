import React, { useState } from 'react';
import '../Dashboard.css';

interface Cancion {
  ID: number;
  Title: string;
  Artist: string;
  Album: string;
  Genre: string;
  BPM: number;
  Energy: number;
  Danceability: number;
  Popularity: number;
}

const Operacion4: React.FC = () => {
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
        Album: clean[3] || '',
        Genre: clean[4] || '',
        BPM: Number(clean[5]) || 0,
        Energy: Number(clean[6]) || 0,
        Danceability: Number(clean[7]) || 0,
        Popularity: Number(clean[13]) || 0,
      };
    });
    setData(parsedData);
    setConsolaOutput('✅ Archivo CSV cargado manualmente. Selecciona un proceso híbrido.');
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

  const ejecutarOperacionHibrida1 = () => {
    if (data.length === 0) return setConsolaOutput('⚠️ Primero debes cargar un archivo CSV con el botón verde.');
    const filtrados = data.filter((c) => c.Popularity >= 70);
    const bpms = filtrados.map((c) => c.BPM);
    const suma = bpms.reduce((a, b) => a + b, 0);
    const promedio = bpms.length > 0 ? (suma / bpms.length).toFixed(2) : '0';

    setConsolaOutput(
      `--- COMBINADO 1: FILTRADO PANDAS + CÁLCULO NUMPY ---\n` +
      `Filtro Pandas: Canciones con Popularidad >= 70 (${filtrados.length} encontradas)\n` +
      `BPM Promedio del subconjunto: ${promedio}`
    );
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>Sección PANDAS &amp; NUMPY</h2>

      <div className="dashboard-toolbar" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <label className="btn-upload" style={{ cursor: 'pointer', background: '#4CAF50', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold' }}>
          📂 CARGAR CSV (PANDAS &amp; NUMPY)
          <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
        <button className="btn-action" onClick={ejecutarOperacionHibrida1}>⚡ Filtro Pop + BPM Medio</button>
      </div>

      <pre style={{ background: '#000', color: '#00FF00', padding: '15px', borderRadius: '5px', minHeight: '120px' }}>
        {consolaOutput || 'Esperando archivo CSV... Presiona "CARGAR CSV" para iniciar.'}
      </pre>
    </div>
  );
};

export default Operacion4;