# MetalForm CAD Web v1.1

Static phone-friendly web app. Upload `index.html`, `app.js`, `mesh-tools.js`, `sw.js`, and `manifest.webmanifest` to the **root** of your GitHub Pages repository.

## Added in v1.1
- Experimental OBJ/STL triangle-mesh unfolding into nonoverlapping islands using a greedy breadth-first edge-adjacency development.
- Seam editing: check **Tap 3D edges to mark seams**, open 3D view, tap edges; orange indicates manually marked cut seams.
- Experimental mesh DXF with per-island exposed boundary segments on `CUT` layer.
- Mesh scale input (imported units to mm).

## Limitations
- Not a full Pepakura implementation. The mesh unfolding can create many disconnected islands; it does not sew or join seams, account for sheet thickness, or guarantee manufacturability. Triangle overlap checks are approximate.
- STL vertices are welded by 1e-5 coordinate rounding; open meshes, non-manifold edges, and inconsistent normals may not unfold as intended.
- Large imported meshes are limited to 1000 triangles for unfolding (3D viewing accepts larger files).
- Existing automatic nesting remains rectangular-envelope nesting for parametric parts, not true irregular polygon nesting or mixed-parts nesting. Mesh islands are **not** automatically nested.
- Bend pattern flange lengths are tangent straight lengths, not outside dimensions.
- Cylinder/cone developments use outside diameters and are not compensated for neutral-axis position.
- All geometry and exported files require independent dimensional verification before CNC fabrication.

## Deployment
1. Extract ZIP on Android.
2. Upload all five root files to GitHub repo (not the enclosing folder).
3. Wait for GitHub Pages to deploy; refresh twice or close/reopen site if service worker serves old cache.
4. Chrome → Add to Home screen (if available).

## Testing
JavaScript source passes Node syntax checks. No Android browser or real-machine CNC test was performed.
