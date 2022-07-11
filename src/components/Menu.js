import { useState, useEffect } from 'react'
import { getDocs, collection, query } from 'firebase/firestore'

import { db } from '../firebase'
import { DishesContext } from '../context/DishesContext'

import Dish from './Dish'
import Cart from './Cart'

function Menu () {
	const [allDishes, setAllDishes] = useState([])
	const [selectedDishes, setSelectedDishes] = useState([])

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

	const dishElements = allDishes.map(dish => (
		<Dish dish={dish} key={dish._id} addDish={() => addDish(dish._id)} />
	))

	return (
		<DishesContext.Provider value={ { selectedDishes, removeDish } } >
			<div className="bg-white mx-5 my-4 rounded-lg">
				<div className="text-4xl border-b mx-auto w-5/6 text-center my-2" style={{ fontFamily: "Cookie, cursive"}}>Menu</div>
				<div className="flex m-5 flex-wrap items-center justify-center"> 
					{ dishElements }
				</div>
				<Cart />
			</div>
		</DishesContext.Provider>
	);
}

export default Menu;