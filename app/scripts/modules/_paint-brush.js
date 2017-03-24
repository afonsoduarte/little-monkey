import Utils from './_utils.js';
import paper from 'paper';

window.paintBrushTool = new paper.Tool();
window.paintBrushTool.minDistance = 10;
window.paintBrushTool.maxDistance = 45;

var paintBrushPath;

var PaintBrush = function() {
  this.init();
}

PaintBrush.prototype = {
  init: function () {
    this.registerEventHandlers();
  },

  registerEventHandlers: function () {
    window.paintBrushTool.onMouseDown = this.mouseDownHandler;
    window.paintBrushTool.onMouseDrag = this.mouseDragHandler;
    window.paintBrushTool.onMouseUp = this.mouseUpHandler;
    window.paintBrushTool.activate();
  },

  mouseDownHandler: function (e) {
    paintBrushPath = new paper.Path();
    paintBrushPath.fillColor = {
      hue: Math.random() * 360,
      saturation: 1,
      brightness: 1
    };

    paintBrushPath.add(e.point);
  },

  mouseDragHandler: function (e) {
    var step = new paper.Point(e.delta.x / 2, e.delta.y / 2);
    step.angle += 90;

    var top = new paper.Point(e.middlePoint.x + step.x, e.middlePoint.y + step.y);
    var bottom = new paper.Point(e.middlePoint.x - step.x, e.middlePoint.y - step.y);
    
    paintBrushPath.add(top);
    paintBrushPath.insert(0, bottom);
    paintBrushPath.smooth();
  },

  mouseUpHandler: function (e) {
    paintBrushPath.add(e.point);
    paintBrushPath.closed = true;
    paintBrushPath.smooth();
  }
};

document.querySelector(".paint-brush-toggle").addEventListener('click', function() {
  paper.project.clear();
  window.paintBrush = new PaintBrush();
}, false);
