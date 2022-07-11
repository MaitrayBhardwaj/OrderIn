import { RiShoppingCart2Line } from 'react-icons/ri'

function Dish (props) {
    const { dish } = props

    return (
        <div className="flex m-2 lg:w-2/5 md:w-1/3 grow bg-white flex-col border-slate-300 border-solid border rounded-md">
            <img src={dish.img} className="h-full w-full rounded-t-md" alt="" />
            <div className="p-3 border-t">
                <h5 className="font-semibold my-1 text-lg">{dish.name}</h5>
                <p className="my-3 mb-5">{dish.desc}</p>
                <div className="bg-blue-100 text-blue-600 rounded-2xl inline font-sm px-4 py-1">{dish.category}</div>
                <p className="my-3 text-slate-500">&#8377; {dish.price}</p>
                <button
                    onClick={props.addDish} 
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md my-2 text-sm flex items-center" >
                    <RiShoppingCart2Line className="mr-2 inline" />
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Dish