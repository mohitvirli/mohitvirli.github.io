import * as THREE from "three";

export function TriangleGeometry({ points }: { points: number[][] }) {
  const geometry = new THREE.BufferGeometry();

  // Convert the points array to a flat Float32Array for the buffer
  const vertices = new Float32Array(points.flat());

  // Set the vertices
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  // Calculate normals
  geometry.computeVertexNormals();

  // Calculate UVs for texture mapping
  // This is a simple mapping, you might want to adjust based on your points
  const uvs = new Float32Array([
    0.5, 0,    // first point
    0, 1,      // second point
    1, 1       // third point
  ]);

  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  return geometry;
}
