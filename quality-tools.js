'use strict';
// Quality and project utilities; no server required.
window.mfSeamHistory=[];
window.mfSheetNumber=function(){const n=Math.floor(Number($('mfSheetIndex').value));return Number.isFinite(n)?Math.max(1,n):1};
const mfArea=pts=>Math.abs(pts.reduce((a,p,i)=>{const q=pts[(i+1)%pts.length];return a+p[0]*q[1]-q[0]*p[1]},0))/2;
window.mfUpdateMetrics=function(){
 const sw=Number($('sw').value),sh=Number($('sh').value),usable=sw*sh,items=polygonPlacements.length?polygonPlacements:nested;
 if(!items.length||!Number.isFinite(usable)||usable<=0){$('mfMetrics').textContent='Run nesting to see material utilization.';return;}
 const sheets=Math.max(...items.map(p=>p.sheet))+1;
 let area=0,method='';
 if(polygonPlacements.length){area=polygonPlacements.reduce((sum,p)=>sum+p.orient.tris.reduce((a,t)=>a+mfArea(t),0),0);method='Approximate developed triangle area';}
 else if(current){area=items.length*mfArea(current.pts);method='Parametric part outline area';}
 const utilization=100*area/(usable*sheets);
 $('mfMetrics').textContent=`${items.length} parts · ${sheets} sheet(s) · ${method}: ${(area/1e6).toFixed(3)} m² · gross sheet utilization ${utilization.toFixed(1)}%. Excludes kerf and sheet margin; verify geometry.`;
};
$('mfSheetIndex').addEventListener('change',()=>{if(tab==='Nest'){if(polygonPlacements.length)pnDraw();else drawNest();}});
$('mfSave').onclick=()=>{const settings={};for(const id of ['sw','sh','qty','gap','margin','polygonCopies','polygonStep','meshScale']){const el=$(id);if(el)settings[id]=el.value;}
 const data={format:'MetalFormCAD-project',version:1,shape:$('shape').value,dimensions:inputs(),settings,notice:'Mesh data is not embedded. Reimport STL/OBJ.'};
 download(JSON.stringify(data,null,2),'metalform-project.json','application/json');};
$('mfLoad').onclick=()=>$('mfProjectFile').click();
$('mfProjectFile').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;if(f.size>1000000)throw Error('Project file too large');const d=JSON.parse(await f.text());if(d.format!=='MetalFormCAD-project'||!schema[d.shape]||!d.dimensions||typeof d.dimensions!=='object')throw Error('Invalid project format');$('shape').value=d.shape;fields();for(const [id] of schema[d.shape]){const v=Number(d.dimensions[id]);if(!Number.isFinite(v))throw Error('Invalid '+id);$('f_'+id).value=String(v);}for(const [id,val] of Object.entries(d.settings||{})){if($(id)&&Number.isFinite(Number(val)))$(id).value=String(val);}polygonPlacements=[];pattern();$('status').textContent='Project loaded. Imported mesh is not included.';}catch(err){$('status').textContent='Project load: '+err.message;}finally{e.target.value='';}};
$('mfUndoSeam').onclick=()=>{if(!window.mfSeamHistory.length){$('status').textContent='No seam changes to undo.';return;}const prev=window.mfSeamHistory.pop();seams.clear();for(const key of prev)seams.add(key);meshDev=null;polygonPlacements=[];$('status').textContent=`Restored ${seams.size} seams. Redevelop mesh before export.`;draw();};
$('mfClearSeams').onclick=()=>{if(!mesh){$('status').textContent='Import a mesh first.';return;}window.mfSeamHistory.push(new Set(seams));seams.clear();meshDev=null;polygonPlacements=[];$('status').textContent='Seams cleared. Redevelop mesh.';draw();};
