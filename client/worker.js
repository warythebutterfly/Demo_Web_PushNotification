console.log('service worker loaded');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('push received...');
    self.registration.showNotification('data.title', {
        body: 'title body',
        icon: 'https://firebasestorage.googleapis.com/v0/b/pinterest-fca6f.appspot.com/o/twitterlogo.PNG?alt=media&token=d6d4c2bd-5287-4c9c-a075-b604c39f7475',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
    });
});