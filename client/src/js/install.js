const installBtn = document.getElementById('buttonInstall');
let installPrompt = null; 

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    installBtn.removeAttribute('hidden');
    
});

// TODO: Implement a click event handler on the `butInstall` element
installBtn.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPrompt = null;
    installBtn.setAttribute('hidden', '');
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Jot was installed.', event);
});
