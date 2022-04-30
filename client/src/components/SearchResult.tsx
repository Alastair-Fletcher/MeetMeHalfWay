import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Airports, Destination, Origin } from '../interfaces';

interface Props {
  allAirports: Airports[];
  originAirports: string[];
  destinationCities: Destination[];
  // airportLocation: AirportLocation;
}

interface Interface {
  code: string;
  name: string;
  lat: number;
  lon: number;
}

const SearchResult = ({
  originAirports,
  allAirports,
  destinationCities,
}: Props) => {
  // -- Create an array of origin airports with geo-location
  let originAirportGeoLocation: Interface[] = [];
  // console.log(
  //   originAirportGeoLocation,
  //   'ORIGIN AIRPORT',
  //   originAirports,
  //   'ORIGIN AIRPORTS'
  // );
  console.log(originAirports, 'AIRPORTS DAMNIT');
  for (let originCode of originAirports) {
    console.log(originCode, 'ORIGIN CODE');
    let airportLocation: Interface;

    for (let airport of allAirports) {
      console.log(originCode, 'ORIGIN FAILURE');
      if (airport.code === originCode) {
        airportLocation = {
          code: originCode,
          name: airport.name,
          lat: Number(airport.lat),
          lon: Number(airport.lon),
        };
        originAirportGeoLocation.push(airportLocation);
      } else {
        // console.log(airport.code, 'AIRPORT FAILURE');
      }
    }
  }

  // -- Create an array of destination cities with geo-location
  let destinationCityGeoLocation: Interface[] = [];
  let destCityLength = !destinationCities ? 0 : destinationCities.length;
  for (let i = 0; i < destCityLength; i++) {
    let destCityLocation: Interface;
    for (let airport of allAirports) {
      if (airport.code === destinationCities[i].iataCode) {
        destCityLocation = {
          code: airport.code,
          name: destinationCities[i].name,
          lat: Number(airport.lat),
          lon: Number(airport.lon),
        };
        destinationCityGeoLocation.push(destCityLocation);
        if (!destCityLocation.code) {
          destinationCityGeoLocation.push({
            code: destinationCities[i].iataCode,
            name: destinationCities[i].name,
            lat: 9999,
            lon: 9999,
          });
        }
      }
    }
  }

  // -- Custom icons
  const originIcon = new Icon({
    iconUrl: '/icons8-location-64.png',
    iconSize: [33, 33],
    // iconAnchor: [1, 1],
    // popupAnchor: [-0, -76]
  });
  const destIcon = new Icon({
    iconUrl: '/icons8-select-24.png',
    iconSize: [17, 17],
    // iconAnchor: [22, 94],
    // popupAnchor: [-0, -76]
  });

  // -- Dev
  console.log(originAirportGeoLocation, 'ORIGINAL AIRPORT');
  return (
    <div className="SearchResult">
      <MapContainer center={[37, 10]} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Origin airport markers */}
        {originAirportGeoLocation.map((origin) => {
          console.log(origin, 'ORIGIN');
          return (
            <Marker
              key={origin.code}
              position={[origin.lat, origin.lon]}
              icon={originIcon}
            >
              <Popup>
                {origin.name} ({origin.code})
              </Popup>
            </Marker>
          );
        })}

        {/* Destination city markers */}
        {destinationCityGeoLocation.map((destination) => {
          // console.log(destination, 'destination');

          return (
            <Marker
              key={destination.name}
              position={[destination.lat, destination.lon]}
              icon={destIcon}
            >
              <Popup minWidth={70} maxWidth={70}>
                {destination.name} ({destination.code})
                <br />
                <div className="map-popup-flight-list">
                  ✈︎
                  {originAirports.map((airport) => {
                    return (
                      <div className="map-popup-flight-list-item">
                        <a
                          href={`https://www.skyscanner.de/transport/flights/${airport}/${destination.code}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          &nbsp;{airport}-{destination.code}&nbsp;
                        </a>
                        ✈︎
                      </div>
                    );
                  })}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <section className="list-of-destination-city-names" id="footer">
        {destinationCities.length > 0 &&
          destinationCities.map((city) => {
            return (
              <p key={city.name} className="destination-city-name">
                {city.name}
              </p>
            );
          })}
      </section>
    </div>
  );
};

export default SearchResult;
