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
            distance: getDistance(position.coords, l.coords),
          }));

          const nearestLocation = locationsWithDistance.reduce((acc, l) =>
            acc.distance < l.distance ? acc : l
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
