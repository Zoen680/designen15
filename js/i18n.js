const I18N_KEY = 'design-en-15-language';

const translations = {
  fr: {
    pageKicker: 'Générateur de sujets',
    profileKicker: 'Votre espace',
    title: 'Design en <span>15\'</span>',
    profileTitle: 'Mon <span>profil</span>',
    signIn: 'Se connecter',
    profile: 'Mon profil',
    intro: '10 thèmes sont sélectionnés au hasard et gardés secrets. Un nouveau est révélé à chaque manche, sur 5 manches.',
    start: 'Démarrer le live',
    round: 'Manche',
    ready: 'Prêt à tirer le thème de la manche.',
    draw: 'Tirer le thème',
    nextRound: 'Manche suivante',
    recap: 'Voir le récapitulatif',
    previousRounds: 'Manches précédentes',
    recapIntro: 'Les 5 thèmes du live, dans l\'ordre du tirage.',
    newLive: 'Nouveau live',
    back: '← Retour au générateur',
    personalSpace: 'Espace personnel',
    welcome: 'Bienvenue',
    welcomeDescription: 'Créez un compte pour retrouver votre session sur cet appareil.',
    login: 'Connexion',
    register: 'Créer un compte',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    account: 'Votre compte',
    sessionSaved: 'Votre session est enregistrée sur cet appareil.',
    logout: 'Se déconnecter',
    accountSaved: 'Modifications enregistrées.',
    accountInfo: 'Informations personnelles',
    displayName: 'Nom affiché',
    firstName: 'Votre prénom',
    save: 'Enregistrer les changements',
    preferences: 'Préférences',
    settings: 'Paramètres',
    animations: 'Animations',
    animationsDescription: 'Donner du rythme aux révélations',
    notifications: 'Notifications',
    notificationsDescription: 'Recevoir les rappels de live',
    language: 'Langue',
    languageDescription: 'Langue de l’interface',
    french: 'Français',
    english: 'English',
    liveSaved: 'live enregistré',
    themesDrawn: 'thèmes tirés',
    history: 'Historique',
    pastLives: 'Mes anciens lives',
    noHistory: 'Aucun live enregistré pour le moment.',
    liveNumber: 'Live',
    invalidCredentials: 'Adresse e-mail ou mot de passe incorrect.',
    alreadyRegistered: 'Un compte existe déjà avec cette adresse.',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères.',
    genericError: 'Une erreur est survenue. Veuillez réessayer.',
    emailConfirmation: 'Compte créé. Consultez votre boîte mail pour confirmer votre adresse.',
    sessionError: 'Impossible de vérifier la session.',
    logoutError: 'Impossible de se déconnecter. Veuillez réessayer.'
  },
  en: {
    pageKicker: 'Topic generator',
    profileKicker: 'Your space',
    title: 'Design in <span>15\'</span>',
    profileTitle: 'My <span>profile</span>',
    signIn: 'Sign in',
    profile: 'My profile',
    intro: '10 topics are selected at random and kept secret. A new one is revealed each round, over 5 rounds.',
    start: 'Start live',
    round: 'Round',
    ready: 'Ready to draw this round’s topic.',
    draw: 'Draw topic',
    nextRound: 'Next round',
    recap: 'View recap',
    previousRounds: 'Previous rounds',
    recapIntro: 'The 5 live topics, in drawing order.',
    newLive: 'New live',
    back: '← Back to generator',
    personalSpace: 'Personal space',
    welcome: 'Welcome',
    welcomeDescription: 'Create an account to keep your session on this device.',
    login: 'Sign in',
    register: 'Create an account',
    email: 'Email address',
    password: 'Password',
    account: 'Your account',
    sessionSaved: 'Your session is saved on this device.',
    logout: 'Sign out',
    accountSaved: 'Changes saved.',
    accountInfo: 'Personal information',
    displayName: 'Display name',
    firstName: 'Your first name',
    save: 'Save changes',
    preferences: 'Preferences',
    settings: 'Settings',
    animations: 'Animations',
    animationsDescription: 'Add motion to reveals',
    notifications: 'Notifications',
    notificationsDescription: 'Receive live reminders',
    language: 'Language',
    languageDescription: 'Interface language',
    french: 'Français',
    english: 'English',
    liveSaved: 'live saved',
    themesDrawn: 'topics drawn',
    history: 'History',
    pastLives: 'My past lives',
    noHistory: 'No live saved yet.',
    liveNumber: 'Live',
    invalidCredentials: 'Incorrect email or password.',
    alreadyRegistered: 'An account already exists with this email.',
    passwordTooShort: 'Password must be at least 6 characters.',
    genericError: 'Something went wrong. Please try again.',
    emailConfirmation: 'Account created. Check your inbox to confirm your email.',
    sessionError: 'Unable to check your session.',
    logoutError: 'Unable to sign out. Please try again.'
  }
};

