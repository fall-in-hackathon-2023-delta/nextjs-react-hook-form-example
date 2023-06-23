/// www.app.com/

import { useRouter } from "next/router"


export default function Home() {
const router = useRouter()

router.push('/events')

    return (
        <div></div>
    )
}