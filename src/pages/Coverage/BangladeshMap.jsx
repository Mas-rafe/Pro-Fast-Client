import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { useState } from 'react';



const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

//Helper component to move map
function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 14, { duration: 1.5 });
    }
    return null;
}

const BangladeshMap = ({ serviceCenters }) => {
    const [searchText, setSearchText] = useState('');
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistricts] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const district = serviceCenters.find(d => d.district.toLowerCase().includes(searchText.toLowerCase())
        );
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistricts(district.district);
        }
    }
    return (
        
            
            <div className='h-[600px] w-6xl mx-auto overflow-hidden shadow-lg  rounded-2xl relative'>

                <form onSubmit={handleSearch} className='flex  absolute top-4 left-1/2 transform -translate-x-1/2  z-[1000]  w-full  max-w-md  px-4 bg-primary rounded-tl-3xl rounded-br-3xl'>
                    <input type="text" placeholder='Search District...' className='flex-1 px-4 py-2  '
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />

                    <button type='submit' className='btn bg-secondary text-white m-1 rounded-br-3xl rounded-tl-3xl '> Go </button>

                </form>

                {/* map container */}
                <MapContainer center={[23.685, 90.3563]} zoom={7} style={{ height: '600px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FlyToDistrict coords={activeCoords} />
                    {
                        serviceCenters.map((center, index) =>
                            <Marker key={index} position={[center.latitude, center.longitude]}
                                icon={customIcon}>
                                <Popup autoOpen={center.district === activeDistrict}>
                                    <strong>{center.district}</strong> <br />
                                    {center.covered_area.join(' , ')}
                                </Popup>
                            </Marker>)
                    }



                </MapContainer>
            </div>
        
    );
};

export default BangladeshMap;
