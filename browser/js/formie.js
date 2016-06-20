//==============================================================================
// formie.js
//==============================================================================

var formations = [];
var group = new Group();

function addPerformer(position) {
    var newPerformer = new Path.Circle(position, 20);
    newPerformer.fillColor = 'yellow';
    group.addChild(newPerformer);
}

function removePerformer(group) {
    group.removeChildren();
}

function onMouseUp(event) {
    if(window.mode === 'add') {
        var performer = addPerformer(event.point);
    }
    if(window.mode === 'new') {
        formations.push(group);
        removePerformer(group);
        group =  new Group();
        window.mode = 'add';
    }
    if(window.mode === 'undo') {
        removePerformer(group);
    }
}

// intersection finder method
// function showIntersections(path1, path2) {
//     var intersections = path1.getIntersections(path2);
//     for (var i = 0; i < intersections.length; i++) {
//         new Path.Circle({
//             center: intersections[i].point,
//             radius: 5,
//             fillColor: '#009dec'
//         }).removeOnMove();
//     }
// }

// animations handler
function onFrame(event) {}

//==============================================================================
// Grid drawing function
// If grid-prexists, it removes it and redraws it
// Grid lines span only the current viewport
//==============================================================================
function drawGrid (cellSize) {
    
    this.cellSize = cellSize;
    this.gridColor = '#D0D0D0';
    this.gridGroup;
    
    var self = this;

    var boundingRect = view.bounds;
    var num_rectangles_wide = view.bounds.width / this.cellSize;
    var num_rectangles_tall = view.bounds.height / this.cellSize;

    
    this.createGrid = function() {
        
        gridGroup = new Group();
        
        for (var i = 0; i <= num_rectangles_wide; i++) {
            var correctedLeftBounds = Math.ceil(boundingRect.left / self.cellSize) * self.cellSize;
            var xPos = correctedLeftBounds + i * self.cellSize;
            var topPoint = new Point(xPos, boundingRect.top);
            var bottomPoint = new Point(xPos, boundingRect.bottom);
            var gridLine = new Path.Line(topPoint, bottomPoint);
            gridLine.strokeColor = self.gridColor;
            gridLine.strokeWidth = 1 / view.zoom;
    
            self.gridGroup.addChild(gridLine);
        }
    
        for (var i = 0; i <= num_rectangles_tall; i++) {
            var correctedTopBounds = Math.ceil(boundingRect.top / self.cellSize) * self.cellSize;
            var yPos = correctedTopBounds + i * self.cellSize;
            var leftPoint = new Point(boundingRect.left, yPos);
            var rightPoint = new Point(boundingRect.right, yPos);
            var gridLine = new Path.Line(leftPoint, rightPoint);
            
            gridLine.strokeColor = self.gridColor;
            gridLine.strokeWidth = 1 / view.zoom;
            self.gridGroup.addChild(gridLine);
        }
        gridGroup.sendToBack();
        view.update();
    }
    
    this.removeGrid = function() {
        for (var i = 0; i < gridGroup.children.length-1; i++) {
          gridGroup.children[i].remove();
        }
        gridGroup.remove();
    }
    
    if(typeof gridGroup === 'undefined') {
        this.createGrid();
    } else {
        this.removeGrid();
        this.createGrid();
    }
}
drawGrid(75);

// Zoom Scroll
// We redraw the grid on each zoom-step
$('.gui-context').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event){ 
    if (event.originalEvent.wheelDelta >= 0) {
        if(view.zoom>10) return false;
        view.zoom +=0.1;
    }
    else {
        if(view.zoom<1) return false;
        view.zoom -=0.1;
    }
    drawGrid(100);
});