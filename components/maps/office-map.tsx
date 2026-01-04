"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Custom Numbered Icon for "Session" Look
const createNumberedIcon = (number: number) => new L.DivIcon({
    className: "custom-marker-icon",
    html: `
        <div class="relative flex items-center justify-center w-10 h-10 group cursor-pointer transition-transform duration-300 hover:scale-110">
            <div class="absolute w-full h-full bg-[#FCD34D] rounded-full shadow-lg border-2 border-white"></div>
            <span class="relative z-10 font-bold text-[#0F172A] text-sm">${number}</span>
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
});

interface Office {
    city: string;
    address: string;
    coordinates?: number[];
}

interface OfficeMapProps {
    offices: Office[];
    selectedCity?: string | null;
}

function MapUpdater({ selectedCity, offices }: { selectedCity?: string | null, offices: Office[] }) {
    const map = useMap();

    useEffect(() => {
        if (selectedCity) {
            const office = offices.find(o => o.city === selectedCity);
            if (office && office.coordinates) {
                map.flyTo(office.coordinates as L.LatLngExpression, 6, {
                    animate: true,
                    duration: 1.2
                });
            }
        }
    }, [selectedCity, map, offices]);

    return null;
}

export default function OfficeMap({ offices, selectedCity }: OfficeMapProps) {
    // Default center (approx middle of the active regions: Europe/ME/India)
    const defaultCenter: L.LatLngExpression = [25, 55];
    const defaultZoom = 2.5;

    return (
        <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            minZoom={2}
            maxZoom={12}
            style={{ height: "100%", width: "100%", background: "#FDFBF7" }} // Light Cream Background
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
        >
            {/* Positron (Light) Tiles for Clean Vector Look */}
            <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            <MapUpdater selectedCity={selectedCity} offices={offices} />

            {offices.map((office, index) => (
                office.coordinates && (
                    <Marker
                        key={office.city}
                        position={office.coordinates as L.LatLngExpression}
                        icon={createNumberedIcon(index + 1)}
                    >
                        <Popup
                            className="custom-popup-light"
                            closeButton={false}
                        >
                            <div className="p-3 min-w-[180px] bg-white rounded-xl shadow-xl border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-[#0F172A] text-sm">{office.city}</h3>
                                    <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-50 pt-2">{office.address}</p>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
}
