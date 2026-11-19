const $ = id => document.getElementById(id);
let toastTimer;
let instability = 0;
function toast(message){
  const el=$("toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2800);
}
function glitch(amount=1){
  instability+=amount;
  const status=$("consoleStatus");
  if(instability>=4) status.textContent="A SMALL ADJUSTMENT HAS BEEN MADE FOR YOU.";
  if(instability>=8) status.textContent="YOUR PREFERENCES ARE BEING INTERPRETED.";
}
function goTo(id){
  const target=$(id);
  if(target) target.scrollIntoView({behavior:"smooth",block:"start"});
}
const nav=[...document.querySelectorAll(".nav-link")];
nav.forEach((button,index)=>button.addEventListener("click",()=>{
  let chosen=button.dataset.view;
  // The navigation occasionally opens the neighboring section instead.
  if(Math.random()<.17){chosen=nav[(index+1)%nav.length].dataset.view;glitch(1);toast("AQUA GUIDE: We thought you might prefer this section.");}
  nav.forEach(n=>n.classList.toggle("active",n.dataset.view===chosen));
  if(chosen==="welcome") goTo("hero");
  if(chosen==="treatments") goTo("treatments");
  if(chosen==="wellness") goTo("wellness");
  if(chosen==="yourvisit") goTo("yourvisit");
  document.querySelector(".main-nav").classList.remove("open");
}));
$("menuToggle").addEventListener("click",()=>document.querySelector(".main-nav").classList.toggle("open"));
$("exploreBtn").addEventListener("click",()=>goTo("treatments"));

$("calmSlider").addEventListener("input",e=>{
  let value=Number(e.target.value);
  if(Math.random()<.14){value=Math.max(0,Math.min(100,value+(Math.random()<.5?-15:15)));glitch(1);}
  $("calmValue").textContent=value+"%";
});
document.querySelectorAll(".mood").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".mood").forEach(b=>b.classList.remove("active"));
  // Sometimes the system chooses a different mood on the visitor's behalf.
  let chosen=btn;
  if(Math.random()<.18){chosen=document.querySelectorAll(".mood")[([...document.querySelectorAll(".mood")].indexOf(btn)+1)%3];glitch(1);toast("Mood updated based on our recommendation.");}
  chosen.classList.add("active");
  const responses={Calm:"A gentle place to begin.",Curious:"Stay open to what you discover.",Overwhelmed:"You do not have to solve everything right now."};
  $("moodResponse").textContent=responses[chosen.dataset.mood];
}));
$("saveIntention").addEventListener("click",()=>{
  const input=$("intention");
  if(!input.value.trim()){toast("Add a small intention first.");input.focus();return;}
  glitch(2);
  $("intentionMessage").textContent=Math.random()<.45?"Intention saved. We adjusted the wording slightly.":"Your intention has been received. Let it be enough.";
  if(Math.random()<.35) input.value=input.value.slice(0,Math.max(1,input.value.length-3));
  toast("THANK YOU FOR SHARING THAT WITH US.");
});
$("quietToggle").addEventListener("change",e=>{
  document.body.classList.toggle("quiet-mode",e.target.checked);
  glitch(1);
  if(Math.random()<.25){e.target.checked=!e.target.checked;document.body.classList.toggle("quiet-mode",e.target.checked);toast("Quiet mode has been gently adjusted.");}
  else toast(e.target.checked?"A quieter space, just for you.":"Welcome back to the light.");
});
$("resetConsole").addEventListener("click",()=>{
  $("calmSlider").value=50;$("calmValue").textContent="50%";
  $("intention").value="";$("quietToggle").checked=false;document.body.classList.remove("quiet-mode");
  glitch(2);
  toast("Your space has been refreshed. A little of the old remains.");
});
document.querySelectorAll(".card-link").forEach(btn=>btn.addEventListener("click",()=>{
  toast(btn.dataset.card+" — details are available during a consultation.");
  glitch(1);
}));
function book(){
  toast("CONSULTATION REQUEST RECEIVED. This demo is not connected to a booking system.");
  glitch(1);
}
$("bookTop").addEventListener("click",book);
$("bookBottom").addEventListener("click",book);

// A subtle unsolicited wellness reminder interrupts the otherwise soothing interface.
setInterval(()=>{
  if(Math.random()<.32 && !document.hidden){
    const messages=["A gentle reminder: you are allowed to pause.","No need to adjust anything right now.","Your progress does not need to be measured.","Take a breath. The rest can wait."];
    toast(messages[Math.floor(Math.random()*messages.length)]);
  }
},26000);
