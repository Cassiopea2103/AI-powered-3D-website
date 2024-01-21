import { motion , AnimatePresence } from 'framer-motion' ; 

import { useSnapshot } from 'valtio' ; 
import state from '../store/store'

import {
    headContainerAnimation, 
    headContentAnimation , 
    headTextAnimation, 
    slideAnimation
} from '../config/motion'

import { CustomButton } from '../components';

const Home = () => {

    // get a snapshot of the state : 
    const snap = useSnapshot ( state ) ; 
    

    return (
        <AnimatePresence>
            {
                snap.intro && 
                <motion.section
                    className='home p-4'
                    {...slideAnimation('left')}
                >
                    {/* Header */}
                    <motion.header
                        {...slideAnimation('down')}
                    >
                        <img 
                            src="./threejs.png" 
                            alt="logo" 
                            className='w-8 h-8 object-contain'  
                        />
                    </motion.header>

                    {/* Main content */}
                    <motion.section
                        className='home-content'
                        {...headContainerAnimation}
                    >
                        <motion.div
                            {...headTextAnimation}
                        >
                            <h1
                                className='head-text'
                            >
                                LET'S DO IT !
                            </h1>
                        </motion.div>

                        <motion.div
                            {...headContentAnimation} 
                            className='flex flex-col p-5'
                        >
                            <p
                                className='text-slate-800 max-w-md font-normal text-base'
                            >
                                Create your unique and exclusive shirt with our brand-new 
                                3D cusomization tool. <strong>Unleash your imagination</strong>&nbsp;
                                and define your own style !
                            </p>

                            <CustomButton
                                type = 'filled' 
                                title = 'Customize' 
                                handleClick = { () => state.intro=false } 
                                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                            />
                        </motion.div>
                    </motion.section>
                    

                </motion.section>
            }
        </AnimatePresence>
    )
}

export default Home ; 