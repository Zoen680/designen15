const STORAGE_KEY = 'design-en-15-state';

let state = {
  phase: 'start',
  pool: [],
  drawnHistory: [],
  round: 1
};

function save(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
}

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) state = JSON.parse(raw);
  }catch(e){}
}
