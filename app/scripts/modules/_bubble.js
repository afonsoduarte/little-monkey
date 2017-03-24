import Utils from './_utils.js';
import paper from 'paper';

// Let's pollute our global namespace
paper.install(window);
// Create an empty project and a view for the canvas:
paper.setup( 'paper' );

var tool = new Tool();

var MAX_PARTICLES = 280;
var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
var particles = [];
var pool = [];

var Particle = function(x, y, radius) {
  this.init( x, y, radius );
}

Particle.prototype = {
  init: function( x, y, radius ) {
    this.alive = true;
    this.radius = radius || 10;
    this.wander = 0.15;
    this.theta = Utils.random(Math.PI * 2);
    this.drag = 0.92;
    this.color = '#fff';
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
  },
  move: function() {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.drag;
    this.vy *= this.drag;

    this.theta += Utils.random( -0.5, 0.5 ) * this.wander;
    this.vx += Math.sin( this.theta ) * 0.1;
    this.vy += Math.cos( this.theta ) * 0.1;

    this.radius *= 0.9;
    this.alive = this.radius > 0.5;

    this.circle.translate(new Point(this.vx, this.vy));
    this.circle.scale( 0.9 );
  },
  draw: function() {
    this.circle = new Path.Circle({
      center:  new Point(this.x, this.y),
      radius: this.radius,
      fillColor: this.color
    });
  },
  hide: function () {
    this.circle.fillColor = '#fff';
  }
};

var ParticleExplosion = function() {
  this.init();
}

ParticleExplosion.prototype = {
  init: function () {
    this.registerEventHandlers();
  },

  registerEventHandlers: function () {
    // view.onFrame = this.renderParticles;
    tool.onMouseDrag = this.mouseDragHandler;
  },

  renderParticles: function () {
    var thisParticle;
    for ( var i = particles.length - 1; i >= 0; i-- ) {
      thisParticle = particles[i];
      if ( thisParticle.alive ) {
        thisParticle.move();
      }
      else {
        thisParticle.hide();
        pool.push( particles.splice( i, 1 )[0] );
      }
    }
  },

  mouseDragHandler: function (e) {
    window.particleExplosion.spawnParticles( e.event.pageX, e.event.pageY );
  },

  spawnParticles: function (x, y) {
    var particle, theta, force;

    if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );

    particle = pool.length ? pool.pop() : new Particle();
    particle.init( x, y, Utils.random( 5, 40 ) );

    particle.wander = Utils.random( 0.5, 2.0 );
    particle.color = Utils.randomFromArray( COLOURS );
    particle.drag = Utils.random( 0.9, 0.99 );

    theta = Utils.random( Math.PI * 2 );
    force = Utils.random( 2, 8 );

    particle.vx = Math.sin( theta ) * force;
    particle.vy = Math.cos( theta ) * force;

    particle.draw();

    particles.push( particle );
  }
};

document.querySelector(".bubble-toggle").addEventListener('click', function() {
  project.clear();
  window.particleExplosion = new ParticleExplosion();
}, false);
