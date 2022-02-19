import { minBy, maxBy, flattenDeep } from "lodash";

export const getBounds = (coordinates) => {
  let flattenCoordinates = flattenDeep(coordinates);

  let longs = [...flattenCoordinates].filter((coord, index) => index % 2 === 0);
  let lats = [...flattenCoordinates].filter((coord, index) => index % 2 === 1);
  return [
    [minBy(longs), minBy(lats)],
    [maxBy(longs), maxBy(lats)],
  ];
};
