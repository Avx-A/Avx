/* ===================================
   AVX PORTFOLIO
   SCRIPT.JS PART 3A
=================================== */

// Loader

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},1800);

});


// Custom Cursor

const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});


// Theme Toggle

const toggle=document.querySelector(".theme-toggle");

toggle.onclick=()=>{

document.body.classList.toggle("light");

const icon=toggle.querySelector("i");

if(document.body.classList.contains("light")){

icon.classList.remove("fa-moon");

icon.classList.add("fa-sun");

}else{

icon.classList.remove("fa-sun");

icon.classList.add("fa-moon");

}

};


// Counter Animation

const counters=document.querySelectorAll(".counter");

const speed=200;

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const count=+counter.innerText;

const inc=target/speed;

if(count<target){

counter.innerText=Math.ceil(count+inc);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

});


// Smooth Scroll

document.querySelectorAll("nav a").forEach(link=>{

link.addEventListener("click",e=>{

e.preventDefault();

document.querySelector(link.getAttribute("href"))

.scrollIntoView({

behavior:"smooth"

});

});

});
/* ===================================
   SCRIPT.JS PART 3B
   THREE.JS 3D SCENE
=================================== */

const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas: canvas,
alpha: true,
antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.z = 8;


/* ---------- Lights ---------- */

const ambientLight = new THREE.AmbientLight(
0xffffff,
1.2
);

scene.add(ambientLight);

const pointLight = new THREE.PointLight(
0x00d4ff,
3
);

pointLight.position.set(5,5,5);

scene.add(pointLight);


/* ---------- Main Object ---------- */

const geometry =
new THREE.IcosahedronGeometry(
2,
1
);

const material =
new THREE.MeshPhysicalMaterial({

color:0x00d4ff,

metalness:0.8,

roughness:0.15,

transmission:0.4,

clearcoat:1,

wireframe:false

});

const object =
new THREE.Mesh(
geometry,
material
);

scene.add(object);


/* ---------- Mouse Effect ---------- */

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
"mousemove",
(event)=>{

mouseX =
(event.clientX /
window.innerWidth)*2-1;

mouseY =
(event.clientY /
window.innerHeight)*2-1;

}
);


/* ---------- Animation ---------- */

function animate(){

requestAnimationFrame(animate);

object.rotation.x += 0.003;

object.rotation.y += 0.005;

object.position.x +=
(mouseX*2-object.position.x)*0.03;

object.position.y +=
(-mouseY*2-object.position.y)*0.03;

renderer.render(scene,camera);

}

animate();


/* ---------- Resize ---------- */

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
/* ===================================
   SCRIPT.JS PART 3C
   GSAP + PARTICLES + SCROLL
=================================== */

/* ---------- GSAP Intro ---------- */

gsap.from(".logo",{
y:-80,
opacity:0,
duration:1
});

gsap.from("nav ul li",{
y:-50,
opacity:0,
duration:1,
stagger:0.12,
delay:.3
});

gsap.from(".hero-left h3",{
x:-100,
opacity:0,
duration:1,
delay:.6
});

gsap.from(".hero-left h1",{
x:-120,
opacity:0,
duration:1,
delay:.8
});

gsap.from(".hero-left h2",{
x:-120,
opacity:0,
duration:1,
delay:1
});

gsap.from(".hero-left p",{
y:50,
opacity:0,
duration:1,
delay:1.2
});

gsap.from(".hero-buttons",{
scale:.8,
opacity:0,
duration:1,
delay:1.4
});

gsap.from(".glass-card",{
x:150,
opacity:0,
duration:1.4,
delay:.8
});


/* ---------- Scroll Reveal ---------- */

const reveal=document.querySelectorAll(
".section-title,.about-container,.skill-card,.service-card,.project-card,.contact form"
);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

reveal.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(60px)";

el.style.transition=".8s ease";

observer.observe(el);

});


/* ---------- tsParticles ---------- */

tsParticles.load("particles-js",{

background:{
color:"transparent"
},

fpsLimit:60,

particles:{

number:{
value:90
},

color:{
value:"#00d4ff"
},

links:{
enable:true,
distance:140,
color:"#00d4ff",
opacity:.25
},

move:{
enable:true,
speed:1.4
},

opacity:{
value:.5
},

size:{
value:{
min:1,
max:4
}
}

},

interactivity:{

events:{

onHover:{
enable:true,
mode:"grab"
},

resize:true

},

modes:{

grab:{
distance:180
}

}

}

});


/* ---------- Active Navigation ---------- */

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});
