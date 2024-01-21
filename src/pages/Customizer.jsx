import { useState , useEffect } from 'react' ; 

import { AnimatePresence , motion } from 'framer-motion';

import { useSnapshot } from 'valtio';
import state from '../store/store';

import config from '../config/config' ; 
import { downloadCanvasToImage , reader } from '../config/helpers'
import { EditorTabs , FilterTabs , DecalTypes } from '../config/constants' ; 
import { fadeAnimation , slideAnimation } from '../config/motion' ; 

import { download } from '../assets' ; 

import {
    CustomButton , 
    ColorPicker , 
    FilePicker , 
    AIPicker , 
    Tab
} from '../components'


const Customizer = () => {

    // retrieve the state snapshot : 
    const snap = useSnapshot ( state ) ; 

    return ( 
        <AnimatePresence>
            {
                !snap.intro && 
                <>
                    {/* Left sidebar Tabs */}
                    <motion.div
                        key = 'custom' 
                        className='absolute left-0 top-0 z-10'
                        {...slideAnimation ('left')}
                    >
                        <div
                            className='flex items-center min-h-screen'
                        >
                            <div
                                className='editortabs-container tabs'
                            >
                                {
                                    EditorTabs.map ( 
                                        ( tab ) => (
                                            <Tab
                                                key = { tab.name }
                                                tab = { tab } 
                                                handleClick = { () => {}}
                                            />
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </motion.div>    

                    {/* Go Back button ( top right )  */}
                    <motion.div
                        className='absolute z-10 top-5 right-5'
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type = 'filled'
                            title = 'Go Back'
                            handleClick = { () => state.intro = true }
                            customStyles = 'w-fit px-4 py-2.5 font-bold text-sm'
                        />
                    </motion.div>

                    {/* Action button tabs ( bottom ) */}
                    <motion.div
                        className='filtertabs-container'
                        {...slideAnimation ( 'up' )}
                    >
                        {
                            FilterTabs.map (
                                ( tab ) => (
                                    <Tab
                                        key = { tab.name }
                                        tab = { tab } 
                                        isFilterTab 
                                        isActiveTab = ""
                                        handleClick = { () => {}}
                                    />
                                )
                            )
                        }
                    </motion.div>
                </>
            }
        </AnimatePresence>
    )
} ;

export default Customizer