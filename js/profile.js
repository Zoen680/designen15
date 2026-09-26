const profileScreen = document.getElementById('profile-screen');
const profileBackBtn = document.getElementById('profile-back-btn');
const profileForm = document.getElementById('profile-form');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileAvatar = document.getElementById('profile-avatar');
const profileHeading = document.getElementById('profile-heading');
const profileMessage = document.getElementById('profile-form-message');
const motionSetting = document.getElementById('setting-motion');
const notificationsSetting = document.getElementById('setting-notifications');
const languageSetting = document.getElementById('setting-language');
const liveCount = document.getElementById('profile-live-count');
const themeCount = document.getElementById('profile-theme-count');
const profileLogoutBtn = document.getElementById('profile-logout-btn');
const profileHistoryList = document.getElementById('profile-history-list');
const profileEmptyHistory = document.getElementById('profile-empty-history');
const pageKicker = document.getElementById('page-kicker');
const pageTitle = document.getElementById('page-title');

const PROFILE_KEY = 'design-en-15-profile';

function getProfilePreferences(){
  try{
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {
      name: '',
      motion: true,
      notifications: false,
      language: 'fr'
    };
  }catch(error){
    return {name:'', motion:true, notifications:false, language:'fr'};
  }
}

function saveProfilePreferences(preferences){
  localStorage.setItem(PROFILE_KEY, JSON.stringify(preferences));
}

function getInitials(value){
  const initials = value.trim().split(/\s+/).map(part => part[0]).join('').slice(0, 2);
  return initials.toUpperCase() || '?';
}

function renderProfile(){
  if(!currentUser) return;
  const preferences = getProfilePreferences();
  const email = currentUser.email || '';
  const displayName = preferences.name || email.split('@')[0] || 'Créatif';

  profileName.value = preferences.name;
  profileEmail.textContent = email;
  profileHeading.textContent = getLanguage() === 'en'
    ? `Hello, ${displayName}`
    : `Bonjour, ${displayName}`;
  profileAvatar.textContent = getInitials(displayName);
  motionSetting.checked = preferences.motion;
  notificationsSetting.checked = preferences.notifications;
  languageSetting.value = preferences.language;
  const savedLives = getUserLiveHistory();
  liveCount.textContent = savedLives.length;
  themeCount.textContent = savedLives.reduce((total, live) => (
    total + (Array.isArray(live.themes) ? live.themes.length : 0)
  ), 0);
  liveCount.nextElementSibling.textContent = t('liveSaved');
  themeCount.nextElementSibling.textContent = t('themesDrawn');
  renderProfileHistory();
}

function getUserLiveHistory(){
  const history = currentUser?.user_metadata?.live_history;
  return Array.isArray(history) ? history : [];
}

function renderProfileHistory(){
  const history = getUserLiveHistory();
  profileEmptyHistory.classList.toggle('is-hidden', history.length > 0);
  profileHistoryList.innerHTML = history.slice().reverse().map((live, index) => {
    const themes = Array.isArray(live.themes) ? live.themes : [];
    const date = live.createdAt ? new Date(live.createdAt).toLocaleDateString(getLanguage() === 'en' ? 'en-US' : 'fr-FR') : '';
    return `<li><div><strong>${t('liveNumber')} ${history.length - index}</strong><span>${date}</span></div><p>${themes.map(theme => translateTheme(theme)).join(' · ')}</p></li>`;
  }).join('');
}

function openProfile(){
  if(!currentUser) return;
  startScreen.classList.add('is-hidden');
  liveScreen.classList.add('is-hidden');
  recapScreen.classList.add('is-hidden');
  profileScreen.classList.remove('is-hidden');
  pageKicker.textContent = t('profileKicker');
  pageTitle.innerHTML = t('profileTitle');
  renderProfile();
}

function closeProfile(){
  profileScreen.classList.add('is-hidden');
  pageKicker.textContent = t('pageKicker');
  pageTitle.innerHTML = t('title');
  render();
}

accountTrigger.addEventListener('click', () => {
  if(currentUser) openProfile();
});
profileBackBtn.addEventListener('click', closeProfile);

profileForm.addEventListener('submit', event => {
  event.preventDefault();
  const preferences = getProfilePreferences();
  preferences.name = profileName.value.trim();
  saveProfilePreferences(preferences);
  profileMessage.textContent = t('accountSaved');
  profileMessage.classList.add('success');
  renderProfile();
  window.setTimeout(() => profileMessage.textContent = '', 2500);
});

function saveSetting(key, value){
  const preferences = getProfilePreferences();
  preferences[key] = value;
  saveProfilePreferences(preferences);
}

motionSetting.addEventListener('change', () => saveSetting('motion', motionSetting.checked));
notificationsSetting.addEventListener('change', () => saveSetting('notifications', notificationsSetting.checked));
languageSetting.addEventListener('change', () => {
  saveSetting('language', languageSetting.value);
  setLanguage(languageSetting.value);
});

profileLogoutBtn.addEventListener('click', async () => {
  profileLogoutBtn.disabled = true;
  const {error} = await signOutUser();
  profileLogoutBtn.disabled = false;
  if(error){
    profileMessage.textContent = t('logoutError');
    profileMessage.classList.remove('success');
    return;
  }
  currentUser = null;
  closeProfile();
  renderAccount();
});
