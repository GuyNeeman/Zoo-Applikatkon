import { useState } from 'react'
import { MapContainer, TileLayer, Polygon, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const CENTER = [47.3755, 8.5445]
const ZOOM = 16

const ZOO_BORDER = [
  [47.3795, 8.5383],
  [47.3795, 8.5512],
  [47.3725, 8.5512],
  [47.3725, 8.5383],
]

const AREAS = [
  {
    id: 'savanne',
    name: 'Afrikanische Savanne',
    emoji: '🦁',
    category: 'tiere',
    color: '#8B6914',
    fillColor: '#D4A853',
    coords: [[47.3780, 8.5455], [47.3780, 8.5508], [47.3750, 8.5508], [47.3750, 8.5455]],
    tiere: ['🐘 Elefanten', '🦒 Giraffen', '🦓 Zebras', '🦁 Löwen'],
    info: 'Erlebe Elefanten, Giraffen und Zebras auf 4 Hektaren Savanne.',
  },
  {
    id: 'aquarium',
    name: 'Aquarium',
    emoji: '🐠',
    category: 'tiere',
    color: '#1565C0',
    fillColor: '#64B5F6',
    coords: [[47.3792, 8.5388], [47.3792, 8.5430], [47.3770, 8.5430], [47.3770, 8.5388]],
    tiere: ['🦈 Haie', '🐠 Tropenfische', '🐙 Oktopus', '🐡 Kugelfisch'],
    info: 'Über 200 Meeresarten auf zwei Stockwerken.',
  },
  {
    id: 'polarwelt',
    name: 'Polarwelt',
    emoji: '🐧',
    category: 'tiere',
    color: '#0277BD',
    fillColor: '#B3E5FC',
    coords: [[47.3792, 8.5430], [47.3792, 8.5455], [47.3770, 8.5455], [47.3770, 8.5430]],
    tiere: ['🐧 Pinguine', '🐻‍❄️ Eisbären', '🦭 Robben', '🦦 Seeotter'],
    info: 'Arktische Atmosphäre mit Pinguinen und Eisbären.',
  },
  {
    id: 'vogelwelt',
    name: 'Vogelwelt',
    emoji: '🦜',
    category: 'tiere',
    color: '#2E7D32',
    fillColor: '#A5D6A7',
    coords: [[47.3792, 8.5455], [47.3792, 8.5508], [47.3780, 8.5508], [47.3780, 8.5455]],
    tiere: ['🦜 Papageien', '🦩 Flamingos', '🦅 Adler', '🦚 Pfauen'],
    info: 'Über 150 Vogelarten in einer begehbaren Volière.',
  },
  {
    id: 'grosssaeuger',
    name: 'Grosssäuger',
    emoji: '🦍',
    category: 'tiere',
    color: '#6D4C41',
    fillColor: '#BCAAA4',
    coords: [[47.3770, 8.5388], [47.3770, 8.5435], [47.3750, 8.5435], [47.3750, 8.5388]],
    tiere: ['🦏 Nashörner', '🦍 Gorillas', '🦛 Flusspferde', '🐆 Leoparden'],
    info: 'Begegne den grössten Landtieren der Erde.',
  },
  {
    id: 'tropenhaus',
    name: 'Tropenhaus',
    emoji: '🌿',
    category: 'tiere',
    color: '#00695C',
    fillColor: '#80CBC4',
    coords: [[47.3770, 8.5435], [47.3770, 8.5455], [47.3750, 8.5455], [47.3750, 8.5435]],
    tiere: ['🦋 Schmetterlinge', '🐸 Frösche', '🦜 Tukane', '🐒 Affen'],
    info: 'Regenwald unter Glas — 30°C und tropisches Leben.',
  },
  {
    id: 'reptilien',
    name: 'Reptilienhaus',
    emoji: '🐊',
    category: 'tiere',
    color: '#33691E',
    fillColor: '#AED581',
    coords: [[47.3750, 8.5455], [47.3750, 8.5480], [47.3733, 8.5480], [47.3733, 8.5455]],
    tiere: ['🐊 Krokodile', '🐍 Pythons', '🦎 Warane', '🐢 Schildkröten'],
    info: 'Schlangenhaus, Krokodilbecken und exotische Reptilien.',
  },
  {
    id: 'kinderzoo',
    name: 'Kinderzoo',
    emoji: '🐑',
    category: 'tiere',
    color: '#C62828',
    fillColor: '#FFCDD2',
    coords: [[47.3750, 8.5480], [47.3750, 8.5508], [47.3733, 8.5508], [47.3733, 8.5480]],
    tiere: ['🐑 Schafe', '🐐 Ziegen', '🐇 Hasen', '🐴 Ponys'],
    info: 'Streichelzoo und Ponyreiten für unsere kleinsten Besucher.',
  },
]

const FACILITIES = [
  { id: 'eingang',    name: 'Haupteingang',    category: 'eingang',     icon: '🚪', pos: [47.3727, 8.5445] },
  { id: 'restaurant', name: 'Zoo Restaurant',  category: 'gastronomie', icon: '🍽️', pos: [47.3762, 8.5443] },
  { id: 'kiosk',      name: 'Kiosk Savanne',   category: 'gastronomie', icon: '☕', pos: [47.3765, 8.5480] },
  { id: 'wc1',        name: 'WC Nord',          category: 'wc',         icon: '🚻', pos: [47.3783, 8.5410] },
  { id: 'wc2',        name: 'WC Süd',           category: 'wc',         icon: '🚻', pos: [47.3741, 8.5465] },
  { id: 'shop',       name: 'Zoo Shop',         category: 'shop',       icon: '🛍️', pos: [47.3732, 8.5437] },
  { id: 'info',       name: 'Information',      category: 'info',       icon: 'ℹ️', pos: [47.3730, 8.5455] },
  { id: 'parking',    name: 'Parkplatz',        category: 'parking',    icon: '🅿️', pos: [47.3722, 8.5447] },
]

const FILTER_BUTTONS = [
  { id: 'all',         label: 'Alle',         color: '#374151' },
  { id: 'gastronomie', label: 'Gastronomie',  color: '#dc2626' },
  { id: 'wc',          label: 'WC',           color: '#6b7280' },
  { id: 'shop',        label: 'Shop',         color: '#7c3aed' },
  { id: 'info',        label: 'Info',         color: '#0369a1' },
]

const LEGEND_FACILITIES = [
  { icon: '🚪', label: 'Eingang' },
  { icon: '🍽️', label: 'Gastronomie' },
  { icon: '🚻', label: 'WC' },
  { icon: '🛍️', label: 'Shop' },
  { icon: 'ℹ️', label: 'Information' },
  { icon: '🅿️', label: 'Parkplatz' },
]

function markerIcon(emoji) {
  return L.divIcon({
    html: `<div style="
      background:white;border:2px solid #374151;border-radius:50%;
      width:32px;height:32px;display:flex;align-items:center;
      justify-content:center;font-size:16px;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
    ">${emoji}</div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  })
}

export default function ZooMap() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const shownFacilities = FACILITIES.filter(
    f => activeFilter === 'all' || f.category === activeFilter
  )

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', overflow: 'hidden' }}>

      {/* Sidebar */}
      <div style={{
        width: 265,
        flexShrink: 0,
        background: '#fff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 1000,
      }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <strong style={{ fontSize: '0.9rem', color: '#111827' }}>Kartenlegende</strong>
        </div>

        {/* Area legend */}
        <div style={{ padding: '12px 16px' }}>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bereiche</p>
          {AREAS.map(area => (
            <div
              key={area.id}
              onClick={() => setSelected(area)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 8px', borderRadius: 6, cursor: 'pointer', marginBottom: 2,
                background: selected?.id === area.id ? '#f3f4f6' : 'transparent',
              }}
            >
              <div style={{
                width: 13, height: 13, borderRadius: 3, flexShrink: 0,
                background: area.fillColor, border: `2px solid ${area.color}`,
              }} />
              <span style={{ fontSize: '0.82rem', color: '#374151' }}>{area.emoji} {area.name}</span>
            </div>
          ))}
        </div>

        {/* Facilities legend */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Einrichtungen</p>
          {LEGEND_FACILITIES.map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', fontSize: '0.82rem', color: '#374151' }}>
              <span>{f.icon}</span><span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Selected area info */}
        {selected && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', background: '#f9fafb', marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ausgewählt</p>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0, fontSize: 14 }}>✕</button>
            </div>
            <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '0.88rem', color: '#111827' }}>{selected.emoji} {selected.name}</p>
            <p style={{ margin: '0 0 8px', fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{selected.info}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {selected.tiere.map(t => (
                <span key={t} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 999, padding: '2px 8px', fontSize: '0.72rem', color: '#374151' }}>{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }}>

        {/* Filter buttons */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, display: 'flex', gap: 6 }}>
          {FILTER_BUTTONS.map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              style={{
                background: activeFilter === btn.id ? btn.color : '#fff',
                color: activeFilter === btn.id ? '#fff' : '#374151',
                border: `2px solid ${activeFilter === btn.id ? btn.color : '#e5e7eb'}`,
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <MapContainer center={CENTER} zoom={ZOOM} zoomControl={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />
          <ZoomControl position="topright" />

          {/* Zoo border */}
          <Polygon
            positions={ZOO_BORDER}
            pathOptions={{ color: '#374151', fillColor: '#f9fafb', fillOpacity: 0.08, weight: 3, dashArray: '8 4' }}
          />

          {/* Zoo areas */}
          {AREAS.map(area => (
            <Polygon
              key={area.id}
              positions={area.coords}
              pathOptions={{
                color: area.color,
                fillColor: area.fillColor,
                fillOpacity: selected?.id === area.id ? 0.75 : 0.45,
                weight: 2,
              }}
              eventHandlers={{ click: () => setSelected(area) }}
            >
              <Popup>
                <strong>{area.emoji} {area.name}</strong><br />
                <small style={{ color: '#6b7280' }}>{area.info}</small>
                <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {area.tiere.map(t => (
                    <span key={t} style={{ fontSize: 11, background: '#f3f4f6', borderRadius: 4, padding: '1px 5px' }}>{t}</span>
                  ))}
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Facility markers */}
          {shownFacilities.map(f => (
            <Marker key={f.id} position={f.pos} icon={markerIcon(f.icon)}>
              <Popup>{f.icon} {f.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
