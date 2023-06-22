import React, { createContext, useState, useEffect } from 'react'
import {
	collection,
	getDocs,
	onSnapshot,
	collectionGroup,
	CollectionReference,
	QuerySnapshot,
} from 'firebase/firestore'
import { getDatabase, ref, get } from 'firebase/database'
import { objectToArrayWithId } from '../helpers/ObjectToArrayWithId'
import { db } from '../config/firebaseConfig'
import { Restaurant, Review, Category, CategoryData, DetailsRestaurantProps } from '../types/types'


export const RestaurantsContext = createContext<{
	restaurants: DetailsRestaurantProps[]
	categories: CategoryData
	loading: boolean
}>({
	restaurants: [],
	categories: [],
	loading: true,
})

export const RestaurantsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [restaurants, setRestaurants] = useState<DetailsRestaurantProps[]>([])
	const [categories, setCategories] = useState<CategoryData>([])
	const [loading, setLoading] = useState<boolean>(true)

	const getRestaurantData = async (): Promise<void> => {
		try {
			const db = getDatabase()
			const restaurantsRef = ref(db, 'Restaurants')
			const snapshot = await get(restaurantsRef)

			if (snapshot.exists()) {
				const data: Restaurant[] = snapshot.val() as Restaurant[]

				const newRestaurants: DetailsRestaurantProps[] = await Promise.all(
					objectToArrayWithId(data).map(async (restaurant: object) => {
						const restaurantId: string = (restaurant as { id: string }).id
						const averageRating = await calculateAverageRating(restaurantId)
						const ratingLength = await getRatingLength(restaurantId)
						const reviews = await getReviews(restaurantId)
						const pathname = `/restaurants/${restaurantId}`
						return {
							...(restaurant as Restaurant),
							id: restaurantId,
							averageRating: Number(averageRating.toFixed(2)),
							ratingLength,
							reviews,
							pathname,
						}
					})
				)

				setRestaurants(newRestaurants)
			} else {
				setRestaurants([])
			}
		} catch (error) {
			console.error('Wystąpił błąd podczas pobierania danych:', error)
		} finally {
			setLoading(false)
		}
	}

	const getCategoriesData = async (): Promise<void> => {
		try {
			const categorySnapshot: QuerySnapshot<object> = await getDocs(collection(db, 'CategoriesData'))
			const categories: CategoryData = []

			categorySnapshot.forEach(category => {
				const categoryData: Category = category.data() as Category
				categories.push(categoryData)
				console.log(categoryData)
			})

			categories.sort((a, b) => a.key - b.key)
			setCategories(categories)
		} catch (error) {
			console.log(error)
		}
	}

	const getRatingLength = async (restaurantId: string): Promise<number> => {
		const reviewsRef: CollectionReference = collection(db, 'Restaurants', restaurantId, 'Reviews')
		const snapshot: QuerySnapshot = await getDocs(reviewsRef)

		return snapshot.size
	}

	const calculateAverageRating = async (restaurantId: string): Promise<number> => {
		const reviewsRef: CollectionReference = collection(db, 'Restaurants', restaurantId, 'Reviews')
		const snapshot: QuerySnapshot = await getDocs(reviewsRef)
		const allRatings: number[] = []

		snapshot.forEach(doc => {
			const reviewData = doc.data()
			allRatings.push(reviewData.value)
		})

		if (allRatings.length <= 0) {
			return 0
		} else {
			const ratings: number[] = allRatings.map(rating => rating)
			const sum: number = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
			const average: number = sum / ratings.length
			return average
		}
	}

	const getReviews = async (restaurantId: string): Promise<Review[]> => {
		try {
			const reviewsRef = collection(db, 'Restaurants', restaurantId, 'Reviews')
			const snapshot = await getDocs(reviewsRef)
			const reviewsData = snapshot.docs.map(doc => doc.data() as Review)

			return reviewsData
		} catch (err) {
			console.log(err)
			return []
		}
	}

	const handleReviewChange = () => {
		const reviewsCollections = collectionGroup(db, 'Reviews')
		const unsubscribe = onSnapshot(reviewsCollections, () => {
			getRestaurantData()
			console.log('dane zostaly zaktuzliwaone')
		})

		return unsubscribe
	}

	useEffect(() => {
		const unsubscribe = handleReviewChange()
		return () => {
			unsubscribe()
		}
	}, [])

	useEffect(() => {
		getRestaurantData()
		getCategoriesData()
	}, [])

	return (
		<RestaurantsContext.Provider value={{ restaurants, categories, loading }}>{children}</RestaurantsContext.Provider>
	)
}
