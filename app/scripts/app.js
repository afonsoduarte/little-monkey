import paperSetup from './modules/_paper-setup';
import particleExplosion from './modules/_particle-explosion';
// import bubble from './modules/_bubble';
import paintBrush from './modules/_paint-brush';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() { console.log('Service Worker Registered'); });
}