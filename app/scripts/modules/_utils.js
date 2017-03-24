var Utils = {
  random: function (min, max) {
    if(!max) max = min; min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  randomFromArray: function (arr) {
    return arr[ this.random(arr.length) ];
  }
} 

export default Utils;

