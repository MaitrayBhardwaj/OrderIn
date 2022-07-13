import { motion, AnimatePresence } from 'framer-motion'

function Backdrop (props) {
	return (
		<AnimatePresence>
			<motion.div
				className="fixed z-30 top-0 left-0 h-full w-full bg-black bg-opacity-70 flex justify-center items-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={props.onClick}
			>
				{ props.children }
			</motion.div>
		</AnimatePresence>
	)
}

export default Backdrop