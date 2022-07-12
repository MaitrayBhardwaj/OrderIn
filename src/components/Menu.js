import { useState, useEffect } from 'react'
import { getDocs, collection, query } from 'firebase/firestore'

import { db } from '../firebase'
import { DishesContext } from '../context/DishesContext'

import Dish from './Dish'
import Cart from './Cart'
import Submit from './Submit'

const categories = [
	'All', 'Indian', 'Appetizers', 'Chinese', 'Italian',
	'Desserts', 'Beverages', 'Sandwiches & Snacks', 'Soups and Salads'
]

function Menu () {
	const [allDishes, setAllDishes] = useState([])
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [selectedDishes, setSelectedDishes] = useState([])
	const [category, setCategory] = useState('All')

	useEffect(() => {
		const dishes = []
		getDocs(query(collection(db, "dishes")))
			.then(queries => {
				queries.forEach(doc => {
					dishes.push({ ...doc.data().dish, _id: doc.id })
				})
				setAllDishes(dishes)
			})
	}, [])

	const addDish = (_id) => {
		setSelectedDishes(prevDishes => {
				const dishes = [...prevDishes]
				for(let dish of dishes){
					if(dish[0]._id === _id) {
						dish.qty = dish.qty + 1
						return dishes
					}
				}
				dishes.push({ ...allDishes.filter(dish => _id === dish._id), qty: 1 })
				return dishes
			})
	}

	const removeDish = (_id) => {
		setSelectedDishes(prevDishes => {
			const dishes = [...prevDishes]
			let idxToRemove = null
			for(let i = 0; i < dishes.length; i++){
				if(dishes[i][0]._id === _id) {
					if(dishes[i].qty === 1) {
						idxToRemove = i 
					}
					else{
						dishes[i].qty = dishes[i].qty - 1
						return dishes
					}
				}
			}
			dishes.splice(idxToRemove, 1)
			return dishes
		})
	}

	const categoryElements = categories.map(cat => (
		<button 
			key={cat}
			className="bg-blue-100 hover:bg-blue-200 text-blue-600 m-1 px-4 py-1 rounded-2xl" 
			onClick={() => setCategory(cat)}>{ cat }</button>
	))

	const dishElements = allDishes.map(dish => (
		dish.category === category || category === 'All' ? <Dish dish={dish} key={dish._id} addDish={() => addDish(dish._id)} /> : ''
	))

	return (
		<DishesContext.Provider value={ { selectedDishes, setHasSubmitted, setSelectedDishes, setCategory, removeDish } } >
			<div className="bg-white mx-5 mt-4 mb-32 rounded-lg">
				<div className="text-4xl border-b mx-auto w-5/6 text-center my-2" style={{ fontFamily: "Cookie, cursive"}}>Menu</div>
				<div className="flex flex-wrap justify-center mx-1">
					{ categoryElements }
				</div>
				<div className="flex m-5 flex-wrap items-center justify-center"> 
					{ dishElements }
				</div>
				<Cart />
			</div>
			{ hasSubmitted && <Submit /> }
		</DishesContext.Provider>
	);
}

export default Menu;