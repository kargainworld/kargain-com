import { useRouter } from 'next/router'

export default function redirectTo (destination) {
    const router = useRouter()
    router.push(destination)
}
