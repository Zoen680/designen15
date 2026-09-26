const startScreen = document.getElementById('start-screen');
const liveScreen = document.getElementById('live-screen');
const recapScreen = document.getElementById('recap-screen');
const startBtn = document.getElementById('start-btn');
const roundNumEl = document.getElementById('round-num');
const stageContent = document.getElementById('stage-content');
const drawBtn = document.getElementById('draw-btn');
const nextBtn = document.getElementById('next-btn');
const historyBlock = document.getElementById('history-block');
const historyList = document.getElementById('history-list');
const recapList = document.getElementById('recap-list');
const resetBtn = document.getElementById('reset-btn');

function pickTenThemes(){
  const shuffled = [...THEME_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

async function saveCompletedLive(){
  if(!currentUser) return;
  const existing = Array.isArray(currentUser.user_metadata?.live_history)
    ? currentUser.user_metadata.live_history
    : [];
  const history = [...existing, {
    createdAt: new Date().toISOString(),
    themes: [...state.drawnHistory]
  }].slice(-20);
  const response = await saveUserLiveHistory(history);
  if(response.error){
    console.error('Unable to save live history:', response.error);
    return;
  }
  currentUser = response.data.user;
  renderAccount();
}

function renderHistory(){
  if(state.drawnHistory.length === 0){
    historyBlock.classList.add('is-hidden');
    return;
  }
  historyBlock.classList.remove('is-hidden');
  historyList.innerHTML = state.drawnHistory
    .map((theme, index) => `<li><span class="n">M${index + 1}</span><span>${translateTheme(theme)}</span></li>`)
    .join('');
}

function renderLive(){
  roundNumEl.textContent = state.round;
  document.getElementById('round-label').textContent = t('round');
  stageContent.className = 'waiting';
  stageContent.textContent = t('ready');
  drawBtn.classList.remove('is-hidden');
  drawBtn.textContent = t('draw');
  nextBtn.classList.add('is-hidden');
  renderHistory();
}

function render(){
  startScreen.classList.toggle('is-hidden', state.phase !== 'start');
  liveScreen.classList.toggle('is-hidden', state.phase !== 'live');
  recapScreen.classList.toggle('is-hidden', state.phase !== 'recap');

  if(state.phase === 'live') renderLive();
  if(state.phase === 'recap'){
    recapList.innerHTML = state.drawnHistory
      .map((theme, index) => `<li><span class="n">M${index + 1}</span><span>${translateTheme(theme)}</span></li>`)
      .join('');
  }
}

startBtn.addEventListener('click', () => {
  state = { phase:'live', pool: pickTenThemes(), drawnHistory: [], round: 1 };
  save();
  render();
});

drawBtn.addEventListener('click', () => {
  if(state.pool.length === 0) return;
  const index = Math.floor(Math.random() * state.pool.length);
  const theme = state.pool.splice(index, 1)[0];
  state.drawnHistory.push(theme);
  save();

  stageContent.className = 'theme-reveal pop';
  stageContent.textContent = translateTheme(theme);
  drawBtn.classList.add('is-hidden');
  nextBtn.classList.remove('is-hidden');
  nextBtn.textContent = state.round >= 5 ? t('recap') : t('nextRound');
  renderHistory();
});

nextBtn.addEventListener('click', () => {
  if(state.round >= 5){
    state.phase = 'recap';
    save();
    saveCompletedLive();
    render();
    return;
  }
  state.round += 1;
  save();
  renderLive();
});

resetBtn.addEventListener('click', () => {
  state = { phase:'start', pool: [], drawnHistory: [], round: 1 };
  save();
  render();
});
