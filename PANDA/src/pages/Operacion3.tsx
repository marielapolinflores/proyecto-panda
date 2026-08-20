import React, { useState } from 'react';
import '../Dashboard.css';

interface Cancion {
  ID: number;
  Title: string;
  Artist: string;
  Genre: string;
  BPM: number;
  Energy: number;
  Danceability: number;
  Popularity: number;
}

const Operacion3: React.FC = () => {
  const [data, setData] = useState<Cancion[]>([]);
  const [reporteActual, setReporteActual] = useState<string>('general');

  const parsearCSV = (text: string) => {
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    const parsedData: Cancion[] = lines.slice(1).map((line) => {
      const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || line.split(',');
      const clean = values.map((v) => v.replace(/^"|"$/g, '').trim());

      return {
        ID: Number(clean[0]) || 0,
        Title: clean[1] || '',
        Artist: clean[2] || '',
        Genre: clean[4] || '',
        BPM: Number(clean[5]) || 0,
        Energy: Number(clean[6]) || 0,
        Danceability: Number(clean[7]) || 0,
        Popularity: Number(clean[13]) || 0,
      };
    });
    setData(parsedData);
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

  const totalCanciones = data.length;
  const promedioBPM = totalCanciones > 0 ? (data.reduce((acc, curr) => acc + curr.BPM, 0) / totalCanciones).toFixed(1) : 0;
  const promedioPopularidad = totalCanciones > 0 ? (data.reduce((acc, curr) => acc + curr.Popularity, 0) / totalCanciones).toFixed(1) : 0;

  const obtenerDatosReporte = () => {
    switch (reporteActual) {
      case 'alta_pop':
        return data.filter((c) => c.Popularity >= 80);
      case 'alta_energia':
        return data.filter((c) => c.Energy >= 70);
      default:
        return data;
    }
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>Sección REPORTES</h2>

      <div className="dashboard-toolbar" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <label className="btn-upload" style={{ cursor: 'pointer', background: '#4CAF50', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold' }}>
          📂 CARGAR CSV (REPORTES)
          <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
        <button className="btn-action" onClick={() => setReporteActual('general')}>📊 Reporte General</button>
        <button className="btn-action" onClick={() => setReporteActual('alta_pop')}>🔥 Alta Popularidad (&gt;=80)</button>
        <button className="btn-action" onClick={() => setReporteActual('alta_energia')}>⚡ Alta Energía (&gt;=70)</button>
      </div>

      {data.length === 0 ? (
        <div style={{ padding: '30px', textAlign: 'center', background: '#1e1e1e', borderRadius: '8px', border: '1px dashed #555' }}>
          <p style={{ color: '#FFC107', margin: 0, fontSize: '1.1em' }}>⚠️ Presiona el botón verde "CARGAR CSV" para subir el archivo de datos.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #4CAF50' }}>
              <span style={{ fontSize: '0.85em', color: '#aaa' }}>TOTAL REGISTROS</span>
              <h3 style={{ margin: '5px 0 0 0' }}>{totalCanciones}</h3>
            </div>
            <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
              <span style={{ fontSize: '0.85em', color: '#aaa' }}>BPM PROMEDIO</span>
              <h3 style={{ margin: '5px 0 0 0' }}>{promedioBPM}</h3>
            </div>
            <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #FF9800' }}>
              <span style={{ fontSize: '0.85em', color: '#aaa' }}>POPULARIDAD MEDIA</span>
              <h3 style={{ margin: '5px 0 0 0' }}>{promedioPopularidad}</h3>
            </div>
          </div>

          <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
              <thead>
                <tr style={{ background: '#2a2a2a', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>Título</th>
                  <th style={{ padding: '10px' }}>Artista</th>
                  <th style={{ padding: '10px' }}>Género</th>
                  <th style={{ padding: '10px' }}>BPM</th>
                  <th style={{ padding: '10px' }}>Popularidad</th>
                </tr>
              </thead>
              <tbody>
                {obtenerDatosReporte().map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #2a2a2a' }}>
                    <td style={{ padding: '10px' }}>#{item.ID}</td>
                    <td style={{ padding: '10px' }}>{item.Title}</td>
                    <td style={{ padding: '10px' }}>{item.Artist}</td>
                    <td style={{ padding: '10px' }}>{item.Genre}</td>
                    <td style={{ padding: '10px' }}>{item.BPM}</td>
                    <td style={{ padding: '10px' }}>{item.Popularity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Operacion3;