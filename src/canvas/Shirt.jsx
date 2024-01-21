import { easing } from 'maath' ; 

import { useFrame } from '@react-three/fiber';
import { Decal , useGLTF , useTexture } from '@react-three/drei';

import { useSnapshot } from 'valtio';
import state from '../store/store';

const Shirt = () => {

    // set the colors smoothly :
    useFrame ( ( state , delta ) => {
        easing.dampC ( materials.lambert1.color , snap.color , 0.25 , delta ) ;
    })

    // retrieve the state : 
    const snap = useSnapshot ( state ) ;

    // retrieve the 3D model : 
    const { nodes , materials } = useGLTF ('/shirt_baked.glb') ;

    // create textures : 
    const logoTexture = useTexture ( snap.logoDecal ) ;
    const fullTexture = useTexture ( snap.fullDecal ) ;

    // state string for the <group/> key :
    const stateString = JSON.stringify ( snap ) ;

  return (
    <group
        key = { stateString }
    >
        <mesh
            cashShadow 
            geometry = { nodes.T_Shirt_male.geometry }
            material={ materials.lambert1 }
            material-roughness = { 1 } 
            dispose = { null } 
        >
            {/* Display texture on the shirt  */}
            {/*full texture */}
            {
                snap.isFullTexture && (
                    <Decal
                        position= {[ 0 , 0 , 0 ]}
                        rotation = { [ 0 , 0 , 0 ] }
                        scale = { 1 }
                        map = { fullTexture }
                    />
                )
            }

            {/*Logo Texture */}
            {
                snap.isLogoTexture && (
                    <Decal
                        position = { [ 0 , -0.05 , 0.1 ]}
                        rotation = { [ 0 , 0 , 0 ] }
                        scale = { 0.25 }
                        map = { logoTexture }
                        depthTest = { false }
                        depthWrite = { true }
                    />
                )
            }
        </mesh>
    </group>
  )
}

export default Shirt