let savedLanguage = localStorage.getItem(I18N_KEY);
if(!savedLanguage){
  try{
    savedLanguage = JSON.parse(localStorage.getItem('design-en-15-profile'))?.language;
  }catch(error){
    savedLanguage = 'fr';
  }
}
let currentLanguage = savedLanguage || 'fr';

function t(key){
  return translations[currentLanguage][key] || translations.fr[key] || key;
}

function translateTheme(theme){
  if(currentLanguage === 'fr') return theme;
  const exactTranslations = {
    "Affiche d’une fête de village": "Poster for a village festival",
    "Affiche d’un concert": "Concert poster",
    "Affiche d’un spectacle de Thomas Deseur": "Poster for a Thomas Deseur show",
    "Affiche pour le Rose Festival de Bigflo & Oli": "Poster for the Rose Festival by Bigflo & Oli",
    "Affiche de film": "Movie poster",
    "Affiche pour une boisson": "Poster for a beverage",
    "Pochette d’album musical": "Music album cover",
    "Affiche électorale d’un candidat inattendu": "Election poster for an unexpected candidate",
    "Miniature YouTube pour Bigflo & Oli": "YouTube thumbnail for Bigflo & Oli",
    "Miniature YouTube pour Fuze": "YouTube thumbnail for Fuze",
    "Affiche d'un festival de musique électronique": "Electronic music festival poster",
    "Affiche pour une marque de sneakers": "Poster for a sneaker brand",
    "Affiche d'un spectacle d'humour": "Comedy show poster",
    "Affiche pour un festival de cinéma": "Poster for a film festival",
    "Affiche pour une boîte de nuit": "Poster for a nightclub",
    "Affiche pour un salon du jeu vidéo": "Poster for a video game expo",
    "Affiche de campagne pour une association caritative": "Campaign poster for a charity",
    "Affiche pour un marché de Noël": "Poster for a Christmas market",
    "Affiche d'un stand-up de Fary": "Poster for a Fary stand-up show",
    "Affiche pour le Golden Moustache Tour": "Poster for the Golden Moustache Tour",
    "Pochette d'album pour un rappeur inconnu": "Album cover for an unknown rapper",
    "Pochette d'une mixtape lo-fi": "Lo-fi mixtape cover",
    "Pochette d'un album de variété française": "French pop album cover",
    "Miniature YouTube pour Squeezie": "YouTube thumbnail for Squeezie",
    "Miniature YouTube pour Inoxtag": "YouTube thumbnail for Inoxtag",
    "Miniature YouTube pour McFly & Carlito": "YouTube thumbnail for McFly & Carlito",
    "Miniature YouTube pour une chaîne de cuisine": "YouTube thumbnail for a cooking channel",
    "Miniature Twitch pour un stream de speedrun": "Twitch thumbnail for a speedrun stream",
    "Affiche électorale pour Flash McQueen": "Election poster for Lightning McQueen",
    "Affiche électorale pour un candidat mascotte de supermarché": "Election poster for a supermarket mascot candidate",
    "Affiche pour une marque de céréales fictive": "Poster for a fictional cereal brand",
    "Affiche pour un parfum de luxe": "Poster for a luxury perfume",
    "Affiche pour une salle d'escalade": "Poster for a climbing gym",
    "Affiche pour un tournoi e-sport": "Poster for an esports tournament",
    "Affiche pour une expo photo": "Poster for a photo exhibition",
    "Affiche pour un festival de street art": "Poster for a street art festival",
    "Logo pour une chaîne de kebabs haut de gamme": "Logo for a premium kebab chain",
    "Logo pour une start-up de livraison de plantes": "Logo for a plant delivery startup",
    "Identité visuelle pour un food truck": "Visual identity for a food truck",
    "Packaging pour une marque de chips artisanales": "Packaging for an artisan potato chip brand",
    "Affiche pour une fête foraine": "Poster for a fairground",
    "Affiche pour un marathon urbain": "Poster for an urban marathon",
    "Affiche pour un spectacle de danse contemporaine": "Poster for a contemporary dance show",
    "Couverture d'un magazine fictif de mode": "Cover for a fictional fashion magazine",
    "Affiche pour la tournée d'un DJ inconnu": "Poster for an unknown DJ's tour"
  };
  return exactTranslations[theme] || theme;
}

