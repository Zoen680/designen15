async function getCurrentUser(){
  const {data, error} = await supabaseClient.auth.getUser();
  if(error && error.name !== 'AuthSessionMissingError') throw error;
  return data.user;
}

async function signUpUser(email, password){
  return supabaseClient.auth.signUp({email, password});
}

async function signInUser(email, password){
  return supabaseClient.auth.signInWithPassword({email, password});
}

async function signOutUser(){
  return supabaseClient.auth.signOut();
}
