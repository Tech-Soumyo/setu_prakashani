(() => { if (window.BEAEPAGEJS === undefined) {
            window.BEAEPAGEJS = [];
          }

          if(window.beaePageSetting == undefined) {
            window.beaePageSetting = {};
          }
          
          window.beaePageSetting.pageId = "684d542ac2f16e94ed0195a5";
              window.beaePageSetting.pageTitle = "Our team"; 
              window.beaePageSetting.pageType = "section";

          let js_4DRFORIS = () => { let BeaeUseHooks = {};
      try {
        let argid = 'beae-9w4ho6slsection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-9w4ho6sl',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-9w4ho6sl');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-9w4ho6sl: ', ex)
      };
    

      try {
        let argid = 'beae-tddvyseosection-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-tddvyseo',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-tddvyseo');
        args.el = args.els[0];
        ((h) => { window.BeaeSlider&&!h.noRunJs&&window.BeaeSlider(h) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-tddvyseo: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-0',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[0];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-1',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[1];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-2',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[2];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-3',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[3];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-4',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[4];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-5',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[5];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-6',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[6];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    

      try {
        let argid = 'beae-kx769cyiblock-imageloop-7',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-kx769cyi',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-kx769cyi');
        args.el = args.els[7];
        ((P) => { if(P.el){if(P.shape){const W=P.el.closest(".beae-slider-items");W&&!W.hasAttribute("data-svg")&&(W==null||W.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${P.id}" clipPathUnits="objectBoundingBox">
                                ${P.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),W.setAttribute("data-svg","true"))}let O=P.el.querySelector(".beae-image-content-position"),A,R=window.innerWidth>=768&&P.autoHover;var H=O.querySelector(".beae-img-ratio-control"),I=O.querySelector(".beae-img-comp-container"),z=O.querySelector(".beae-img-comp-container--second");if(H&&z){let W=function(F){let G=0,j;D(),R?O.onmouseover=function(oe){Z(oe)}:F.onmousedown=function(oe){Z(oe)},O.onmouseup=function(){q()},F.ontouchstart=function(oe){Z(oe)},O.ontouchend=function(){q()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),F.style.left&&parseInt(F.style.left)}function Z(oe){check=!1,oe.preventDefault(),oe.clientX?oe.clientX:oe.touches[0].clientX,parseInt(F.style.left),G=1,O.onmousemove=function(K){U(K)},O.ontouchmove=function(K){U(K)}}function q(){G=0,check=!0}function U(oe){if(G==0)return!1;j=Y(oe),j<0&&(j=0),j>100&&(j=100),Q(j)}function Y(oe){const K=O.getBoundingClientRect(),ee=(oe.changedTouches?oe.changedTouches[0].clientX:oe.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(ee*100/A)))}function Q(oe){F.style.left=oe+"%",z.style.clipPath=`polygon(${oe}% 0%, ${oe}% 100%, 100% 100%, 100% 0)`,I.style.clipPath=`polygon(0% 100%, 0% 0%, ${oe}% 0%, ${oe}% 100%)`}};H&&z&&W(H),window.addEventListener("resize",function(){H&&z&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{A=z.offsetWidth})}).observe(z),W(H))})}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-kx769cyi: ', ex)
      };
    }; if (window.BEAEBASE) {js_4DRFORIS()} else {window.BEAEPAGEJS.push(js_4DRFORIS)} })(); 