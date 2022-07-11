import { useContext } from 'react'
import { BiTrash } from 'react-icons/bi'

import { DishesContext } from '../context/DishesContext'

function CartItem (props) {
    const { removeDish } = useContext(DishesContext)
    
    return (
        <div className="text-center border-y flex justify-between bg-white px-3 py-2">
            <div>
                <span className="">{props.dish[0].name} </span>
                <span className="text-gray-400 ml-1">({props.dish.qty})</span>
            </div>
            <button className="ml-3" onClick={() => removeDish(props.dish[0]._id)}>
                <BiTrash className="text-gray-500" />
            </button>
        </div>
    )
}

export default CartItem