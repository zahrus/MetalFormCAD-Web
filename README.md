# MetalForm CAD Web v1.0
Static web app: open `index.html` locally for most features, or deploy to GitHub Pages for PWA offline caching. No npm or build required.

## GitHub Pages on phone
Create a new PUBLIC GitHub repository `MetalFormCAD-Web`. Upload `index.html`, `app.js`, `sw.js`, `manifest.webmanifest` at the repository ROOT (not a nested folder). Settings → Pages → Deploy from branch → main → /(root) → Save. Site URL: https://YOUR_USERNAME.github.io/MetalFormCAD-Web/ . Private repo Pages availability depends on account plan.

## Features
- Parametric rectangle, cylinder wrap, truncated cone annular sector, single bend strip (K-factor bend allowance).
- 2D preview, DXF R2000-style LWPOLYLINE export in mm, SVG export.
- Simple rectangle-envelope nesting, 90-degree rotation, multiple sheets, DXF per sheet translated into a common drawing.
- Wireframe STL (binary or ASCII) and OBJ preview with touch rotation. Import is view-only.

## Limitations
- Cone sector is approximated by segmented polylines, so set adequate segments.
- Cylinder and cone input diameters are interpreted as developed surface diameters, not automatically corrected for material neutral axis.
- Bend straight legs are measured to tangent points; not outside flange dimensions.
- Nesting uses bounding boxes, not irregular polygon nesting. Nesting preview shows first sheet; DXF contains all sheets.
- STL/OBJ arbitrary mesh unfolding, manual seam selection, polygon nesting, and CNC-ready manufacturing validation are NOT included.
- Test dimensional accuracy in CAD/CAM before cutting steel. No kerf compensation.
