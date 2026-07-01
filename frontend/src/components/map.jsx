import { useState } from 'react'
import { MapContainer, Polygon, Polyline, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Eigenes Koordinatensystem: y=0 (unten/Eingang) → 800 (oben), x=0 (links) → 1000 (rechts)
// Kein Kartenmaterial – alles selbst gezeichnet

const BOUNDS = [[0, 0], [800, 1000]]

// Zoogengelände – organische unregelmässige Form
const ZOO_GROUND = [
  [18, 105], [20, 460], [20, 540], [22, 930],
  [160, 975], [790, 962], [796, 88],
  [500, 72], [200, 75],
]

// Wege – sandfarben
const PATHS = [
  { pos: [[20, 460], [182, 460]], w: 20 }, // Eingangsweg links
  { pos: [[20, 540], [182, 540]], w: 20 }, // Eingangsweg rechts
  { pos: [[182, 100], [182, 968]], w: 18 }, // Hauptpromenade
  { pos: [[372, 100], [372, 968]], w: 15 }, // Querweg 1
  { pos: [[562, 100], [562, 968]], w: 15 }, // Querweg 2
  { pos: [[182, 392], [790, 392]], w: 15 }, // Längsweg links
  { pos: [[182, 702], [790, 702]], w: 15 }, // Längsweg rechts
]

// 8 Zoo-Bereiche – jeweils eigene Polygon-Form
const AREAS = [
  {
    id: 'reptilien', name: 'Reptilienhaus', emoji: '🐊',
    color: '#2e6b16', fillColor: '#b5d97a',
    // Unregelmässiges Vieleck – leichter L-Einzug oben rechts
    coords: [[186, 96], [186, 388], [300, 390], [310, 340], [368, 342], [368, 96]],
    center: [268, 222],
    tiere: ['🐊 Krokodile', '🐍 Pythons', '🦎 Warane', '🐢 Schildkröten'],
    info: 'Schlangenhaus, Krokodilbecken und exotische Reptilien.',
  },
  {
    id: 'kinderzoo', name: 'Kinderzoo', emoji: '🐑',
    color: '#b71c1c', fillColor: '#ffcdd2',
    // Breites Areal – leichte Kurve oben
    coords: [[186, 396], [182, 700], [186, 968], [370, 972], [376, 700], [372, 396]],
    center: [278, 682],
    tiere: ['🐑 Schafe', '🐐 Ziegen', '🐇 Hasen', '🐴 Ponys'],
    info: 'Streichelzoo und Ponyreiten für die kleinsten Besucher.',
  },
  {
    id: 'tropenhaus', name: 'Tropenhaus', emoji: '🌿',
    color: '#00574a', fillColor: '#7ecfc9',
    // Trapezform – oben etwas breiter
    coords: [[376, 94], [376, 388], [558, 396], [560, 94]],
    center: [468, 242],
    tiere: ['🦋 Schmetterlinge', '🐸 Frösche', '🦜 Tukane', '🐒 Affen'],
    info: 'Regenwald unter Glas — 30°C und tropisches Leben.',
  },
  {
    id: 'grosssaeuger', name: 'Grosssäuger', emoji: '🦍',
    color: '#5d3e36', fillColor: '#c9b5b0',
    // Sechseck – abgerundete Ecken simuliert
    coords: [[376, 396], [370, 548], [376, 698], [560, 706], [564, 548], [558, 394]],
    center: [468, 548],
    tiere: ['🦏 Nashörner', '🦍 Gorillas', '🦛 Flusspferde', '🐆 Leoparden'],
    info: 'Begegne den grössten Landtieren der Erde.',
  },
  {
    id: 'aquarium', name: 'Aquarium', emoji: '🐠',
    color: '#0d4fa0', fillColor: '#6dc0f8',
    // Klassisch rechteckig – Aquarium ist ein Gebäude
    coords: [[376, 706], [376, 968], [558, 972], [560, 704]],
    center: [468, 838],
    tiere: ['🦈 Haie', '🐠 Tropenfische', '🐙 Oktopus', '🐡 Kugelfisch'],
    info: 'Über 200 Meeresarten auf zwei Stockwerken.',
  },
  {
    id: 'polarwelt', name: 'Polarwelt', emoji: '🐧',
    color: '#01579b', fillColor: '#b3e5fc',
    // Pentagon – linke Seite leicht schräg (folgt Zoogrenze)
    coords: [[566, 94], [566, 388], [788, 395], [792, 94]],
    center: [678, 242],
    tiere: ['🐧 Pinguine', '🐻‍❄️ Eisbären', '🦭 Robben', '🦦 Seeotter'],
    info: 'Arktische Atmosphäre mit Pinguinen und Eisbären.',
  },
  {
    id: 'vogelwelt', name: 'Vogelwelt', emoji: '🦜',
    color: '#1b5e20', fillColor: '#a8d9a8',
    // Leichter Bauch – Volière braucht Platz
    coords: [[566, 396], [560, 548], [566, 700], [790, 706], [794, 548], [790, 394]],
    center: [678, 548],
    tiere: ['🦜 Papageien', '🦩 Flamingos', '🦅 Adler', '🦚 Pfauen'],
    info: 'Über 150 Vogelarten in einer begehbaren Volière.',
  },
  {
    id: 'savanne', name: 'Afrikanische Savanne', emoji: '🦁',
    color: '#7a5700', fillColor: '#d4a84a',
    // Grosses Areal – folgt der Zoogrenze oben rechts
    coords: [[566, 706], [566, 958], [788, 964], [792, 706]],
    center: [678, 832],
    tiere: ['🐘 Elefanten', '🦒 Giraffen', '🦓 Zebras', '🦁 Löwen'],
    info: 'Erlebe Elefanten, Giraffen und Zebras auf 4 Hektaren Savanne.',
  },
]

const FACILITIES = [
  { id: 'eingang',    name: 'Haupteingang',  icon: '🚪', category: 'eingang',     pos: [10,  500] },
  { id: 'parking',   name: 'Parkplatz',      icon: '🅿️', category: 'parking',    pos: [50,  195] },
  { id: 'wc1',       name: 'WC Eingang',     icon: '🚻', category: 'wc',         pos: [98,  345] },
  { id: 'info',      name: 'Information',    icon: 'ℹ️', category: 'info',       pos: [98,  500] },
  { id: 'shop',      name: 'Zoo Shop',       icon: '🛍️', category: 'shop',      pos: [98,  648] },
  { id: 'restaurant',name: 'Zoo Restaurant', icon: '🍽️', category: 'gastronomie', pos: [182, 548] },
  { id: 'kiosk',     name: 'Kiosk Savanne',  icon: '☕', category: 'gastronomie', pos: [372, 548] },
  { id: 'wc2',       name: 'WC Mitte',       icon: '🚻', category: 'wc',         pos: [562, 242] },
]

const FILTER_BUTTONS = [
  { id: 'all',         label: 'Alle',        color: '#374151' },
  { id: 'gastronomie', label: 'Gastronomie', color: '#dc2626' },
  { id: 'wc',          label: 'WC',          color: '#6b7280' },
  { id: 'shop',        label: 'Shop',        color: '#7c3aed' },
  { id: 'info',        label: 'Info',        color: '#0369a1' },
]

const LEGEND_FACILITIES = [
  { icon: '🚪', label: 'Eingang' },
  { icon: '🍽️', label: 'Gastronomie' },
  { icon: '🚻', label: 'WC' },
  { icon: '🛍️', label: 'Shop' },
  { icon: 'ℹ️',  label: 'Information' },
  { icon: '🅿️', label: 'Parkplatz' },
]

function facilityIcon(emoji) {
  return L.divIcon({
    html: `<div style="
      background:white;border:2.5px solid #374151;border-radius:50%;
      width:30px;height:30px;display:flex;align-items:center;
      justify-content:center;font-size:14px;
      box-shadow:0 2px 6px rgba(0,0,0,0.28);
    ">${emoji}</div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -18],
  })
}

function labelIcon(emoji, name) {
  return L.divIcon({
    html: `<div style="text-align:center;pointer-events:none;user-select:none;">
      <div style="font-size:22px;line-height:1;">${emoji}</div>
      <div style="
        font-size:10px;font-weight:700;color:#1a1a1a;line-height:1.3;
        margin-top:2px;white-space:nowrap;
        text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 4px #fff;
      ">${name}</div>
    </div>`,
    className: '',
    iconSize: [100, 46],
    iconAnchor: [50, 23],
  })
}

export default function ZooMap() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selected, setSelected]         = useState(null)

  const visibleFacilities = FACILITIES.filter(
    f => activeFilter === 'all' || f.category === activeFilter
  )

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', overflow: 'hidden' }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 265, flexShrink: 0, background: '#fff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex', flexDirection: 'column', overflowY: 'auto', zIndex: 1000,
      }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <strong style={{ fontSize: '0.9rem', color: '#111827' }}>Kartenlegende</strong>
        </div>

        <div style={{ padding: '12px 16px' }}>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bereiche</p>
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

        <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Einrichtungen</p>
          {LEGEND_FACILITIES.map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', fontSize: '0.82rem', color: '#374151' }}>
              <span>{f.icon}</span><span>{f.label}</span>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', background: '#f9fafb', marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ausgewählt</p>
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

      {/* ── Karte ── */}
      <div style={{ flex: 1, position: 'relative' }}>

        {/* Filter-Buttons */}
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, display: 'flex', gap: 6 }}>
          {FILTER_BUTTONS.map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              style={{
                background: activeFilter === btn.id ? btn.color : '#fff',
                color: activeFilter === btn.id ? '#fff' : '#374151',
                border: `2px solid ${activeFilter === btn.id ? btn.color : '#e5e7eb'}`,
                borderRadius: 999, padding: '5px 14px',
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              }}
            >{btn.label}</button>
          ))}
        </div>

        <MapContainer
          crs={L.CRS.Simple}
          bounds={BOUNDS}
          boundsOptions={{ padding: [30, 30] }}
          minZoom={-2}
          maxZoom={3}
          zoomControl={false}
          style={{ height: '100%', width: '100%', background: '#8db87a' }}
        >
          <ZoomControl position="topright" />

          {/* Zoogengelände – hellgrüner Untergrund */}
          <Polygon
            positions={ZOO_GROUND}
            pathOptions={{ color: '#3a7d24', weight: 3, fillColor: '#a8d58a', fillOpacity: 1, dashArray: '10 5' }}
          />

          {/* Wege */}
          {PATHS.map((p, i) => (
            <Polyline
              key={i}
              positions={p.pos}
              pathOptions={{ color: '#e8d09a', weight: p.w, lineCap: 'round', lineJoin: 'round', opacity: 1 }}
            />
          ))}

          {/* Bereiche */}
          {AREAS.map(area => (
            <Polygon
              key={area.id}
              positions={area.coords}
              pathOptions={{
                color: area.color,
                weight: 2.5,
                fillColor: area.fillColor,
                fillOpacity: selected?.id === area.id ? 0.88 : 0.7,
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

          {/* Bereichsbeschriftungen */}
          {AREAS.map(area => (
            <Marker
              key={`label-${area.id}`}
              position={area.center}
              icon={labelIcon(area.emoji, area.name)}
              interactive={false}
            />
          ))}

          {/* Einrichtungs-Marker */}
          {visibleFacilities.map(f => (
            <Marker key={f.id} position={f.pos} icon={facilityIcon(f.icon)}>
              <Popup>{f.icon} {f.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