function setLanguage(language){
  currentLanguage = translations[language] ? language : 'fr';
  localStorage.setItem(I18N_KEY, currentLanguage);
  document.documentElement.lang = currentLanguage;
  applyTranslations();
  if(typeof render === 'function') render();
  if(typeof renderAccount === 'function') renderAccount();
  if(typeof renderProfile === 'function' && currentUser) renderProfile();
}

function applyTranslations(){
  document.title = currentLanguage === 'en'
    ? "Design in 15' — Topic generator"
    : "Design en 15' — Générateur de sujets";
  document.getElementById('page-kicker').textContent = t('pageKicker');
  document.getElementById('page-title').innerHTML = t('title');
  document.querySelector('[data-i18n="intro"]').textContent = t('intro');
  document.getElementById('start-btn').textContent = t('start');
  document.getElementById('history-title').textContent = t('previousRounds');
  document.getElementById('recap-intro').textContent = t('recapIntro');
  document.getElementById('reset-btn').textContent = t('newLive');
  document.getElementById('profile-back-btn').textContent = t('back');
  document.getElementById('profile-kicker').textContent = t('personalSpace');
  document.getElementById('profile-account-kicker').textContent = t('account');
  document.getElementById('profile-account-heading').textContent = t('accountInfo');
  document.getElementById('profile-name-label').textContent = t('displayName');
  document.getElementById('profile-name').placeholder = t('firstName');
  document.getElementById('profile-save-btn').textContent = t('save');
  document.getElementById('profile-preferences-kicker').textContent = t('preferences');
  document.getElementById('profile-settings-heading').textContent = t('settings');
  document.getElementById('motion-label').textContent = t('animations');
  document.getElementById('motion-description').textContent = t('animationsDescription');
  document.getElementById('notifications-label').textContent = t('notifications');
  document.getElementById('notifications-description').textContent = t('notificationsDescription');
  document.getElementById('language-label').textContent = t('language');
  document.getElementById('language-description').textContent = t('languageDescription');
  document.getElementById('setting-language').setAttribute('aria-label', t('language'));
  document.getElementById('setting-language').value = currentLanguage;
  document.getElementById('header-language').setAttribute('aria-label', t('language'));
  document.getElementById('header-language').value = currentLanguage;
  document.getElementById('language-fr').textContent = t('french');
  document.getElementById('language-en').textContent = t('english');
  document.getElementById('profile-logout-btn').textContent = t('logout');
  document.getElementById('profile-history-kicker').textContent = t('history');
  document.getElementById('profile-history-heading').textContent = t('pastLives');
  document.getElementById('profile-empty-history').textContent = t('noHistory');
  document.getElementById('auth-kicker').textContent = t('personalSpace');
  document.getElementById('account-title').textContent = t('welcome');
  document.getElementById('auth-description').textContent = t('welcomeDescription');
  document.getElementById('login-tab').textContent = t('login');
  document.getElementById('register-tab').textContent = t('register');
  document.querySelector('label[for="auth-email"]').textContent = t('email');
  document.querySelector('label[for="auth-password"]').textContent = t('password');
  document.getElementById('account-kicker').textContent = t('account');
  document.getElementById('account-description').textContent = t('sessionSaved');
  document.getElementById('logout-btn').textContent = t('logout');
  if(typeof setAuthMode === 'function') setAuthMode(authMode);
}

function getLanguage(){
  return currentLanguage;
}

document.documentElement.lang = currentLanguage;

document.getElementById('header-language').addEventListener('change', event => {
  setLanguage(event.target.value);
  document.getElementById('setting-language').value = event.target.value;
});
