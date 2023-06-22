import { useEffect } from 'react'

export default function useWebsiteTitle(title: string) {
	useEffect(() => {
		document.title = `${title} - Niedobre.pl`
	}, [title])
}