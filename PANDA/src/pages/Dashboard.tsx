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

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'pandas' | 'numpy' | 'reportes' | 'pn'>('pandas');
  const [data, setData] = useState<Cancion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [numpyOutput, setNumpyOutput] = useState<string>('');
  const [pnOutput, setPnOutput] = useState<string>('');

  // Función interna para parsear el texto CSV
  const parsearCSV = (text: string) => {
    const lines = text.split('\n').filter((line) => line.trim() !== '');

    const parsedData: Cancion[] = lines.slice(1).map((line) => {
      // Regex para separar por comas respetando valores entre comillas
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

  // Carga de CSV manual
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

  // Procedimientos Pandas
  const pandasProc1 = () => setData((prev) => prev.filter((c) => c.BPM > 120));
  const pandasProc2 = () => setData((prev) => [...prev].sort((a, b) => b.Popularity - a.Popularity).slice(0, 5));
  const pandasProc3 = () => setData((prev) => prev.filter((c) => c.Energy < 50));
  const pandasProc4 = () => setData((prev) => [...prev].sort((a, b) => b.Danceability - a.Danceability));
  const pandasProc5 = () => setData((prev) => prev.filter((c) => c.Popularity >= 85));

  // Procedimientos NumPy
  const numpyProc1 = () => {
    if (data.length === 0) return setNumpyOutput('Carga un archivo CSV primero con el botón de cargar.');
    const bpms = data.map((c) => c.BPM);
    const suma = bpms.reduce((a, b) => a + b, 0);
    const media = suma / bpms.length;
    const varianza = bpms.reduce((a, b) => a + Math.pow(b - media, 2), 0) / bpms.length;
    const desviacion = Math.sqrt(varianza);

    setNumpyOutput(
      `--- PROCEDIMIENTO 1 (NUMPY): ESTADÍSTICA DE BPM ---\n` +
      `Total Registros Evaluados: ${bpms.length}\n` +
      `Media (Promedio BPM): ${media.toFixed(2)}\n` +
      `Desviación Estándar: ${desviacion.toFixed(2)}\n` +
      `BPM Valor Máximo: ${Math.max(...bpms)}\n` +
      `BPM Valor Mínimo: ${Math.min(...bpms)}`
    );
  };

  const numpyProc2 = () => {
    if (data.length === 0) return setNumpyOutput('Carga un archivo CSV primero con el botón de cargar.');
    const pop = data.map((c) => c.Popularity);
    const maxPop = Math.max(...pop);
    const minPop = Math.min(...pop);
    const diff = maxPop - minPop === 0 ? 1 : maxPop - minPop;
    const normalizados = pop.map((p) => ((p - minPop) / diff).toFixed(4));

    setNumpyOutput(
      `--- PROCEDIMIENTO 2 (NUMPY): NORMALIZACIÓN MIN-MAX DE POPULARIDAD (0 a 1) ---\n` +
      `Popularidad Original: [${pop.join(', ')}]\n\n` +
      `Popularidad Normalizada:\n[${normalizados.join(', ')}]`
    );
  };

  const numpyProc3 = () => {
    if (data.length === 0) return setNumpyOutput('Carga un archivo CSV primero con el botón de cargar.');
    const duraciones = data.map((c) => c.Length);
    const totalSegundos = duraciones.reduce((a, b) => a + b, 0);
    const raices = duraciones.map((d) => Math.sqrt(d).toFixed(2));

    setNumpyOutput(
      `--- PROCEDIMIENTO 3 (NUMPY): TRANSFORMACIÓN VECTORIAL DE DURACIÓN ---\n` +
      `Tiempo Total: ${totalSegundos} segundos (${(totalSegundos / 60).toFixed(2)} minutos)\n` +
      `Duración Promedio: ${(totalSegundos / duraciones.length).toFixed(2)} segundos\n\n` +
      `Raíz Cuadrada por Elemento:\n[${raices.join(', ')}]`
    );
  };

  const numpyProc4 = () => {
    if (data.length === 0) return setNumpyOutput('Carga un archivo CSV primero con el botón de cargar.');
    const scores = data.map((c) => c.Energy * c.Danceability);
    const totalScore = scores.reduce((a, b) => a + b, 0);

    setNumpyOutput(
      `--- PROCEDIMIENTO 4 (NUMPY): PRODUCTO VECTORIAL (ENERGY * DANCEABILITY) ---\n` +
      `Multiplicación Elemento a Elemento [Energy * Danceability]:\n` +
      `[${scores.join(', ')}]\n\n` +
      `Puntaje Total Acumulado: ${totalScore}`
    );
  };

  const numpyProc5 = () => {
    if (data.length === 0) return setNumpyOutput('Carga un archivo CSV primero con el botón de cargar.');
    const popOrdenada = data.map((c) => c.Popularity).sort((a, b) => a - b);

    const getPercentile = (arr: number[], p: number) => {
      const idx = (arr.length - 1) * p;
      const lower = Math.floor(idx);
      const upper = Math.ceil(idx);
      const weight = idx - lower;
      return arr[lower] * (1 - weight) + arr[upper] * weight;
    };

    const q1 = getPercentile(popOrdenada, 0.25);
    const q2 = getPercentile(popOrdenada, 0.50);
    const q3 = getPercentile(popOrdenada, 0.75);

    setNumpyOutput(
      `--- PROCEDIMIENTO 5 (NUMPY): PERCENTILES DE POPULARIDAD ---\n` +
      `Popularidad Ordenada: [${popOrdenada.join(', ')}]\n\n` +
      `Percentil 25% (Q1): ${q1.toFixed(2)}\n` +
      `Percentil 50% (Mediana - Q2): ${q2.toFixed(2)}\n` +
      `Percentil 75% (Q3): ${q3.toFixed(2)}`
    );
  };

  // Operaciones Combinadas
  const ejecutarPN1 = () => {
    if (data.length === 0) return setPnOutput('Carga un archivo CSV primero con el botón de cargar.');
    const bpms = data.map((c) => c.BPM);
    const total = bpms.reduce((a, b) => a + b, 0);
    const media = total / bpms.length;
    const varianza = bpms.reduce((a, b) => a + Math.pow(b - media, 2), 0) / bpms.length;

    setPnOutput(
      `--- OPERACIÓN 1: ESTADÍSTICAS AVANZADAS DE BPM ---\n` +
      `Total Registros: ${bpms.length}\n` +
      `Suma Total BPM: ${total}\n` +
      `Media (Promedio): ${media.toFixed(2)}\n` +
      `Desviación Estándar: ${Math.sqrt(varianza).toFixed(2)}\n` +
      `BPM Máximo: ${Math.max(...bpms)}\n` +
      `BPM Mínimo: ${Math.min(...bpms)}`
    );
  };

  const ejecutarPN2 = () => {
    if (data.length === 0) return setPnOutput('Carga un archivo CSV primero con el botón de cargar.');
    const pop = data.map((c) => c.Popularity);
    const maxPop = Math.max(...pop);
    const minPop = Math.min(...pop);
    const diff = maxPop - minPop === 0 ? 1 : maxPop - minPop;
    const normalizados = pop.map((p) => ((p - minPop) / diff).toFixed(4));

    setPnOutput(
      `--- OPERACIÓN 2: NORMALIZACIÓN MIN-MAX DE POPULARIDAD ---\n` +
      `Valores Originales: [${pop.join(', ')}]\n\n` +
      `Arreglo Vectorial Normalizado (0 - 1):\n` +
      `[${normalizados.join(', ')}]`
    );
  };

  const ejecutarPN3 = () => {
    if (data.length === 0) return setPnOutput('Carga un archivo CSV primero con el botón de cargar.');
    const duraciones = data.map((c) => c.Length);
    const total = duraciones.reduce((a, b) => a + b, 0);
    const raices = duraciones.map((d) => Math.sqrt(d).toFixed(2));

    setPnOutput(
      `--- OPERACIÓN 3: TRANSFORMACIÓN VECTORIAL DE DURACIÓN ---\n` +
      `Suma Total Segundos: ${total}s\n` +
      `Promedio Duración: ${(total / duraciones.length).toFixed(2)}s\n\n` +
      `Transformación Vectorial (Raíz Cuadrada):\n` +
      `[${raices.join(', ')}]`
    );
  };

  const filteredData = data.filter(
    (item) =>
      item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* MENÚ LATERAL IZQUIERDO */}
      <aside className="sidebar-left">
        <h3>Navegación</h3>
        <nav className="sidebar-nav">
          <button 
            className={`tab-btn ${activeTab === 'pandas' ? 'active' : ''}`} 
            onClick={() => setActiveTab('pandas')}
          >
            📊 LIPPANDAS
          </button>
          <button 
            className={`tab-btn ${activeTab === 'numpy' ? 'active' : ''}`} 
            onClick={() => setActiveTab('numpy')}
          >
            🔢 LIPNUMPY
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reportes' ? 'active' : ''}`} 
            onClick={() => setActiveTab('reportes')}
          >
            📈 REPORTES
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pn' ? 'active' : ''}`} 
            onClick={() => setActiveTab('pn')}
          >
            ⚡ PANDAS &amp; NUMPY
          </button>
        </nav>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main className="main-viewport">
        <h2>Dashboard de Control</h2>

        {/* BARRA DE BÚSQUEDA */}
        <div className="dashboard-toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por canción, artista o género..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* PESTAÑA PANDAS */}
        {activeTab === 'pandas' && (
          <div>
            <h3>Sección LIPPANDAS</h3>
            <div className="dashboard-toolbar">
              <label className="btn-upload">
                📁 CARGAR CSV (LIPPANDAS)
                <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
              <button className="btn-action" onClick={pandasProc1}>P1: BPM &gt; 120</button>
              <button className="btn-action" onClick={pandasProc2}>P2: Top 5 Populares</button>
              <button className="btn-action" onClick={pandasProc3}>P3: Energía &lt; 50</button>
              <button className="btn-action" onClick={pandasProc4}>P4: Top Bailable</button>
              <button className="btn-action" onClick={pandasProc5}>P5: Alta Popularidad (&gt;=85)</button>
            </div>

            <div className="cards-grid">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div key={index} className="product-card">
                    <small>{item.Artist} - {item.Genre}</small>
                    <h4>{item.Title}</h4>
                    <p><strong>ID:</strong> #{item.ID}</p>
                    <p><strong>Álbum:</strong> {item.Album}</p>
                    <p><strong>BPM:</strong> {item.BPM}</p>
                    <p><strong>Popularidad:</strong> {item.Popularity}</p>
                    <p><strong>Duración:</strong> {item.Length}s</p>
                  </div>
                ))
              ) : (
                <p>No hay datos. Presiona el botón "📁 CARGAR CSV" para subir la información.</p>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA NUMPY */}
        {activeTab === 'numpy' && (
          <div>
            <h3>Sección LIPNUMPY</h3>
            <div className="dashboard-toolbar">
              <label className="btn-upload">
                📁 CARGAR CSV (LIPNUMPY)
                <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
              <button className="btn-action" onClick={numpyProc1}>P1: Estadística BPM</button>
              <button className="btn-action" onClick={numpyProc2}>P2: Normalizar Popularidad</button>
              <button className="btn-action" onClick={numpyProc3}>P3: Transformación Duración</button>
              <button className="btn-action" onClick={numpyProc4}>P4: Energía * Baile</button>
              <button className="btn-action" onClick={numpyProc5}>P5: Percentiles Popularidad</button>
            </div>
            <pre className="console-box">
              {numpyOutput || 'Selecciona una opción o carga un CSV.'}
            </pre>
          </div>
        )}

        {/* PESTAÑA REPORTES */}
        {activeTab === 'reportes' && (
          <div>
            <h3>Reportes Estadísticos</h3>
            <div className="dashboard-toolbar">
              <label className="btn-upload">
                📁 CARGAR CSV (REPORTES)
                <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            </div>
            {data.length > 0 ? (
              data.map((p, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <span>{p.Title} ({p.Artist}): Popularidad {p.Popularity}</span>
                </div>
              ))
            ) : (
              <p>No hay datos para mostrar el reporte. Presiona "📁 CARGAR CSV".</p>
            )}
          </div>
        )}

        {/* PESTAÑA INTEGRACIÓN */}
        {activeTab === 'pn' && (
          <div>
            <h3>Integración Pandas &amp; NumPy</h3>
            <div className="dashboard-toolbar">
              <label className="btn-upload">
                📁 CARGAR CSV (PANDAS &amp; NUMPY)
                <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
              <button className="btn-action" onClick={ejecutarPN1}>Op 1: Estadística BPM</button>
              <button className="btn-action" onClick={ejecutarPN2}>Op 2: Normalización Popularidad</button>
              <button className="btn-action" onClick={ejecutarPN3}>Op 3: Vectorización Duración</button>
            </div>
            <pre className="console-box">
              {pnOutput || 'Selecciona una opción o carga un CSV.'}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;