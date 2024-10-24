import {motion} from 'framer-motion';

import {styles} from '../styles';
import { ComputersCanvas } from './canvas';
import { section } from 'framer-motion/client';


const Hero = () => {
  return (
<section className=' relative w-full h-screen mx-auto '>
  <div className={`${styles.paddingX} absolute inset-0 top-[120px] 
  max-w-7xl mx-auto flex flex-row items-start gap-5`}>
<div className='flex flex-col justify-center items-center mt-5'>

  <div className='w-5 h-5 rounded-full bg-[#915eff]'/>

  <div className='w-1 sm:h-80 h-40 violet-gradient'/>
</div>

<div >   <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm Yousef<span className='text-[#915EFF]'> Full Stack Developer</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          I'm a Full Stack Developer skilled in React, <br className='sm:block hidden' />
          I create responsive web applications with seamless user experiences and scalable solutions.
          Both in front-end and back-end
          </p></div>
  </div>

  <ComputersCanvas />
</section>
  )
}

export default Hero