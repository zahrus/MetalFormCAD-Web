(function(){'use strict';
const $=id=>document.getElementById(id);const main=document.querySelector('main'),left=main.children[0],stage=main.children[1],extra=main.children[2];if(!left||!stage||!extra)return;
const nav=document.createElement('div');nav.className='studio-tabs';left.prepend(nav);
const panes={};for(const [id,label] of [['part','Part'],['mesh','Mesh'],['nest','Nest'],['fabricate','Fabricate'],['project','Project']]){const b=document.createElement('button');b.textContent=label;b.type='button';b.dataset.pane=id;nav.append(b);const p=document.createElement('div');p.className='studio-pane';p.id='studio-'+id;left.append(p);panes[id]=p;b.onclick=()=>activate(id)}
// Move original nodes without recreating them: all existing event listeners and IDs survive.
const original=[...left.children].filter(n=>n!==nav&&!n.classList.contains('studio-pane'));
const byId=id=>original.find(n=>n.id===id);const sectionFor=id=>original.find(n=>n.querySelector&&n.querySelector('#'+id));
const add=(pane,n)=>{if(n&&n.parentNode)panes[pane].append(n)};
for(const n of original){if(n.tagName==='H2')continue; if(n.id==='shape'||n.id==='fields'||n.id==='file'||n.id==='meshTools'||n.id==='mfExtras'||n.id==='status'||n.id==='results')continue;
 if(n.classList.contains('buttons')){const ids=[...n.querySelectorAll('button')].map(x=>x.id);add(ids.includes('generate')?'part':ids.includes('nest')?'nest':'part',n);continue;}
 if(n.classList.contains('row')){const ids=[...n.querySelectorAll('input')].map(x=>x.id);add(ids.includes('sw')||ids.includes('qty')?'nest':'part',n);continue;}
 if(n.classList.contains('muted')){add('nest',n);continue;}
 if(n.tagName==='LABEL'){add(n.htmlFor==='shape'?'part':'nest',n);continue;}
 add('part',n);
}
add('part',$('shape'));add('part',$('fields'));add('part',$('file'));add('mesh',$('meshTools'));add('project',$('mfExtras'));add('project',$('results'));
// Move v1.4 fabrication panel content into its own inspector tab.
for(const n of [...extra.children]){if(n.tagName!=='H2')panes.fabricate.append(n)}extra.remove();
const toolbar=document.createElement('div');toolbar.className='studio-toolbar';stage.prepend(toolbar);
for(const [label,id,cls] of [['Import STL / OBJ','importBtn','primary'],['Generate','generate',''],['Develop mesh','developMesh',''],['Nest','nest',''],['Save project','v14Save','']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.className=cls;b.onclick=()=>{const target=$(id);if(target){if(id==='developMesh')activate('mesh');target.click()}};toolbar.append(b)}
const ws=document.createElement('div');ws.className='studio-workspace';for(const n of [...stage.children])if(n!==toolbar)ws.append(n);stage.append(ws);
const st=document.createElement('div');st.className='studio-status';st.append($('status'));stage.append(st);
const mobileNav=document.createElement('div');mobileNav.className='studio-bottom-nav';for(const [id,label] of [['part','Part'],['mesh','Mesh'],['nest','Nest'],['fabricate','Tools'],['project','Files']]){const b=document.createElement('button');b.textContent=label;b.type='button';b.dataset.pane=id;b.onclick=()=>activate(id);mobileNav.append(b)}document.body.append(mobileNav);
function activate(id){for(const [k,p] of Object.entries(panes))p.classList.toggle('selected',k===id);document.querySelectorAll('[data-pane]').forEach(b=>b.classList.toggle('selected',b.dataset.pane===id));try{draw()}catch(e){}}
activate('part');
// Resize canvas when switching tabs, rotating the phone or changing the viewport.
const resize=()=>{try{draw()}catch(e){}};window.addEventListener('resize',resize);document.querySelectorAll('#tab2d,#tab3d,#tabNest').forEach(b=>b.addEventListener('click',()=>requestAnimationFrame(resize)));
const obs=new ResizeObserver(()=>requestAnimationFrame(resize));obs.observe(ws);
})();