export interface Restaurant {
	category: string
	delivery_price: number
	delivery_time: string
	description: string
	free_ship: number
	minimumOrderValue: number
	name: string
	photo: {
		alt: string
		url: string
	}
	products: Record<string, Product[]>
}

export interface Review {
	comment: string
	restaurantId: string
	restaurantName: string
	restaurantPhoto: {
		alt: string
		url: string
	}
	reviewId: string
	timestamp: {
		seconds: number
		nanoseconds: number
	}
	userData: {
		localId: string
		name: string
		photoUrl: string
	}
	value: number
}

export interface NewRestaurant extends Restaurant {
	id: string
	averageRating: number
	ratingLength: number
	reviews: Review[]
}

export interface Category {
	icon: string
	key: number
	name: string
	photo: string
	value: string
}

export type CategoryData = Category[]

export interface Product {
	name: string
	price: number
	photo: string
	amount: number
	description: string
}
export interface DiscountCode {
	code: string
	discountValue: number
}
export interface CurrentRestaurant {
	name: string
	delivery_time: string
	pathname: string
	delivery_price: number
	free_ship: number
	id: string
}

export interface UserData {
	email: string | null
	localId: string
	name: string | null
	photoUrl: string | null
	creationTime: string | undefined
}

export interface AuthContextProps {
	isAuthenticated: boolean
	login: (user: UserData) => void
	logout: () => void
	userData: UserData
	updatePhotoUrl: (photoUrl: string) => void
	updateDisplayName: (displayName: string) => void
	deleteAccount: () => void
}
export interface TitleWithSubtitleProps {
	title: string
	subtitle: string
}
export interface FullWidthContainer {
	photo: string | null
	children: React.ReactNode
	rest?: Record<string, any>
}
export interface SidebarProps {
	setShowSidebar: (show: boolean) => void
	showSidebar: boolean
}
export interface NavbarDesktopProps {
	setShowPrompts: (show: boolean) => void
	showPrompts: boolean
}
export interface SinglePromptProps {
	id: string
	photo: string
	name: string
	category: string
	handleClose: () => void
}
export interface PromptsProps {
	term: string
	handleClose: () => void
	searchHandler: () => void
}
export interface SearchPanelProps {
	setShowModal: (show: boolean) => void
	showModal: boolean
}
export interface SingleCategoryProps {
	category: Category
	index: number
}
export interface Promocode {
	value: number
	backgroundColor: string
	color: string
	btnColor: string
	btnColorHover: string
	fontColor: string
	description: string
	photo: string
	code: string
}
export interface LastVisitedRestaurantType extends NewRestaurant {
	pathname: string
}
export interface EmptyRestaurantsProps {
	query: string
}
export interface CategoryFilterProps {
	setUpCategory: (category: string) => void
}
export interface SearchValuesType {
	rating: number | null
	minOrder: number
	freeDelivery: boolean
	deliveryMaxCost: number | number[]
	sortBy: string
}

export interface FilterContainerProps {
	handleClose?: () => void
}
export interface FilterMobileProps {
	query: string
	restaurantsLenght: number
	filterCount: number
}
export interface AdditionalSettingsProps {
	setSearchValues: React.Dispatch<React.SetStateAction<SearchValuesType>>
	freeDelivery: boolean
}

export interface RatingFormProps {
	setSearchValues: React.Dispatch<React.SetStateAction<SearchValuesType>>
	rating: number | null
}
export interface DeliveryMaxCostProps {
	setSearchValues: React.Dispatch<React.SetStateAction<SearchValuesType>>
	deliveryMaxCost: number | number[]
}
export interface FreeDeliveryFormProps {
	setSearchValues: React.Dispatch<React.SetStateAction<SearchValuesType>>
	freeDelivery: boolean
}
export interface MinimumOrderValueFormProps {
	setSearchValues: React.Dispatch<React.SetStateAction<SearchValuesType>>
	minOrder: number | null
}
export interface RestaurantSorterProps {
	setSearchValues: React.Dispatch<React.SetStateAction<SearchValuesType>>
	sortBy: string | null
}
export interface FavoriteButtonProps {
	name: string
	photo: { url: string; alt: string }
	category: string
	id: string
}
export interface RateRestaurantProps {
	restaurantPhoto: {
		alt: string
		url: string
	}
	id: string | undefined
	restaurantName: string
}

