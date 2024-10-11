export let map = {
  objectTypes: {
    table: {
      shape: "polygon",
      points: [
        [-0.5, -1],
        [-0.5, 1],
        [0.5, 1],
        [0.5, -1],
      ],
      options: {
        fillColor: "#fff",
        fillOpacity: 1,
        color: "#aaa",
        weight: 2,
      },
    },
  },
  objects: [
    {
      type: "table",
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
    },
  ],
};
