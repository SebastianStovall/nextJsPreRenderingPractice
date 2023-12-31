// THIS IMPORT IS FOR ADDING METADATA TO YOUR PAGES THAT ARE GREAT FOR SCREEN CRAWLERS READING YOUR WEB PAGES
import Head from 'next/head'

// new import using data from an actual backend
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

// this component props in data received from the backend so it can be displayed with the EventList component
// the content for the events is now rendered with the HTML page -----> https://i.gyazo.com/bd13cd145bd4b66283ad0c3cc45b9cca.png
function HomePage(props) {
  const events = props.events

  return (
    <div>
        {/* we can use the head tag to set a title and description of the page (the title of this page will be shown on the browser tab) */}
        {/* your able to add any tag here that would normally show up in the <head></head> on a HTML page */}
        <Head>
          <title>NextJS Events</title>
          <meta name='description' content='Find a lot of great events all in one place!' />
        </Head>

        <h1 style={{textAlign: "center"}}>Featured Events</h1>
        <EventList items={events} />
    </div>
  )
}


// use Static Generation for Home Page. Opt for static generation over SSR because content is not that dyanamic.
// Definetly want a pre-rendered page for the home page for search crawlers

// fetch the data from the firebase database so it can be pre-rendered
export async function getStaticProps(context) {

  // this helper function can be located in the helpers folder under apiutil.js
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
    // every half hour we regenerate this page for a new incoming request (here so we dont need to redeploy our site each time we want the latest data in the home page)
    // every half hour is a good time since the home page will not change that often
  }

}

export default HomePage;
