import React, { useEffect,useState, useMemo} from 'react';
import TodoList from './components/TodoList.js';
import Particles, { initParticlesEngine } from "@tsparticles/react"; 
import { loadSlim } from "@tsparticles/slim";
//import ParticlesBg from 'particles-bg'
import './App.css';
 const App=() =>{
  const [init, setInit] = useState(false);
  useEffect(() => {
    const fetchData =async () =>{
      await initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
      setInit(true);
    };
     fetchData();

  }, []);

 const particlesLoaded = (_container) => {
  console.log(_container);
  };
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#011109",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
        },
        number: {
          density: {
            enable: true,
            value_area:473.4885849793636
          },
          value: 175,
        },
        opacity: {
          value: 0.5,
         random: false,
          anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
        },
        shape: {
          type: "cricle",
          stroke: {
            width: 0,
            color: "#000000"
        },
        size: {
          "value": 12.02559045649142,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 102.32172874996948,
            "size_min": 10.557003759917487,
            "sync": true
          
          }
        },
      },
      detectRetina: true,
    }
    }),
    [],
  );
 return (
    <div>
    <TodoList />
    { init &&
                <Particles
                      id="tsparticles"
                      particlesLoaded={particlesLoaded}
                      options={options}
                    />}    

     {/* <ParticlesBg 
      type="tadpole"
       bg={true}
  />*/}
    </div>
  );
}
export default App;