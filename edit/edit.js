import { 
    getFamilies, 
    checkAuth, 
    logout,
    updateBunny,
    getBunny
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const familyDropDown = document.getElementById('family-id');

form.addEventListener('submit', async e => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    // use createBunny to create a bunny with this name and family id
    await updateBunny()//(data.get('bunny-name'), familyDropDown.value);
    
    form.reset();
});

window.addEventListener('load', async() => {

    //const bunny = await get
    const currentBunny = await getBunny(params.get('id')
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const dropDown = document.getElementById('family-id');
    // go get the families from supabase
    const allFamilies = await getFamilies();
    console.log(allFamilies);
    // for each family
    for (let family of allFamilies){
        const familySelectEl = document.createElement('option');
        familySelectEl.textContent = family.name;
        familySelectEl.value = family.id;
        // const text = node.textContent;
        dropDown.append(familySelectEl);
    }
    //dropDown.value = 
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
