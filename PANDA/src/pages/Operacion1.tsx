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
  Loudness: number;
  Liveness: number;
  Length: number;
  Speechiness: number;
  Positivity: number;
  Popularity: number;
}

const Operacion1: React.FC = () => {
  const [data, setData] = useState<Cancion[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtro, setFiltro] = useState<string>('todos');

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
        Loudness: Number(clean[8]) || 0,
        Liveness: Number(clean[9]) || 0,
        Length: Number(clean[10]) || 0,
        Speechiness: Number(clean[11]) || 0,
        Positivity: Number(clean[12]) || 0,
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

  const datosFiltrados = data.filter((item) => {
    const cumpleBusqueda =
      item.Title.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.Artist.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.Genre.toLowerCase().includes(busqueda.toLowerCase());

    if (filtro === 'bpm_120') return cumpleBusqueda && item.BPM > 120;
    if (filtro === 'top5') return cumpleBusqueda && item.Popularity >= 90;
    if (filtro === 'baja_energia') return cumpleBusqueda && item.Energy < 50;
    if (filtro === 'baile') return cumpleBusqueda && item.Danceability >= 70;
    if (filtro === 'alta_pop') return cumpleBusqueda && item.Popularity >= 85;

    return cumpleBusqueda;
  });

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>Sección LIPPANDAS</h2>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Buscar por canción, artista o género..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#1e1e1e', color: '#fff' }}
        />
      </div>

      <div className="dashboard-toolbar" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <label className="btn-upload" style={{ cursor: 'pointer', background: '#4CAF50', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold' }}>
          📂 CARGAR CSV (LIPPANDAS)
          <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
        <button className="btn-action" onClick={() => setFiltro('bpm_120')}>P1: BPM &gt; 120</button>
        <button className="btn-action" onClick={() => setFiltro('top5')}>P2: Top Popularidad</button>
        <button className="btn-action" onClick={() => setFiltro('baja_energia')}>P3: Energía &lt; 50</button>
        <button className="btn-action" onClick={() => setFiltro('baile')}>P4: Top Bailable</button>
        <button className="btn-action" onClick={() => setFiltro('alta_pop')}>P5: Popularidad (&gt;=85)</button>
        <button className="btn-action" onClick={() => setFiltro('todos')}>Mostrar Todos</button>
      </div>

      {data.length === 0 ? (
        <div style={{ padding: '30px', textAlign: 'center', background: '#1e1e1e', borderRadius: '8px', border: '1px dashed #555' }}>
          <p style={{ color: '#FFC107', margin: 0, fontSize: '1.1em' }}>⚠️ Presiona el botón verde "CARGAR CSV" para subir el archivo de datos.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
          {datosFiltrados.map((item, index) => (
            <div key={index} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
              <span style={{ fontSize: '0.8em', color: '#aaa' }}>{item.Artist} - {item.Genre}</span>
              <h4 style={{ margin: '5px 0', color: '#fff' }}>{item.Title}</h4>
              <p style={{ margin: '2px 0', fontSize: '0.9em' }}><strong>ID:</strong> #{item.ID}</p>
              <p style={{ margin: '2px 0', fontSize: '0.9em' }}><strong>Álbum:</strong> {item.Album}</p>
              <p style={{ margin: '2px 0', fontSize: '0.9em' }}><strong>BPM:</strong> {item.BPM}</p>
              <p style={{ margin: '2px 0', fontSize: '0.9em' }}><strong>Popularidad:</strong> {item.Popularity}</p>
              <p style={{ margin: '2px 0', fontSize: '0.9em' }}><strong>Duración:</strong> {item.Length}s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Operacion1;