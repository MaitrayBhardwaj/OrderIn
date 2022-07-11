import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { FaArrowRight } from 'react-icons/fa';
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from 'react-icons/io';

import { DishesContext } from '../context/DishesContext';

import CartItem from './CartItem'

function Cart () {
	const { selectedDishes } = useContext(DishesContext)

	const [totalPrice, setTotalPrice] = useState(0)
	const [isOpen, setIsOpen] = useState(true)
	const [alert, setAlert] = useState(false)

	useEffect(() => {
		if(!isOpen){
			setAlert(true)
			setTimeout(() => setAlert(false), 250)
		}

		let total = 0
		selectedDishes.forEach(dish => {
			total = total + dish[0].price * dish.qty
		})
		setTotalPrice(total)
	}, [selectedDishes])

	const items = selectedDishes.map(dish => (
		<motion.div
			animate={{ x: 0, opacity: 1 }}
			initial={{ x: 100, opacity: 0}}
		>
			<CartItem key={dish[0]._id} dish={dish} />
		</motion.div>
	))

	return (
		<div className="bottom-2 right-2 p-2 animate-shake flex lg:w-1/3 md:w-2/5 sm:w-2/3 flex-col rounded-md fixed z-10">
			<div className={`${alert ? `bg-red-600` : `bg-green-600`} font-2xl flex justify-between px-3 py-2 text-white rounded-t-md`}>
				<span>Your Order</span>
				<button
					className='ml-3'
					onClick={() => setIsOpen(prev => !prev)}>
					{ isOpen ? <IoMdArrowDropdownCircle className='font-2xl' /> : <IoMdArrowDropupCircle className='font-2xl' />}
				</button>
			</div>
			{ isOpen && items }
			<div className='bg-blue-500 rounded-b-md text-white flex justify-between'>
				<span className="mx-3 my-2">Total: &#8377;{totalPrice}</span>
				{
					selectedDishes.length !== 0 &&
					<button className="p-3 bg-green-600 rounded-b-md">
						<FaArrowRight />
					</button>
				}
			</div>
		</div>
	);
}

export default Cart;