// Create Konva stage
var stage = new Konva.Stage({
    container: 'canvas',   // id of container <div>
    width: 225,
    height: 400
  });
  
  stage.getContainer().style.border = '1px solid white'
  
  $("#add").on("click", function() {
    
        var layer = new Konva.Layer();
        stage.add(layer);
    
        Konva.Image.fromURL('https://images.getbento.com/accounts/63e50d3a0270f2fe2c25af59b44fc235/media/images/logo-hero-white.png', function (imgNode) {
          imgNode.setAttrs({
            x: 0,
            y: 0,
            scaleX: 0.2,
            scaleY: 0.2,
            draggable: true,
          });
          layer.add(imgNode);
          
          // create new transformer
              var tr = new Konva.Transformer();
              layer.add(tr);
              tr.attachTo(imgNode);
              layer.draw();
              
              // Attach events to box
              imgNode.on('mouseover', function() {
                  document.body.style.cursor = 'pointer';
              });
              imgNode.on('mouseout', function() {
                  document.body.style.cursor = 'default';
              });
  
              imgNode.on('mouseout', function() {
                  document.body.style.cursor = 'default';
              });
  
              // User moves box
              imgNode.on('dragmove', function() {
                  // Send new coordinates to csInterface
                  moveNode(imgNode);
  
              });
  
              // User resizes box
              imgNode.on('transform', function() {
                  // Send new coordinates to csInterface
                  moveNode(imgNode);
              });
        });
  
  });
  
      function moveNode (node) {
        
        var x = node.x().toFixed(3);
        var y = node.y().toFixed(3);
        var w = (node.width() * node.scaleX()).toFixed(3);
        var h = (node.height() * node.scaleY()).toFixed(3);
        var x2 = Number(y) + Number(h);
        var y2 = Number(x) + Number(w);
        
        $("#konva-coords").text(`Konva Coordinates: x:${x}, y:${y}, w: ${w}, h: ${h}`)
        
          //InDesign geometricCoordinates:
          // [y1, x1, y2, x2]
          
        var inddBounds = [y, x, (y + h), (x + w)];
        $("#indd-coords").text(`InDesign Bounds: [${y}, ${x}, ${y2}, ${x2}]`);
        $("#inddCode").text(`
  // Document Width: 225px
  // Document Height: 400px
  app.activeDocument.rectangles.add({
      strokeColor:"Black",
      strokeWidth:"1px",
      geometricBounds:[${y}, ${x}, ${y2}, ${x2}]
  })
        
        `)
        
        
  }
  
  
  $("#color").on("change", function() {
    var col = $("#color option:selected").val();
    $("#tshirt").css("background-color", col);
  })