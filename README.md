This is a JavaScript implementation of the CONREC contouring algorithm, which
operates on a grid of z-values.

If no contour-drawing function is specified, it builds a list of contour
vectors that can be accessed via .contourList().

Example:

    var data = [[0, 1, 0], [1, 2, 1], [0, 1, 0]];
    var c = new Conrec;
    c.contour(data, 0, 2, 0, 2, [1, 2, 3], [1, 2, 3], 3, [0, 1, 2]);
    // c.contours will now contain vectors in the form of doubly-linked lists.
    // c.contourList() will return an array of vectors in the form of arrays.
