// Create your own supabase database using the provided seeds.sql file
const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getFamilies() {
    // fetch all families and their bunnies
    const response = await client
        .from('loving_families')
        .select('*, fuzzy_bunnies (*)');

    //console.log(response.body);

    return response.body;

}

    

export async function deleteBunny(bunny) {
    // delete a single bunny using the id argument
    await client
        .from('fuzzy_bunnies')
        .delete()
        .match({ id: bunny.id });

    
}

export async function createBunny(bunnyName, familyID) {
    // create a bunny using the bunny argument
    console.log(bunnyName);
    const variable = await client
        .from('fuzzy_bunnies')
        .insert({ name: bunnyName,
            family_id: familyID });
}

// MARTHA STEWART (PRE-MADE) FUNCTIONS

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
