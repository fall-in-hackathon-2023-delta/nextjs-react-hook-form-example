import Body from "@/components/layout/Body";
import Header from "@/components/layout/Header";
import Page from "@/components/layout/Page";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
  return (
    <Page>
        <Header />
        <Body>
            <div className="flex flex-col gap-10">
                <h1 className="text-3xl">Voyageur</h1>
                <button className="p-4 rounded-md hover:cursor-pointer bg-blue-300" onClick={() => {
                    router.push("/events")
                }}>Go to Events</button>
            </div>
        </Body>
    </Page>
  )
}