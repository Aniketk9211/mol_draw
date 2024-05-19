// Main Canvas
ChemDoodle.ELEMENT["H"].jmolColor = "black";
ChemDoodle.ELEMENT["S"].jmolColor = "#B9A130";
var sketcher = new ChemDoodle.SketcherCanvas("drawing_canvas", 600, 350, {
  useServices: true,
});
sketcher.styles.atoms_displayTerminalCarbonLabels_2D = true;
sketcher.styles.atoms_useJMOLColors = true;
sketcher.styles.bonds_clearOverlaps_2D = true;
sketcher.styles.shapes_color = "#c10000";

if (true) {
    let caffeineMolFile = 'Molecule Name\n  CHEMDOOD08070920033D 0   0.00000     0.00000     0\n[Insert Comment Here]\n 14 15  0  0  0  0  0  0  0  0  1 V2000\n   -0.3318    2.0000    0.0000   O 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318    1.0000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -1.1980    0.5000    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    0.5342    0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -1.1980   -0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -2.0640    1.0000    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n    1.4804    0.8047    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    0.5342   -0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -2.0640   -1.0000    0.0000   O 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318   -1.0000    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    2.0640   -0.0000    0.0000   C 0  0  0  2  0  0  0  0  0  0  0  0\n    1.7910    1.7553    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n    1.4804   -0.8047    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318   -2.0000    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  3  2  1  0  0  0  0\n  4  2  1  0  0  0  0\n  3  5  1  0  0  0  0\n  3  6  1  0  0  0  0\n  7  4  1  0  0  0  0\n  4  8  2  0  0  0  0\n  9  5  2  0  0  0  0\n 10  5  1  0  0  0  0\n 10  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  7 12  1  0  0  0  0\n 13  8  1  0  0  0  0\n 13 11  2  0  0  0  0\n 10 14  1  0  0  0  0\nM  END\n> <DATE>\n07-08-2009\n';
  let caffeine = ChemDoodle.readMOL(caffeineMolFile);
  sketcher.loadMolecule(caffeine);
}
else {
  sketcher.repaint();
}

// Preview ketcher.
const sketcherVeiwer = new ChemDoodle.ViewerCanvas('veiw_canvas', 100, 100);
sketcherVeiwer.styles.atoms_displayTerminalCarbonLabels_2D = true;
sketcherVeiwer.styles.atoms_useJMOLColors = true;
sketcherVeiwer.styles.bonds_clearOverlaps_2D = true;
sketcherVeiwer.repaint();
sketcherVeiwer.emptyMessage = 'No data loaded';
sketcher.oldFunc = sketcher.checksOnAction;


sketcher.checksOnAction = function (force) {
  this.oldFunc(force);
  let mols = sketcher.molecules;
  let forms = sketcher.shapes;
  sketcherVeiwer.loadContent(mols, forms);
  sketcher.center();
  for (let i = 0, ii = this.molecules.length; i < ii; i++) {
    this.molecules[i].check();
  }
};

function functionResize() {
  let inputWeight = document.getElementById('width_input_box').valueAsNumber;
  let inputHeight = document.getElementById('height_input_box').valueAsNumber;
  let width;
  let height;

  if (inputWeight > 100) {
    width = inputWeight;
  } else {
    width = 100;
  }

  if (inputHeight > 100) {
    height = inputHeight;
  } else {
    height = 100;
  }
  sketcherVeiwer.resize(width, height);
}

document.addEventListener("DOMContentLoaded", function () {
  var actionButton = document.getElementById("actionbutton");

  actionButton.addEventListener("click", closeModal);

  function closeModal() {
    if (
      window.parent.tinyMCE &&
      window.parent.tinyMCE.activeEditor
    ) {
      var mol = sketcherVeiwer.getMolecule();
      // var src = ChemDoodle.io.png.string(sketcherVeiwer);
      var src = veiw_canvas.toDataURL('image/png', 1.0);
      var molFile = ChemDoodle.writeMOL(mol);
      var content = '<img src="' + src + '" type="image/png"></img>';
      window.parent.tinyMCE.activeEditor.execCommand("mceInsertContent", 0, content);
      window.parent.tinyMCE.activeEditor.execCommand(
        "mceInsertContent",
        0,
        "<!--" + molFile + "-->"
      );
      window.parent.document
        .querySelector(".modal")
        .querySelector(".close")
        .click();
    }
  }
});
