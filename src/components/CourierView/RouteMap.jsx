import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons (Vite/webpack asset issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Pasar Besar Malang koordinat
const ORIGIN = { lat: -7.9828, lng: 112.6306, label: 'Pasar Besar Malang' };
// Perpustakaan Universitas Negeri Malang
const DEST   = { lat: -7.9568, lng: 112.6177, label: 'Perpustakaan Univ. Negeri Malang' };

// Custom icon factory
function makeIcon(color, emoji) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      color:white;
      border:2px solid white;
      border-radius:2px;
      padding:4px 8px;
      font-size:11px;
      font-weight:800;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      display:flex;
      align-items:center;
      gap:4px;
    ">${emoji} ${color === '#00AA13' ? ORIGIN.label : DEST.label}</div>`,
    iconAnchor: [0, 0],
  });
}

export default function RouteMap() {
  const mapRef   = useRef(null);
  const mapInst  = useRef(null);
  const routeRef = useRef(null);
  const [info, setInfo] = useState({ distance: null, duration: null, status: 'loading' });

  useEffect(() => {
    if (mapInst.current) return; // already initialised

    // Init map centred between the two points
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([-7.9698, 112.6241], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Markers
    L.marker([ORIGIN.lat, ORIGIN.lng], { icon: makeIcon('#00AA13', '🏪') })
      .addTo(map)
      .bindPopup(`<b>${ORIGIN.label}</b><br>Titik Ambil (Hub)`);

    L.marker([DEST.lat, DEST.lng], { icon: makeIcon('#DC2626', '📍') })
      .addTo(map)
      .bindPopup(`<b>${DEST.label}</b><br>Tujuan Pengantaran`);

    mapInst.current = map;

    // Fetch route via OSRM public demo server (driving profile)
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${ORIGIN.lng},${ORIGIN.lat};${DEST.lng},${DEST.lat}` +
      `?overview=full&geometries=geojson&steps=false`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        const route = data.routes?.[0];
        if (!route) { setInfo({ status: 'error' }); return; }

        const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        const poly = L.polyline(coords, {
          color: '#0284C7',
          weight: 5,
          opacity: 0.85,
          dashArray: null,
        }).addTo(map);
        routeRef.current = poly;
        map.fitBounds(poly.getBounds(), { padding: [30, 30] });

        const km   = (route.distance / 1000).toFixed(1);
        const mins = Math.round(route.duration / 60);
        setInfo({ distance: km, duration: mins, status: 'ok' });
      })
      .catch(() => {
        // Fallback: straight dashed line if offline / OSRM unreachable
        const poly = L.polyline(
          [[ORIGIN.lat, ORIGIN.lng], [DEST.lat, DEST.lng]],
          { color: '#0284C7', weight: 4, dashArray: '10 8' }
        ).addTo(map);
        map.fitBounds(poly.getBounds(), { padding: [30, 30] });
        setInfo({ status: 'fallback', distance: '~2.9', duration: '~12' });
      });

    return () => {
      map.remove();
      mapInst.current = null;
    };
  }, []);

  return (
    <div style={{ position: 'relative', marginBottom: '18px' }}>
      {/* Map container */}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '280px',
          border: '1px solid #E5E9EF',
          borderRadius: '2px',
          zIndex: 0,
        }}
      />

      {/* Route info badge */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(4px)',
        padding: '6px 14px',
        borderRadius: '2px',
        fontSize: '11px',
        fontWeight: 700,
        color: '#1F2937',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {info.status === 'loading' && '⏳ Menghitung rute...'}
        {info.status === 'error'   && '⚠️ Rute tidak tersedia'}
        {(info.status === 'ok' || info.status === 'fallback') && (
          <>
            <span>🗺️ Pasar Besar → Perpustakaan UM</span>
            <span style={{ color: '#0284C7' }}>📏 {info.distance} km</span>
            <span style={{ color: '#00AA13' }}>⏱ ±{info.duration} menit</span>
            {info.status === 'fallback' && <span style={{ color: '#F59E0B' }}>(estimasi)</span>}
          </>
        )}
      </div>
    </div>
  );
}