export interface PopupDataProps {
	show: boolean
	product: Product | null
	restaurant: CurrentRestaurant
}
export interface DetailsRestaurantProps {
	averageRating: number
	category: string
	delivery_price: number
	delivery_time: string
	description: string
	free_ship: number
	id: string
	pathname: string
	minimumOrderValue: number
	name: string
	photo: {
		alt: string
		url: string
	}
	products: Record<string, Product[]>
	ratingLength: number
	reviews: Review[] //
}
export interface SetUpPopupInterface {
	show: boolean
	product: Product | null
	restaurant: CurrentRestaurant
}
export interface WarningPopupProps extends SetUpPopupInterface {
	setUpPopup(show: boolean, product: Product | null, restaurant: CurrentRestaurant | null): void
}
export interface CartItemProps {
	product: Product
}
export interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

export interface RestaurantTabsProps {
	categories: string[]

	id: string
	setUpPopup(show: boolean, product: Product | null, restaurant: CurrentRestaurant | null): void

	products: Record<string, Product[]>
	restaurant: DetailsRestaurantProps
}
export interface RatingsCountProps {
	[key: number]: {
		amount: number
	}
}
export interface ReviewsComponentProps {
	averageRating: number
	id: string
}
export interface SingleReviewProps {
	timestamp: {
		seconds: number
		nanoseconds: number
	}
	index: number
	userData: {
		name: string
	}
	value: number
	comment: string
}
export interface ReviewsSummaryProps {
	averageRating: number
	reviewsLength: number
	ratingsCount: RatingsCountProps
}
export interface MenuItemProps {
	index: number
	product: Product
	restaurant: DetailsRestaurantProps
	setUpPopup(show: boolean, product: Product | null, restaurant: CurrentRestaurant | null): void
}
export interface RestaurantInformationProps {
	name: string
	description: string
	minimumOrderValue: number
	delivery_time: string
	delivery_price: number
	free_ship: number
}
export interface MenuComponentProps {
	categories: string[]
	products: Record<string, Product[]>
	restaurant: DetailsRestaurantProps
	setUpPopup(show: boolean, product: Product | null, restaurant: CurrentRestaurant | null): void
}
export interface TitlePageProps {
	title: string
	description: string
}
export interface SingleListitemProps {
	primaryText: string
	number: number
}
export interface MembershipDateProps {
	data: string
}
export interface FavoriteRestaurantProps {
	category: string
	name: string
	photo: {
		alt: string
		url: string
	}
	restaurantId: string
	userLocalId: string
}
export interface EditSingleReviewProps {
	value: number
	comment: string
	reviewId: string
	restaurantId: string
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
	handleClose: () => void
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>
	reviews: Review[]
}
export interface SingleUserReviewProps {
	comment: string
	restaurantId: string
	restaurantName: string
	restaurantPhoto: {
		alt: string
		url: string
	}
	reviewId: string
	timestamp: {
		seconds: number
		nanoseconds: number
	}
	userData: {
		localId: string
		name: string
		photoUrl: string
	}
	value: number
	index: number
	reviews: Review[]
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>
}
export interface UserReviewsProps {
	reviews: Review[]
	loading: boolean
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>
}
export interface UserDashboardProps {
	reviews: Review[]
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>
	loadingReviews: boolean
	loadingFavourites: boolean
	favRestaurants: FavoriteRestaurantProps[]
	setFavRestaurants: React.Dispatch<React.SetStateAction<FavoriteRestaurantProps[]>>
}
export interface UserFavouriteRestaurantsProps {
	loading: boolean
	favRestaurants: FavoriteRestaurantProps[]
	setFavRestaurants: React.Dispatch<React.SetStateAction<FavoriteRestaurantProps[]>>
}
export interface SingleFavouriteRestaurantProps {
	restaurantId: string
	photo: {
		alt: string
		url: string
	}
	name: string
	category: string
	index: number
	id: string
	favRestaurants: FavoriteRestaurantProps[]
	setFavRestaurants: React.Dispatch<React.SetStateAction<FavoriteRestaurantProps[]>>
}
export interface GoogleButtonProps {
	loading: boolean
	text: string
	onClick: () => void
}
