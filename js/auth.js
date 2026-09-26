const accountTrigger = document.getElementById('account-trigger');
const accountModal = document.getElementById('account-modal');
const modalClose = document.getElementById('modal-close');
const authView = document.getElementById('auth-view');
const accountView = document.getElementById('account-view');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const authForm = document.getElementById('auth-form');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const formError = document.getElementById('form-error');
const authSubmit = document.getElementById('auth-submit');
const accountEmail = document.getElementById('account-email');
const logoutBtn = document.getElementById('logout-btn');

let authMode = 'login';
let currentUser = null;

function setFormMessage(message, type = 'error'){
  formError.textContent = message;
  formError.classList.toggle('success', type === 'success');
}

function setAuthMode(mode){
  authMode = mode;
  const isLogin = mode === 'login';
  loginTab.classList.toggle('is-active', isLogin);
  registerTab.classList.toggle('is-active', !isLogin);
  loginTab.setAttribute('aria-selected', String(isLogin));
  registerTab.setAttribute('aria-selected', String(!isLogin));
  authSubmit.textContent = isLogin ? 'Se connecter' : 'Créer mon compte';
  authPassword.autocomplete = isLogin ? 'current-password' : 'new-password';
  setFormMessage('');
}

function renderAccount(){
  const loggedIn = Boolean(currentUser);
  accountTrigger.textContent = loggedIn ? currentUser.email : 'Se connecter';
  authView.classList.toggle('is-hidden', loggedIn);
  accountView.classList.toggle('is-hidden', !loggedIn);
  if(loggedIn) accountEmail.textContent = currentUser.email;
}

function openAccountModal(){
  renderAccount();
  accountModal.classList.remove('is-hidden');
  accountModal.setAttribute('aria-hidden', 'false');
  if(!currentUser) authEmail.focus();
}

function closeAccountModal(){
  accountModal.classList.add('is-hidden');
  accountModal.setAttribute('aria-hidden', 'true');
  authForm.reset();
  setFormMessage('');
}

function getAuthErrorMessage(error){
  const messages = {
    'Invalid login credentials': 'Adresse e-mail ou mot de passe incorrect.',
    'User already registered': 'Un compte existe déjà avec cette adresse.',
    'Password should be at least 6 characters.': 'Le mot de passe doit contenir au moins 6 caractères.'
  };
  return messages[error.message] || 'Une erreur est survenue. Veuillez réessayer.';
}

accountTrigger.addEventListener('click', openAccountModal);
modalClose.addEventListener('click', closeAccountModal);
accountModal.addEventListener('click', event => {
  if(event.target === accountModal) closeAccountModal();
});
document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && !accountModal.classList.contains('is-hidden')) closeAccountModal();
});
loginTab.addEventListener('click', () => setAuthMode('login'));
registerTab.addEventListener('click', () => setAuthMode('register'));

authForm.addEventListener('submit', async event => {
  event.preventDefault();
  authSubmit.disabled = true;
  setFormMessage('');

  const email = authEmail.value.trim().toLowerCase();
  const password = authPassword.value;
  const response = authMode === 'register'
    ? await signUpUser(email, password)
    : await signInUser(email, password);

  authSubmit.disabled = false;

  if(response.error){
    setFormMessage(getAuthErrorMessage(response.error));
    return;
  }

  if(authMode === 'register' && !response.data.session){
    setFormMessage('Compte créé. Consultez votre boîte mail pour confirmer votre adresse.', 'success');
    authForm.reset();
    return;
  }

  currentUser = response.data.user;
  renderAccount();
  closeAccountModal();
});

logoutBtn.addEventListener('click', async () => {
  logoutBtn.disabled = true;
  const {error} = await signOutUser();
  logoutBtn.disabled = false;
  if(error){
    setFormMessage('Impossible de se déconnecter. Veuillez réessayer.');
    return;
  }
  currentUser = null;
  renderAccount();
  closeAccountModal();
});

supabaseClient.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user || null;
  renderAccount();
});

getCurrentUser()
  .then(user => {
    currentUser = user || null;
    renderAccount();
  })
  .catch(() => setFormMessage('Impossible de vérifier la session.'));
