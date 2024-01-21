import { useRef } from 'react';

import { easing } from 'maath' ; 

import { useFrame } from '@react-three/fiber' ; 

import { useSnapshot } from 'valtio';
import state from '../store/store';


const CameraRig = ( { children }) => {

    // set the ref : 
    const group = useRef () ; 

    // retrieve the state : 
    const snap = useSnapshot ( state ) ; 

    useFrame ( 
        ( state , delta ) => {
            // define breakpoints : 
            const isBreakpoint = window.innerWidth <= 1260 ; 
            const isMobile = window.innerWidth <= 600 ;

            // set the initial position of the model : 
            let targetPosition= [ 0.1, 0.65 , 2.5] ;

            // readjust the model position :
            // on Home page
            if ( snap.intro ) {
                if ( isBreakpoint ) {
                    targetPosition = [ 0.2 , -.1 , 4 ]
                }
                if ( isMobile ) {
                    targetPosition = [ -0.4 , 1.75 , 4.5 ]
                }
            }
            // on Customizer page :
            else {
                if ( isBreakpoint ) {
                    targetPosition = [ 0 , 0 , 2.5 ]
                }
                else {
                    targetPosition = [ 0 , 0 , 2 ]
                }
            }

            // set model camera transition :
            easing.damp3 ( state.camera.position  , targetPosition , 0.75, delta ) ;

            // set the 3D model rotation smoothly : 
            easing.dampE (
                group.current.rotation ,
                [ state.pointer.y , state.pointer.x , 0 ] ,
                0.15  ,
                delta  
            )
        }
    )

    return (
        <group
            ref = { group } 
        >
            { children }
        </group>
    )
}

export default CameraRig