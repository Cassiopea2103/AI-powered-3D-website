import state from "../store/store"
import { useSnapshot } from "valtio"


const CustomButton = ( { type , title , customStyles , handleClick }) => {

    const snap = useSnapshot ( state )
  
    // generate button style according to type prop : 
    const generateStyle = ( type ) => {
        switch ( type ) {
            case 'filled' : 
                return {
                    backgroundColor : '#000' ,
                    color : snap.color  
                }

        }
    }

    return (
        <button
            className={`flex-1 rounded-md ${ customStyles }`}
            style = { generateStyle ( type ) }
            onClick = { handleClick }
        >
            { title }
        </button>
    )
}

export default CustomButton