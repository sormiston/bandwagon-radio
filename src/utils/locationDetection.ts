import { getDistance } from "geolib";

const LOCATIONS = [
  {
    name: "Algarve",
    coords: { latitude: 37.017956, longitude: -7.930834 },
  },
  {
    name: "Lisbon",
    coords: { latitude: 38.722252, longitude: -9.139337 },
  },
];

export async function getClosestRegion() {
  if (navigator.geolocation) {
    return new Promise<string>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationsWithDistance = LOCATIONS.map((l) => ({
            ...l,
            distance: getDistance(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              l.coords
            ),
          }));

          const nearestLocation = locationsWithDistance.reduce((acc, l) =>
            acc.distance < l.distance ? acc : l
          );

          console.log(
            `Your coordinates are: ${position.coords.latitude}, ${
              position.coords.longitude
            }. The closest location is ${
              nearestLocation.name
            }, which is ${Math.round(nearestLocation.distance / 1000)}km away.`
          );
          resolve(nearestLocation.name);
        },

        () => {
          reject("Position could not be determined.");
        }
      );
    });
  } else {
    throw new Error("Geolocation is not supported by this browser.");
  }
}
