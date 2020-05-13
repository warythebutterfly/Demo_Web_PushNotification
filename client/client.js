//import { sendNotification } from "web-push";

const publicVapidKey = 'BK-yh6DD8Lf6fd4h_gmqC-Oz9fS2CUNf6KP06hh3w8P9Tr173yPQTPKEaokEkZ2rGpjzMdU3K5sDBCl2de9XhKA';

//check for service worker

if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));

}


//register service worker , register push , send push
async function send() {
    //register service worker
    console.log('registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    
    });
    console.log('service worker registered...');

    //register push

    console.log('registering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('push registered...')

    //send push notification

    console.log('sending push...')
    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
    console.log('Push sent...')
}

function urlBase64ToUint8Array(base64String) {
    const padding = `=`.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, `+`)
        .replace(/_/g, `/`);

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}