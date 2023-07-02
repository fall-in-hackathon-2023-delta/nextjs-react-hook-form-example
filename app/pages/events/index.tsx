
import Header from "@/components/layout/Header";
import Page from "@/components/layout/Page";
import Event from "@/features/events/components/Event";
import Body from "@/components/layout/Body";
export default function EventPage() {
  return (
    <Page>
      <Header />
      <Body>
        <Event.Form />
      </Body>
    </Page>
  );
}
