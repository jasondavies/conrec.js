declare namespace conrec {
  interface ContourPoint {
    x: number;
    y: number;
  }

  interface ContourPolyline extends Array<ContourPoint> {
    level: number;
    k: string;
  }

  type DrawContour = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    contourLevel: number,
    k: number
  ) => void;

  interface ContourNode {
    p: ContourPoint;
    prev?: ContourNode | null;
    next?: ContourNode | null;
  }

  interface ContourSequence {
    head: ContourNode;
    tail: ContourNode;
    next: ContourSequence | null;
    prev: ContourSequence | null;
    closed: boolean;
  }

  interface ContourBuilder {
    level: number;
    s: ContourSequence | null;
    count: number;
  }

  class Conrec {
    constructor(drawContour?: DrawContour);

    drawContour: DrawContour;
    contours?: Record<number, ContourBuilder>;

    contour(
      d: number[][],
      ilb: number,
      iub: number,
      jlb: number,
      jub: number,
      x: number[],
      y: number[],
      nc: number,
      z: number[]
    ): void;

    contourList?(): ContourPolyline[];
  }
}

declare global {
  var Conrec: typeof conrec.Conrec;

  interface Window {
    Conrec: typeof conrec.Conrec;
  }
}

declare const conrecExport: {
  Conrec: typeof conrec.Conrec;
};

export = conrecExport;
