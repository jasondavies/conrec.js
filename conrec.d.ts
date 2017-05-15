declare module Conrec {
  class Point {
    x: number;
    y: number;
  }

  class Conrec {
    constructor (drawContour?: (startX: number, startY: number, endX: number, endY: number, contourLevel: number, k: number) => void);
    contour(d: number[][], ilb: number, iub: number, jlb: number, jub: number, x: number[], y: number[], nc: number, z: number[]): void;
    contourList(): Point[][];
  }
}

export = Conrec;
