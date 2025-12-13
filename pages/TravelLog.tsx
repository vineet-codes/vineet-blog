import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';
import { TRAVEL_DATA } from '../constants';
import { TravelEntry } from '../types';

// Fix for default marker icon in React Leaflet
// We will use a custom divIcon anyway, but good to have just in case
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper to parse coordinate string to number
const parseCoord = (coord: string): number => {
  const match = coord.match(/([\d.]+)[°\s]*([NSEW])/i);
  if (match) {
    let val = parseFloat(match[1]);
    const dir = match[2].toUpperCase();
    if (dir === 'S' || dir === 'W') val = -val;
    return val;
  }
  // Try parsing directly if it's just a number string
  const num = parseFloat(coord);
  return isNaN(num) ? 0 : num;
};

// Helper component to fix map rendering issues (grey tiles)
const MapFix = () => {
  const map = useMap();
  useEffect(() => {
    // Invalidate size after a slight delay to account for any entry animations
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

// Helper component to handle map view changes
const MapUpdater: React.FC<{ center: [number, number] | null; zoom?: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, {
        duration: 2
      });
    }
  }, [center, zoom, map]);
  return null;
};

const TravelLog: React.FC = () => {
  const { mode, theme } = useTheme();
  const [view, setView] = useState<'index' | 'map'>('index');
  const [selectedLocation, setSelectedLocation] = useState<{ center: [number, number]; zoom: number } | null>(null);

  const customIcon = new L.DivIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${theme.hex}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.5);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

  const handleLocationClick = (entry: TravelEntry) => {
    const lat = parseCoord(entry.lat);
    const lng = parseCoord(entry.lng);
    setSelectedLocation({ center: [lat, lng], zoom: 13 });
    setView('map');
  };

  const handleMapSwitch = () => {
    // Reset to global view
    setSelectedLocation({ center: [20, 0], zoom: 2 });
    setView('map');
  };

  return (
    <div className={`min-h-screen ${mode.bg} ${mode.text} ${mode.grid} transition-colors duration-500`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-40 ${mode.bg} border-b ${mode.border} px-6 md:px-12 py-6 flex justify-between items-end`}>
        <div className="flex flex-col justify-between h-full">
          <div className={`font-mono text-[10px] uppercase tracking-widest ${mode.textMuted} mb-4`}>
            Log / V.01
          </div>
          <div>
             <Link to="/" className={`block mb-4 font-mono text-xs uppercase tracking-widest hover:underline ${theme.classes.hoverText}`}>
                ← Close
             </Link>
             <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Terra <br className="md:hidden"/> Incognita<span className={theme.classes.text}>.</span>
             </h1>
             <p className={`hidden md:block font-mono text-xs uppercase tracking-widest ${mode.textMuted} mt-2`}>
                A log of places i have travelled to in the world
             </p>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-2">
            <div className={`font-mono text-[10px] uppercase tracking-widest ${mode.textMuted} mb-1`}>
                [View Mode]
            </div>
            <div className="flex border border-stone-700 rounded-sm overflow-hidden">
                <button 
                    onClick={() => setView('index')}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${view === 'index' ? theme.classes.bg + ' text-white' : 'hover:bg-stone-800'}`}
                >
                    Index
                </button>
                <button 
                    onClick={handleMapSwitch}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${view === 'map' ? theme.classes.bg + ' text-white' : 'hover:bg-stone-800'}`}
                >
                    Map
                </button>
            </div>
        </div>
      </header>
      
      {/* Mobile Switcher - Fixed Bottom */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
            <div className={`font-mono text-[10px] uppercase tracking-widest ${mode.textMuted} bg-black/80 px-2 py-0.5 rounded backdrop-blur-md border ${mode.border}`}>
                [View Mode]
            </div>
            <div className={`flex border ${mode.border} rounded-sm overflow-hidden shadow-2xl ${mode.bg}`}>
                <button 
                    onClick={() => setView('index')}
                    className={`px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${view === 'index' ? theme.classes.bg + ' text-white' : 'hover:bg-stone-800'}`}
                >
                    Index
                </button>
                <button 
                    onClick={handleMapSwitch}
                    className={`px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${view === 'map' ? theme.classes.bg + ' text-white' : 'hover:bg-stone-800'}`}
                >
                    Map
                </button>
            </div>
      </div>

      {/* Main Content */}
      <main className="pt-48 md:pt-56 pb-20 px-0">
        
        {view === 'index' ? (
             <div className="animate-[fadeIn_0.5s_ease-out] border-t border-b ${mode.border}">
                {/* Section Header */}
                <div className={`py-4 border-b ${mode.border} flex justify-between items-center px-4`}>
                    <span className={`font-mono text-xs uppercase tracking-widest ${mode.textMuted}`}>Index // 01-{String(TRAVEL_DATA.length).padStart(2, '0')}</span>
                </div>

                {/* List Items */}
                <div className="divide-y divide-stone-800">
                    {[...TRAVEL_DATA]
                        .sort((a, b) => parseInt(a.year) - parseInt(b.year)) // Sort chronological first (Oldest -> Newest)
                        .map((entry, index) => ({ ...entry, id: String(index + 1).padStart(2, '0') })) // Generate IDs based on sorted order
                        .reverse() // Reverse for display (Newest First)
                        .map((entry) => (
                        <div 
                            key={`${entry.city}-${entry.year}`} 
                            onClick={() => handleLocationClick(entry)}
                            className={`group grid grid-cols-1 md:grid-cols-12 ${mode.bg} transition-colors hover:bg-stone-800/30 cursor-pointer`}
                        >
                             
                             {/* Mobile Header (Index/Date) */}
                             <div className={`md:col-span-2 p-4 md:border-r ${mode.border} flex flex-row md:flex-col justify-between md:justify-start gap-1`}>
                                <span className="font-mono text-xs opacity-50">{entry.id} //</span>
                                <span className="font-mono text-xs">{entry.year}</span>
                             </div>

                             {/* Location */}
                             <div className={`md:col-span-5 p-4 md:border-r ${mode.border} flex flex-col justify-center`}>
                                <h3 className={`text-3xl md:text-5xl font-black uppercase leading-none mb-1 group-hover:translate-x-2 transition-transform duration-300`}>
                                    {entry.city}
                                </h3>
                                <span className={`font-mono text-xs uppercase tracking-widest ${theme.classes.text} font-bold`}>
                                    {entry.country}
                                </span>
                             </div>

                             {/* Coords & Tags */}
                             <div className={`md:col-span-5 p-4 flex flex-col justify-center gap-4`}>
                                 <div className="flex justify-between items-center w-full">
                                    <div className="font-mono text-xs opacity-60">
                                        <div>LAT: {entry.lat}</div>
                                        <div>LNG: {entry.lng}</div>
                                    </div>
                                    <div className="hidden md:block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 ${theme.classes.text}`}>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                 </div>
                                 <div className="flex flex-wrap gap-2">
                                    {entry.tags.map(tag => (
                                        <span key={tag} className={`text-[10px] border ${mode.border} px-2 py-0.5 rounded-full uppercase tracking-wider ${mode.textMuted} group-hover:border-current transition-colors`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        ) : (
            <div className="animate-[fadeIn_0.5s_ease-out] h-[70vh] w-full border border-stone-800 relative">
                <MapContainer 
                    center={[20, 0]} 
                    zoom={2} 
                    scrollWheelZoom={true} 
                    style={{ height: '100%', width: '100%', background: '#1c1917' }}
                >
                    <MapFix />
                    {selectedLocation && (
                        <MapUpdater center={selectedLocation.center} zoom={selectedLocation.zoom} />
                    )}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    {TRAVEL_DATA.map((entry) => {
                        const lat = parseCoord(entry.lat);
                        const lng = parseCoord(entry.lng);
                        return (
                        <Marker 
                            key={`${entry.city}-${entry.year}`} 
                            position={[lat, lng]} 
                            icon={customIcon}
                        >
                            <Popup className="custom-popup">
                                <div className="p-2 font-mono text-xs">
                                    <strong className="block text-sm uppercase mb-1">{entry.city}</strong>
                                    <span className="opacity-70">{entry.country}</span>
                                </div>
                            </Popup>
                        </Marker>
                        );
                    })}
                </MapContainer>
                
                {/* Map Overlay Info */}
                <div className="absolute bottom-4 left-4 z-[400] bg-black/80 p-4 border border-stone-800 backdrop-blur-sm pointer-events-none">
                     <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                        SYS: Leaflet.js <br/>
                        LOC: Global Projection
                     </div>
                </div>
            </div>
        )}

      </main>

      <style>{`
        .leaflet-container {
            background: #1c1917;
        }
        .leaflet-popup-content-wrapper {
            background: #1c1917;
            color: #d6d3d1;
            border: 1px solid #44403c;
            border-radius: 2px;
        }
        .leaflet-popup-tip {
            background: #1c1917;
            border: 1px solid #44403c;
        }
        .leaflet-bar a {
            background-color: #1c1917 !important;
            color: #d6d3d1 !important;
            border-bottom: 1px solid #44403c !important;
        }
        .leaflet-bar {
            border: 1px solid #44403c !important;
        }
      `}</style>
    </div>
  );
};

export default TravelLog;

