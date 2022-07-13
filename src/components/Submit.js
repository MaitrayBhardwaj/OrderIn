import { useState, useContext } from 'react'
//import { collection, addDoc } from "firebase/firestore"; 
import { motion, AnimatePresence } from 'framer-motion'

import { DishesContext } from '../context/DishesContext'
//import { db } from '../firebase'

import Backdrop from './Backdrop'

function Submit () {
	const { selectedDishes, setHasSubmitted, setSelectedDishes } = useContext(DishesContext) 

	const [hasOrdered, setHasOrdered] = useState(false)

	const addOrder = async (ev) => {
		ev.preventDefault()
		console.log(selectedDishes)
		
		// let totalPrice = 0
		// let dishes = []

		// selectedDishes.forEach(dish => {
		// 	dishes.push(dish[0].name)
		// 	totalPrice += dish[0].price * dish.qty
		// })

		// await addDoc(collection(db, "orders"), {
		// 	createdAt: Date.now(),
		// 	dishes: dishes,
		// 	totalPrice: totalPrice
		// });
		setHasOrdered(true)
		setSelectedDishes([])
	}

	const closeModal = () => setHasSubmitted(false)

	return (
		<Backdrop onClick={closeModal}>
			<AnimatePresence>
				<motion.div
					onClick={(ev) => ev.stopPropagation()}
					initial={{ y: '-100vh', opacity: 0 }}
					animate={{ opacity: 1, y: '0' }}
					exit={{ y: '100vh', opacity: 0 }}
					className='bg-white submitModal border-2 shadow-md m-3 h-2/3 sm:w-5/6 md:w-1/6 lg:w-1/3 top-1/2 left-1/2 rounded-md flex flex-col p-5 items-center z-20'>
					<h2 className="text-2xl text-center">
						{ !hasOrdered ? 'Submit your order?' : 'Order submitted!' }
					</h2>
					{ hasOrdered ? 
						<img 
							src="https://media0.giphy.com/media/llQMjpdCwjdrVGzz1d/200w.gif?cid=82a1493b23n1b23owk85iatt8j0aoqcdx24k46v90n2m7e7w&rid=200w.gif&ct=s"
							className="w-32 mt-auto mb-1"
							alt="Successful" /> :
						<img 
							src="https://cdn-icons-png.flaticon.com/512/5184/5184592.png"
							className="w-32 mt-auto mb-1"
							alt="Question" />
					}
					<div className="flex text-white mt-auto mb-2">
						{
							!hasOrdered &&
							<button
								onClick={ addOrder } 
								className="bg-green-600 mx-1 rounded-md px-4 py-2 hover:bg-green-700">
									Submit
							</button>
						}
						<button
							onClick={closeModal}
							className="bg-red-600 hover:bg-red-700 mx-1 rounded-md px-4 py-2">Cancel</button>
					</div>
				</motion.div>
			</AnimatePresence>
		</Backdrop>
	)
}

export default Submit