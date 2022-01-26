// Create Konva stage
var stage = new Konva.Stage({
    container: 'canvas',   // id of container <div>
    width: 225,
    height: 400
});

// Apply a border to the stage so that it's visible
stage.getContainer().style.border = '1px solid white'

// When the user clicks "Add Logo"...
$("#add").on("click", function() {

    // Create a new Konva layer
    var layer = new Konva.Layer();

    // Add it to the stage
    stage.add(layer);

    // Create a Konva image object
    Konva.Image.fromURL('https://images.getbento.com/accounts/63e50d3a0270f2fe2c25af59b44fc235/media/images/logo-hero-white.png', function (imgNode) {
        
        imgNode.setAttrs({ // Set the image's properties
            x: 0, // Initial position
            y: 0,
            scaleX: 0.2, // Size
            scaleY: 0.2,
            draggable: true, // Can drag and drop around the stage
        });

        // Add the image object to the Konva layer
        layer.add(imgNode);
        
        // Create new transformer and add to the layer
        var tr = new Konva.Transformer();
        layer.add(tr);

        // Attach the transformer to the image node, and draw the la
        tr.attachTo(imgNode);
        layer.draw();
        
        // Make the mouse feel right
        imgNode.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });

        imgNode.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        imgNode.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        // User moves the Konva Image
        imgNode.on('dragmove', function() {

            // Send the Konva image to the moveNode function for processing
            moveNode(imgNode);

        });

        // User resizes box
        imgNode.on('transform', function() {

            // Send the Konva image to the moveNode function for processing
            moveNode(imgNode);

        });
    });

});

/**
 * Collect and process coordinate data from a Konva Image that has recently been
 * moved or resized, and convert into InDesign geometricBounds coordinates
 * @param {Konva Image} node A Konva Image object
 */

function moveNode (node) {
    
    // Get Konva Image x & y coordinate axis
    var x = node.x().toFixed(3);
    var y = node.y().toFixed(3);

    // Get the Konva Image's size
    var w = (node.width() * node.scaleX()).toFixed(3);
    var h = (node.height() * node.scaleY()).toFixed(3);

    // Create the x2, y2 for InDesign's geometricBounds
    var x2 = Number(y) + Number(h);
    var y2 = Number(x) + Number(w);
    
    // Update the DOM to display Konva's coordinates
    $("#konva-coords").text(`Konva Coordinates: x:${x}, y:${y}, w: ${w}, h: ${h}`)
    
    //InDesign geometricBounds:
    // [y1, x1, y2, x2]
        
    var inddBounds = [y, x, (y + h), (x + w)];

    $("#indd-coords").text(`InDesign Bounds: [${y}, ${x}, ${y2}, ${x2}]`);
    $("#inddCode").text(`
// Document Width: 225px
// Document Height: 400px
app.activeDocument.rectangles.add({
    strokeColor:"Black",
    strokeWidth:"1px",
    geometricBounds:[${inddBounds}]
})    
    `);
    
    
};

// User changes the tshirt's color...
$("#color").on("change", function() {
    var col = $("#color option:selected").val();
    $("#tshirt").css("background-color", col);
});