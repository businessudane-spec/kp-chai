'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import { Fraunces } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['700', '900'] });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroFramesRef = useRef<HTMLImageElement[]>([]);



  // Refs for Sections 1 & 3
  const wrapperRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const section3Ref = useRef<HTMLDivElement>(null);
  const section3TextRef = useRef<HTMLDivElement>(null);
  
  // The SINGLE traveling 23.png image
  const travelingImgRef = useRef<HTMLImageElement>(null);

  // Refs for Section 4
  const section4Ref = useRef<HTMLDivElement>(null);

  // Refs for Section 5
  const section5Ref = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryXRef = useRef(0);

  // Refs for Section 6
  const section6Ref = useRef<HTMLDivElement>(null);
  const globeCleanupRef = useRef<(() => void) | null>(null);

  // Refs for Footer
  const footerRef = useRef<HTMLElement>(null);
  const footerHeadingRef = useRef<HTMLHeadingElement>(null);



  const foodsData = [
    { name: 'Bun Maska', desc: 'Buttery & Soft', lineH: 120 },
    { name: 'Samosa', desc: 'Crispy & Spiced', lineH: 80 },
    { name: 'Vada Pav', desc: 'Mumbai Classic', lineH: 150 },
    { name: 'Pakoda', desc: 'Onion Fritters', lineH: 100 },
  ];

  const gallery5Data = [
    { name: 'Bun Maska',   rating: '4.8', color: '#c8a45a', img: 1 },
    { name: 'Samosa',      rating: '4.6', color: '#b5543a', img: 2 },
    { name: 'Vada Pav',    rating: '4.9', color: '#6a8f5e', img: 3 },
    { name: 'Pakoda',      rating: '4.5', color: '#7a5c8a', img: 4 },
    { name: 'Karak Chai',  rating: '5.0', color: '#c06b2d', img: 1 },
    { name: 'Jalebi',      rating: '4.7', color: '#c8a45a', img: 2 },
    { name: 'Idli',        rating: '4.4', color: '#5a7f8a', img: 3 },
    { name: 'Pav Bhaji',   rating: '4.8', color: '#b5543a', img: 4 },
    { name: 'Chai Latte',  rating: '4.9', color: '#6a8f5e', img: 1 },
    { name: 'Dosa',        rating: '4.6', color: '#7a5c8a', img: 2 },
  ];

  const locationsData = [
    {
      name: 'KP Chai Maryam',
      address: 'TABLE 3 RESTAURANT EST, Maryam plaza-2 113 Rd-Deira-Al Dhagaya-Dubai-UAE',
      mapsUrl: 'https://maps.google.com?q=Maryam+plaza+Deira+Dubai',
      whatsapp: 'https://wa.me/9710000000001',
    },
    {
      name: 'KP Chai Afra Plaza',
      address: 'Afra Plaza–METRO STATION–near GOLD SOUK-Deira-Dubai-UAE',
      mapsUrl: 'https://maps.google.com?q=Afra+Plaza+Gold+Souk+Dubai',
      whatsapp: 'https://wa.me/9710000000002',
    },
    {
      name: 'KP Chai Al Warqa',
      address: '5CR2+W49 – Al Warqa – Al Warqa 1 – Dubai – UAE',
      mapsUrl: 'https://maps.google.com?q=Al+Warqa+Dubai',
      whatsapp: 'https://wa.me/9710000000003',
    },
    {
      name: 'KP Chai Nadapuram',
      address: 'Jac shopping complex, M, Thalassery Rd, Kakkemvelli, Nadapuram, Kerala 673504',
      mapsUrl: 'https://maps.google.com?q=Nadapuram+Kerala',
      whatsapp: 'https://wa.me/9710000000004',
    },
    {
      name: 'Signature KP Chai Cafe',
      address: 'Al Barsha Heights Tecom Al Thaniya-1, Dubai, UAE',
      mapsUrl: 'https://maps.google.com?q=Al+Barsha+Heights+Tecom+Dubai',
      whatsapp: 'https://wa.me/9710000000005',
    },
    {
      name: 'KP Chai Cafe Union',
      address: 'Union RTA Bus Station Block A, Dubai, UAE',
      mapsUrl: 'https://maps.google.com?q=Union+RTA+Bus+Station+Dubai',
      whatsapp: 'https://wa.me/9710000000006',
    },
  ];

  useEffect(() => {
    // Basic setup for a cinematic timeline
    const ctx = gsap.context(() => {
      // ── HERO FRAME SEQUENCE PRELOAD ──────────────────────────────
      const FRAME_COUNT = 270;
      const getFrameSrc = (n: number) =>
        `/images/hero/heros/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

      // Preload all frames into memory
      const frames: HTMLImageElement[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
        frames.push(img);
      }
      heroFramesRef.current = frames;

      // Draw frame onto canvas
      const drawFrame = (index: number) => {
        const canvas = heroCanvasRef.current;
        if (!canvas) return;
        const ctx2d = canvas.getContext('2d');
        if (!ctx2d) return;
        const img = frames[index];
        if (!img) return;
        const draw = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          // Contain-fit: scale image to fit inside canvas without cropping
          const scale = Math.min(
            canvas.width / img.naturalWidth,
            canvas.height / img.naturalHeight
          );
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          ctx2d.clearRect(0, 0, canvas.width, canvas.height);
          ctx2d.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
        };
        if (img.complete) draw();
        else img.onload = draw;
      };

      // ── HERO SECTION TIMELINE ────────────────────────────────────
      // Hero pinned timeline — covers full 270 frame sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%',   // scroll room for frame sequence
          scrub: 1,
          pin: true,
        },
      });

      // Phase 1: text fades out and canvas fades in
      tl.to(heroTextRef.current, {
        opacity: 0, y: -100, duration: 1.5, ease: 'power2.inOut'
      }, 0);
      tl.to(heroCanvasRef.current, { opacity: 1, duration: 1, ease: 'power1.inOut' }, 0);

      // Phase 2: scroll-scrubbed frame sequence on canvas
      const frameProxy = { frame: 0 };
      tl.to(
        frameProxy,
        {
          frame: FRAME_COUNT - 1,
          duration: 10,          // occupies majority of the pin
          ease: 'none',
          onUpdate: () => drawFrame(Math.round(frameProxy.frame)),
        },
        1 // start slightly after text starts fading
      );

      // Phase 3: canvas fades out as pin ends
      tl.to(heroCanvasRef.current, { opacity: 0, duration: 1.5, ease: 'power2.in' }, '+=0.5');

      // SECTION 1 TEXT ANIMATION
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 75%',
            end: 'center center',
            scrub: 1,
          },
        }
      );

      // Top Left 1.png Parallax
      gsap.fromTo(
        img1Ref.current,
        { x: -100, y: -50, opacity: 0, rotation: -45 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: -10,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        }
      );

      // THE TRAVELING 23.PNG ANIMATION
      gsap.to(travelingImgRef.current, {
        top: '88%',     
        left: '50%',    
        xPercent: -50,  
        rotation: 0,    
        scale: 1.3,     
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',        
          end: 'bottom bottom',    
          scrub: 1,                
        },
      });

      // SECTION 3 TEXT ANIMATION
      gsap.fromTo(
        section3TextRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 75%',
            end: 'center center',
            scrub: 1,
          },
        }
      );

      // SECTION 4 ANIMATIONS
      gsap.fromTo(
        gsap.utils.toArray('.food-img'),
        { y: -600, opacity: 0, rotation: -45 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          stagger: 0.1,
          ease: 'bounce.out',
          duration: 1.5,
          scrollTrigger: {
            trigger: section4Ref.current,
            start: 'top 60%',
          }
        }
      );

      const s4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section4Ref.current,
          start: 'top top',
          end: '+=150%', 
          scrub: 1,
          pin: true,
        }
      });

      const lines = gsap.utils.toArray('.food-line-container');
      const texts = gsap.utils.toArray('.food-text');

      lines.forEach((line, i) => {
        s4Tl.fromTo(line as Element, { height: '0%' }, { height: '100%', duration: 1 }, i * 0.5);
        s4Tl.fromTo(texts[i] as Element, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'back.out(2)' }, (i * 0.5) + 0.8);
      });

      // SECTION 5 - REVEAL HEADING ONLY
      gsap.fromTo('.section5-heading',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: section5Ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Section 5 - no pin, gallery controlled by arrows
      // (horizontal scroll removed - arrows handle it)

      // SECTION 6 - MAPBOX GLOBE
      // KEY FIX: ScrollTrigger created SYNCHRONOUSLY inside gsap.context
      // so Lenis scroll position is properly fed into GSAP's virtual scroll.
      // Map instance stored in refs, callbacks check readiness before acting.

      let mapInstance: any = null;
      let mapIsReady = false;
      let activeMarkers: any[] = [];
      let markerTimers: ReturnType<typeof setTimeout>[] = [];
      let animTimer: ReturnType<typeof setTimeout> | null = null;

      const clearAllMarkers = () => {
        markerTimers.forEach(clearTimeout);
        markerTimers = [];
        activeMarkers.forEach(m => m.remove());
        activeMarkers = [];
      };

      const doFlyToDubai = () => {
        if (!mapInstance || !mapIsReady) return;
        if (animTimer) clearTimeout(animTimer);
        clearAllMarkers();
        mapInstance.flyTo({
          center: [55.2708, 25.2048],
          zoom: 9.5, pitch: 55, bearing: 15,
          duration: 4500, essential: true, curve: 1.3, speed: 0.2,
        });
        // Stagger in markers after fly lands
        animTimer = setTimeout(() => {
          const locs = [
            { coords: [55.3290, 25.2703], name: 'KP Chai Maryam',        icon: '☕' },
            { coords: [55.3013, 25.2710], name: 'KP Chai Afra Plaza',     icon: '☕' },
            { coords: [55.4019, 25.1997], name: 'KP Chai Al Warqa',       icon: '☕' },
            { coords: [55.1745, 25.1004], name: 'Signature KP Chai Cafe', icon: '⭐' },
            { coords: [55.3197, 25.2795], name: 'KP Chai Cafe Union',     icon: '☕' },
          ];
          locs.forEach((loc, i) => {
            const t = setTimeout(() => {
              const el = document.createElement('div');
              el.className = 'kp-marker-wrapper';
              el.innerHTML = `
                <div class="kp-label">${loc.name}</div>
                <div class="kp-teardrop"><span class="kp-teardrop-inner">${loc.icon}</span></div>
                <div class="kp-dot"></div>`;
              el.style.opacity = '0';
              el.style.transform = 'scale(0)';
              el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
              const mapboxgl = (window as any).__kpMapboxgl;
              if (!mapboxgl) return;
              const m = new mapboxgl.Marker({
                element: el, anchor: 'bottom',
                pitchAlignment: 'viewport', rotationAlignment: 'viewport',
              }).setLngLat(loc.coords as [number, number]).addTo(mapInstance);
              activeMarkers.push(m);
              requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
              });
            }, i * 400);
            markerTimers.push(t);
          });
        }, 800);
      };

      const doFlyToGlobe = () => {
        if (!mapInstance) return;
        if (animTimer) clearTimeout(animTimer);
        clearAllMarkers();
        mapInstance.flyTo({
          center: [30, 15], zoom: 1.5, pitch: 0, bearing: 0,
          duration: 2200, essential: true, curve: 1.2,
        });
      };

      // ✅ ScrollTrigger created SYNCHRONOUSLY — captured by gsap.context
      ScrollTrigger.create({
        trigger: section6Ref.current,
        start: 'top 65%',
        onEnter: doFlyToDubai,
        onEnterBack: doFlyToDubai,
        onLeaveBack: doFlyToGlobe,
      });

      // Initialize Mapbox async — map instance stored for callbacks above
      const initMapbox = async () => {
        const mapboxgl = (await import('mapbox-gl')).default;
        if (!section6Ref.current) return;
        (window as any).__kpMapboxgl = mapboxgl; // store for marker creation
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
        const map = new mapboxgl.Map({
          container: 'kp-globe-map',
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: [30, 15], zoom: 1.5, pitch: 0, bearing: 0,
          projection: 'globe' as any, interactive: false,
        });
        mapInstance = map;
        map.on('style.load', () => {
          (map as any).setFog({
            'space-color': '#060d1f', 'star-intensity': 0.85,
            'color': 'rgba(100,155,220,0.3)', 'high-color': '#243b6e', 'range': [0.5, 10],
          });
          mapIsReady = true;
          // If ScrollTrigger already fired before map was ready, fly now
          if (ScrollTrigger.isInViewport(section6Ref.current!, 0.35)) {
            doFlyToDubai();
          }
        });
        globeCleanupRef.current = () => {
          clearAllMarkers();
          if (animTimer) clearTimeout(animTimer);
          delete (window as any).__kpMapboxgl;
          map.remove();
        };
      };
      initMapbox();

      // FOOTER ANIMATION
      gsap.fromTo(
        footerHeadingRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1, opacity: 1, y: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          }
        }
      );

    });

    return () => {
      ctx.revert();
      globeCleanupRef.current?.();
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="relative min-h-screen bg-white text-neutral-900 selection:bg-amber-500/30">
        
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full p-6 md:p-10 z-[100] flex justify-between items-center mix-blend-difference text-white pointer-events-none">
          <h1 className={`${fraunces.className} text-2xl md:text-3xl font-black tracking-widest uppercase drop-shadow-md`}>KP Chai</h1>
          <button className="flex flex-col gap-1.5 p-2 pointer-events-auto">
            <span className="w-8 h-[3px] bg-white rounded-full" />
            <span className="w-8 h-[3px] bg-white rounded-full" />
          </button>
        </header>

        {/* HERO SECTION */}
        <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-[#e6e5e0] text-[#432311]">
          <div ref={heroTextRef} className="relative z-30 text-center flex flex-col items-center px-6 mt-12">
            <h1 className={`${fraunces.className} text-5xl md:text-8xl font-black text-[#432311] leading-[1.1] tracking-tight mb-6 drop-shadow-sm`}>
              Life’s Richer<br />After Chai
            </h1>
            <p className="text-lg md:text-2xl font-medium text-[#5c3c26] mb-10 max-w-2xl">
              Because great chai is the start of something even greater
            </p>
            <button className="px-12 py-5 bg-[#432311] text-white font-bold rounded-full text-xl hover:bg-[#5c3c26] transition-all hover:scale-105 shadow-xl">
              Explore
            </button>
          </div>

          {/* Canvas for Frame Animation - inline opacity:0 so GSAP can animate it */}
          <canvas 
            ref={heroCanvasRef} 
            className="absolute inset-0 z-25 w-full h-full pointer-events-none"
            style={{ opacity: 0 }}
          />

          <div className="absolute bottom-10 z-50 text-center w-full">

            <p className="text-[#432311]/50 uppercase tracking-[0.3em] text-sm font-bold animate-pulse">Scroll to craft</p>
          </div>
        </div>

        {/* WRAPPER FOR SECTIONS 1 & 3 */}
        <div ref={wrapperRef} className="relative w-full z-10">
          <img 
            ref={travelingImgRef}
            src="/images/section1/23.png" 
            alt="Chai Ingredient 2"
            className="absolute z-50 w-28 md:w-44 object-contain drop-shadow-2xl pointer-events-none"
            style={{ top: '15%', left: '75%', transform: 'rotate(45deg)' }} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2M4NTUzNCIgcng9IjIwIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSAzMCAzMCkiLz48L3N2Zz4=';
            }}
          />

          {/* SECTION 1 - CHAI STORY */}
          <div ref={section1Ref} className="relative min-h-screen w-full flex items-center justify-center bg-[#fdfdfc] overflow-hidden py-32 z-10">
            <img 
              ref={img1Ref}
              src="/images/section1/1.png" 
              alt="Chai Ingredient 1"
              className="absolute top-16 md:top-32 left-8 md:left-32 w-24 md:w-36 object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0YjM4NCIgcng9IjUwIiAvPjwvc3ZnPg==';
              }}
            />
            <div ref={textRef} className="relative z-10 max-w-3xl px-6 mx-auto text-center flex flex-col items-center">
              <h2 className={`${fraunces.className} text-5xl md:text-7xl font-black text-[#432311] leading-[1.1] tracking-tight mb-8 drop-shadow-sm`}>
                Where Every Perfect<br/>Cup Tells a Story
              </h2>
              <p className="text-lg md:text-xl font-medium text-[#5c3c26] leading-relaxed mb-12 max-w-2xl px-4">
                Our ingredients are fresh, our brews are hot, and our team is fired up to serve you the best chai in town. From classic Karak to loaded flavor bombs, every cup is made with intention, fun, and a little chai magic. We believe chai is more than a drink, it's a celebration.
              </p>
              <button className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold border-[3px] border-black rounded-full shadow-[0_6px_20px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
                <span className="text-lg pt-0.5">Order on -</span> <span className="text-[#06C167] font-black text-2xl leading-none">Uber Eats</span>
              </button>
            </div>
          </div>

          {/* SECTION 3 - THE TABLE */}
          <div ref={section3Ref} className="relative min-h-[120vh] w-full flex flex-col items-center justify-start bg-neutral-900 overflow-hidden pt-32 z-20">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-[#2c1810] z-0" />
            <div ref={section3TextRef} className="relative z-10 text-center max-w-3xl px-6 mt-10 md:mt-20 mb-20">
               <h2 className={`${fraunces.className} text-5xl md:text-7xl font-black text-amber-500 leading-[1.1] tracking-tight mb-8 drop-shadow-lg`}>
                Served to Perfection
              </h2>
              <p className="text-lg md:text-xl text-amber-100/80 font-light leading-relaxed max-w-2xl mx-auto">
                We prepare each cup with precision, blending the richest spices and pouring it right at your table. Experience the warmth and authenticity of true chai.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4 - THE FOODS */}
        <div ref={section4Ref} className="relative h-screen w-full bg-[#fdfdfc] flex flex-col items-center justify-end overflow-hidden pb-[15vh]">
          <h2 className={`${fraunces.className} absolute top-24 text-4xl md:text-6xl text-[#432311] text-center drop-shadow-sm`}>
            Perfect Companions
          </h2>
          <div className="relative z-20 flex justify-center items-end gap-6 md:gap-16 w-full max-w-6xl px-4">
             {foodsData.map((food, i) => (
                <div key={i} className="relative flex flex-col items-center w-20 md:w-32">
                  <div className="absolute bottom-full mb-4 flex flex-col items-center w-full">
                     <div className="food-text opacity-0 -translate-y-4 text-center mb-2 bg-[#432311] px-3 py-2 rounded-lg shadow-xl w-max">
                       <h3 className="font-bold text-amber-400 text-sm md:text-base whitespace-nowrap">{food.name}</h3>
                       <p className="text-[10px] md:text-xs text-amber-100/70 whitespace-nowrap">{food.desc}</p>
                     </div>
                     <div className="relative w-4 flex justify-center" style={{ height: `${food.lineH}px` }}>
                        <div className="food-line-container absolute bottom-0 w-full overflow-hidden" style={{ height: '0%' }}>
                          <svg height={food.lineH} width="10" className="absolute bottom-0">
                             <circle cx="5" cy="5" r="4" fill="#f59e0b" />
                             <line x1="5" y1="5" x2="5" y2="100%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                          </svg>
                        </div>
                     </div>
                  </div>
                  <div className="food-img w-full aspect-square bg-neutral-200/50 rounded-full shadow-2xl border-4 border-white relative flex items-center justify-center">
                    <img 
                      src={`/images/section1/food${i+1}.png`} 
                      alt={food.name}
                      className="w-[120%] h-[120%] object-contain drop-shadow-xl" 
                      onError={(e) => {
                         (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NCIgZmlsbD0iI2Y1OWUwYiIvPjwvc3ZnPg==';
                      }}
                    />
                  </div>
                </div>
             ))}
          </div>
          <div className="absolute bottom-[10vh] w-full h-[6px] bg-gradient-to-r from-transparent via-[#8d6e63] to-transparent z-10 opacity-50" />
          <div className="absolute bottom-0 w-full h-[10vh] bg-[#f5f5f4] border-t border-[#e7e5e4] z-0" />
        </div>

        {/* SECTION 5 - PRODUCT GALLERY (Bakery Style) */}
        <div ref={section5Ref} className="relative w-full bg-[#fdf8f0] flex flex-col justify-center overflow-hidden px-8 md:px-16 py-16">
          
          {/* TOP ROW: Heading left + Category pills right */}
          <div
            className="section5-heading flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12"
            style={{ opacity: 0 }}
          >
            {/* Heading - forced 2 lines */}
            <h2 className={`${fraunces.className} text-5xl md:text-7xl font-black text-[#2d1a0e] leading-[1.0] uppercase`}>
              What We Brew<br />Here Daily —
            </h2>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 md:max-w-sm md:justify-end pt-2">
              {[
                { label: 'Karak', count: 18 },
                { label: 'Masala', count: 12 },
                { label: 'Saffron', count: 7 },
                { label: 'Snacks', count: 14 },
                { label: 'Bun Maska', count: 9, active: true },
                { label: 'Sweets', count: 11 },
              ].map((cat, i) => (
                <span
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all cursor-pointer
                    ${cat.active
                      ? 'bg-[#f59e0b] border-[#f59e0b] text-white shadow-lg scale-105'
                      : 'bg-white border-[#e8ddd0] text-[#432311] hover:border-amber-400'
                    }`}
                >
                  {cat.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-xs font-black ${cat.active ? 'bg-white text-[#f59e0b]' : 'bg-amber-100 text-amber-700'}`}>
                    {cat.count}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* CARD GALLERY ROW */}
          <div className="relative w-full overflow-hidden">
            {/* Prev Arrow */}
            <button 
              id="gallery-prev"
              onClick={() => {
                if (!galleryRef.current) return;
                const cardW = 288 + 24; // w-72 + gap-6
                galleryXRef.current = Math.min(0, galleryXRef.current + cardW * 2);
                gsap.to(galleryRef.current, { x: galleryXRef.current, duration: 0.6, ease: 'power2.out' });
              }}
              className="absolute left-0 top-[45%] -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border border-neutral-200 hover:scale-110 transition-all cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#432311" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div
              ref={galleryRef}
              className="flex gap-6 pl-14 pr-14 gallery-3d-wrapper"
              style={{ willChange: 'transform', paddingTop: '56px' }}
            >
              {gallery5Data.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-64 md:w-72 gallery-item-3d flex flex-col items-center">
                  {/* Card — overflow-visible so image pops above */}
                  <div
                    className="relative w-full h-56 md:h-64 rounded-[2rem] shadow-xl overflow-visible flex items-end justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    {/* Rounded inner clip for bg only */}
                    <div className="absolute inset-0 rounded-[2rem] overflow-hidden" style={{ backgroundColor: item.color }} />
                    {/* Food image overflows top */}
                    <img
                      src={`/images/section1/food${item.img}.png`}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 w-[85%] h-[85%] object-contain drop-shadow-2xl z-10"
                      alt={item.name}
                    />
                    {/* Rating Badge */}
                    <div className="absolute bottom-4 left-4 z-20 bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                      <span className="text-[#432311] font-black text-sm leading-none">{item.rating}</span>
                      <span className="text-amber-500 text-sm">★</span>
                    </div>
                  </div>
                  {/* Name below card */}
                  <p className="mt-6 text-[#2d1a0e] font-bold text-sm uppercase tracking-widest text-center">{item.name}</p>
                  <p className="text-[#8a6a50] text-xs mt-1 text-center">KP Special</p>
                </div>
              ))}
            </div>

            {/* Next Arrow */}
            <button 
              id="gallery-next"
              onClick={() => {
                if (!galleryRef.current) return;
                const cardW = 288 + 24;
                const maxX = -(galleryRef.current.scrollWidth - galleryRef.current.parentElement!.offsetWidth + 56);
                galleryXRef.current = Math.max(maxX, galleryXRef.current - cardW * 2);
                gsap.to(galleryRef.current, { x: galleryXRef.current, duration: 0.6, ease: 'power2.out' });
              }}
              className="absolute right-0 top-[45%] -translate-y-1/2 z-20 w-10 h-10 bg-[#f59e0b] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        {/* SECTION 6 - MAPBOX GLOBE */}
        <div ref={section6Ref} className="relative h-screen w-full overflow-hidden">

          {/* Mapbox container — fills entire section */}
          <div id="kp-globe-map" className="absolute inset-0 w-full h-full" />

          {/* Top overlay heading */}
          <div className="absolute top-10 left-0 right-0 text-center z-20 pointer-events-none">
            <p className="text-amber-400 uppercase tracking-[0.35em] text-xs font-bold mb-2 drop-shadow-lg">
              Find Us Near You
            </p>
            <h2 className={`${fraunces.className} text-4xl md:text-6xl font-black text-white drop-shadow-2xl`}>
              Our Locations
            </h2>
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
            <div className="bg-gradient-to-t from-black/70 to-transparent px-8 py-6 text-center">
              <p className="text-white/70 text-sm font-medium">
                5 locations across the UAE — hover any pin to see details
              </p>
            </div>
          </div>

        </div>

        {/* SECTION 7 - FOOTER */}
        <footer ref={footerRef} className="relative w-full bg-[#1a0f08] text-white overflow-hidden py-24 md:py-32 px-6 border-t-[8px] border-amber-600">
          
          <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
            {/* Top link grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full mb-24 text-center md:text-left text-amber-100/70 text-sm tracking-widest uppercase font-bold">
              <div className="flex flex-col gap-4 items-center md:items-start">
                <h4 className="text-white mb-2">Socials</h4>
                <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
                <a href="#" className="hover:text-amber-500 transition-colors">TikTok</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Facebook</a>
              </div>
              <div className="flex flex-col gap-4 items-center md:items-start">
                <h4 className="text-white mb-2">Locations</h4>
                <a href="#" className="hover:text-amber-500 transition-colors">Deira</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Al Warqa</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Tecom</a>
              </div>
              <div className="flex flex-col gap-4 items-center md:items-start">
                <h4 className="text-white mb-2">Menu</h4>
                <a href="#" className="hover:text-amber-500 transition-colors">Hot Chai</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Snacks</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Combos</a>
              </div>
              <div className="flex flex-col gap-4 items-center md:items-start">
                <h4 className="text-white mb-2">Contact</h4>
                <a href="#" className="hover:text-amber-500 transition-colors">Franchise</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Careers</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Say Hello</a>
              </div>
            </div>

            {/* Massive Heading */}
            <h2 
              ref={footerHeadingRef}
              className={`${fraunces.className} text-[15vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-700 text-center uppercase tracking-tighter w-full mb-12`}
              style={{ WebkitTextStroke: '1px rgba(245, 158, 11, 0.2)' }}
            >
              KP Chai
            </h2>

            <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-amber-900/50 pt-8 text-xs text-amber-500/50 uppercase tracking-widest font-bold">
              <p>© 2026 KP CHAI. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.05)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </footer>

      </main>
    </ReactLenis>
  );
}



