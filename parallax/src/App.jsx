import { useRef } from 'react';
import moon from '/moon.png';
import land from '/land.png';
import cat from '/cat.gif';

import { Parallax, ParallaxLayer} from '@react-spring/parallax';

function App() {
  const ref = useRef();

  return (
    <div>
      <Parallax pages={3.5} ref={ref}> 

        <ParallaxLayer 
          offset={0} // starting page
          speed={1} 
          factor={1}
          style={{
            backgroundImage: `url(${moon})`,
            backgroundSize: 'cover',
            
          }}
        />
      
        <ParallaxLayer
          offset={1}
          speed={1}
          factor={4}
          style={{
            backgroundImage: `url(${land})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer 
          offset={0.2} 
          onClick={() => ref.current.scrollTo(3)}
          speed={0.05}>
          <h2>Welcome to my website</h2>
        </ParallaxLayer>

        <ParallaxLayer 
          offset={2.75} 
          speed={0.5}>
          <h2>Web development is fun!</h2>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 0.9, end: 2.5}}       
          style={{
            textAlign: 'center'
          }} 
        >
          <img src={cat} />
          
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;