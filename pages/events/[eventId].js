// new import fetched from api-utils from backend
import { getAllEvents, getEventById, getFeaturedEvents } from '../../helpers/api-util'

// import to optimize screen crawlers and SEO
import Head from 'next/head'

import EventSummary from "../../components/event-detail/event-summary"
import EventLogistics from "../../components/event-detail/event-logistics"
import EventContent from "../../components/event-detail/event-content"

// event details data is coming from our getStaticProps() function that fetches the correct eventId from our backend using context params
function EventDetailPage(props) {
    // useRouter hook no longer needed since data is now being proped in by getStaticProps() function
    const event = props.singleEvent

    const headData = (
        <Head>
            {/* ABLE TO INJECT DYNAMIC CONTENT INTO HEAD FOR EACH EVENT */}
            {/* dynamic values here */}
            <title>{event.title}</title>
            <meta name='description' content={event.description} />
        </Head>
    )

    if(!event) return <p>No event found</p>

    return (
        <>
            {/* makes head data reusable */}
            {headData}

            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    )
}


// eventDetail page is a page you want accessible to search crawelers. This page will be pre-generated will SSG and not SSR
export async function getStaticProps(context) {
    const eventId = context.params.eventId
    const eventDetails = await getEventById(eventId)

    return {
        props: {
            singleEvent: eventDetails
        },
        revalidate: 30
        // if a new request comes in and its been more than 30 seconds since this page has last been updated, it will be generated again to update the data
        // the time is more sensitive since changing of an event's details could occur frequently
    }
}

// tell next.js which eventId's you want pre-rendered with the getStaticPaths() functions
export async function getStaticPaths(context) {

    // we want all event pages to be pre-rendered, so we run getAllEvents() and extract their id's so we can map them in the return paths object
    // if this were a real application, consider only fetching the FEATURED EVENTS, and include those in the paths to optimize performance times, have non-feautured sites
    // load on-the-fly in your fallback key (fallback = true)
    const events = await getAllEvents()
    const paths = events.map( (event) => ( {params: {eventId: event.id}} ) )

    return {
        paths: paths,
        // if all paths were not included, set fallback to true (in this case, paths included in path key are priority, and other paths will be pre-generated on the fly)
        // if all paths WERE included (like how we did here), set fallback to false (will load 404 page if going to a path not included in the paths key)
        fallback: false
    }
}

export default EventDetailPage




// IF YOU ONLY WANT FEATURED EVENTS PRE-GENERATED WITH STATIC PATHS, THIS IS WHAT IT WOULD LOOK LIKE

// function EventDetailPage(props) {
//     const event = props.singleEvent

//     if(!event) return <p className='center'>...Loading</p>                 <----- IF NON-FEATURED EVENT, THIS MIGHT SHOW UP CAUSE IT WILL TAKE LONGER TO FETCH

//     return (
//         <>
//             <EventSummary title={event.title} />
//             <EventLogistics
//                 date={event.date}
//                 address={event.location}
//                 image={event.image}
//                 imageAlt={event.title}
//             />
//             <EventContent>
//                 <p>{event.description}</p>
//             </EventContent>
//         </>
//     )
// }

// export async function getStaticPaths(context) {
//     const events = await getFeaturedEvents()                                       <---- GRAB FEATURED EVENTS ONLY
//     const paths = events.map( (event) => ( {params: {eventId: event.id}} ) )

//     return {
//         paths: paths,
//         fallback: true                                      <-------------- FALLBACK = TRUE
//     }
// }
