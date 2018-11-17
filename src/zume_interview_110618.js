/*


Imagine we have an image. We'll represent this image as a simple 2D array where every pixel is a 1 or a 0. The image you get is known to have a single rectangle of 0s on a background of 1s.

Write a function that takes in the image and returns the coordinates of the rectangle of 0's -- either top-left and bottom-right; or top-left, width, and height.

Sample output:
x: 3, y: 2, width: 3, height: 2
2,3 3,5
3,2 5,3 -- it's ok to reverse columns/rows as long as you're consistent

Imagine we have an image. We'll represent this image as a simple 2D array where every pixel is a 1 or a 0.

The image you get is known to have multiple rectangles of 0s on a background of 1s. Write a function that takes in the image and outputs the coordinates of all the 0 rectangles -- top-left and bottom-right; or top-left, width and height.

Sample output (using top-left and bottom-right):
[[[2,3],[3,5]],
 [[3,1],[5,1]],
 [[5,3],[6,4]]]

Sample output (using top-left and width/height):
[[(2, 3), (3, 2)],
[(3, 1), (1, 3)],
[(5, 3), (2, 2)]]

*/

var image = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];




function findZero(image) {
  // TODO check for empty
  let topLeft = null;
  let bottomRight = null;
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      let value = image[i][j];
      if (value === 0 && !topLeft) {
        topLeft = [i,j];
      }
      if ((value === 1 && image[i][j - 1] === 0)) {
        bottomRight = [i, j - 1];
      }
      if ((j === image[i].length - 1 && value === 0)) {
        bottomRight = [i, j];
      }
    }
  }
  return {
    topLeft,
    bottomRight,
  }
}


function findZeros(image) {
  const groups = [];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      let value = image[i][j];
      if (value === 0) {
        let group = findGroup(i,j, groups);
        if (!group) {
          groups.push([[i,j]])
        } else {
          group.push(i,j)
        }
      }
    }
  }

  let corners = groups.map(group => {
    return [group[0], group[group.length - 1]];
  });

  return corners;
}

function findGroup(i, j, groups) {
  let groupIndex = null;
  for (let k = 0; k < groups.length; k++) {
    if (isAdjacent(i, j, groups[k])) {
      return groups[k];
    }
  }
}

function isAdjacent(i, j, group) {
  for (let index of group) {
    console.log("INDEX:", index)
    if (Math.abs(index[0] - i) <= 1 || Math.abs(index[1] - j) <= 1) {
      return true
    }
  }
}


// console.log(findZero(image3));
// console.log(findZeros(image))

let group = [[3, 2],[4, 2]]

console.log(isAdjacent(1, 2, group))