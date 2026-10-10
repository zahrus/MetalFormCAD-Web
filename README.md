# MetalForm CAD Web v1.4

Upload all root-level files (including v14-tools.js) to your GitHub Pages repository. Test STL models are in test-models/.

## Implemented in this iteration
- Mesh audit: boundary edges, non-manifold edges, zero-area triangles and basic index validation after welding. This is a topology audit, NOT a developability proof.
- Improved polygon nesting angle options (15/30/45/90 degrees) and optional grain direction lock (0/180 degrees); added kerf as part-to-part spacing allowance, NOT a cutter offset. Existing grid search still heuristic and potentially slow.
- Calibration multiplier applied to parametric outlines and bend markings. This is NOT a material-specific bend database or rigorous thickness-aware mesh unfolding.
- Pinch zoom and expanded seam workflow retained from v1.3; visibility-aware edge selection remains outstanding.
- Full project JSON with imported mesh and seams; local browser autosave (size-capped) and restore. Manual saves preserve meshes up to validation limits.
- Service worker updated to v1.4 cache.

## Test STL files
- test-models/test-rectangular-box-200x120x80mm.stl: closed prism, 12 triangles, nominal millimeter units. Expected mesh audit: zero boundary and non-manifold edges. It requires seams for a useful net.
- test-models/test-open-flat-panel-200x120mm.stl: open planar surface, two triangles. Expected audit: four boundary edges. It can be flattened exactly in principle.

## Important limitations
- Arbitrary STL models have no sheet thickness or bend feature metadata. Thickness-aware imported mesh unfolding and material-specific bend deduction remain unimplemented.
- Triangle unfolding and nesting are experimental. No guaranteed clean watertight contours, zero overlap, no distortion, or production-grade cut files.
- Kerf does not offset the cutting path; it only increases requested spacing between nested parts.
- Autosave is browser-local and may be cleared by the phone. Save JSON to keep a backup.
- Syntax and sample-file structural tests only; no end-to-end Android Chrome verification. Check all DXF measurements in CAM and cut test coupons before fabricating.
