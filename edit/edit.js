import { 
    getFamilies, 
    checkAuth, 
    logout,
    updateBunny,
    getBunny,
    deleteBunny
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const familyDropDown = document.getElementById('family-id');
const bunnyName = document.getElementById('bunny-name');
const deleteBunnyButton = document.getElementById('delete-button');
const sadBunny = document.getElementById('sadbunny');
const params = new URLSearchParams(window.location.search);

deleteBunnyButton.addEventListener('click', async ()=>{
    await deleteBunny(params.get('id'));
    window.location.href = (`../families`);

});


form.addEventListener('submit', async e => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);

    const bunnyName = data.get('bunny-name');
    // use createBunny to create a bunny with this name and family id
    await updateBunny(bunnyName, params.get('id'), familyDropDown.value);
    
    form.reset();
    window.location.href = (`../families`);
});

window.addEventListener('load', async () => {

    //const bunny = await get
    const currentBunny = await getBunny(params.get('id'));
 
    bunnyName.value = currentBunny.name;
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const dropDown = document.getElementById('family-id');
    // go get the families from supabase
    const allFamilies = await getFamilies();

    // for each family
    for (let family of allFamilies){
        const familySelectEl = document.createElement('option');
        familySelectEl.textContent = family.name;
        familySelectEl.value = family.id;
        // const text = node.textContent;
        dropDown.append(familySelectEl);
    }
    dropDown.value = currentBunny.family_id;
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

deleteBunnyButton.addEventListener('mouseover', async ()=>{
    sadBunny.classList.remove('invisible');
    
});

deleteBunnyButton.addEventListener('mouseout', async ()=>{
    sadBunny.classList.add('invisible');
    
});
