// new import fetched from api-utils from backend
import { getAllEvents, getEventById } from '../../helpers/api-util'

import EventSummary from "../../components/event-detail/event-summary"
import EventLogistics from "../../components/event-detail/event-logistics"
import EventContent from "../../components/event-detail/event-content"

// event details data is coming from our getStaticProps() function that fetches the correct eventId from our backend using context params
function EventDetailPage(props) {
    // useRouter hook no longer needed since data is now being proped in by getStaticProps() function
    const event = props.singleEvent

    if(!event) return <p>No event found</p>

    return (
        <>
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
        }
    }
}

// tell next.js which eventId's you want pre-rendered with the getStaticPaths() functions
export async function getStaticPaths(context) { // remember that context here allows us access the the req object

    // we want all event pages to be pre-rendered, so we run getAllEvents() and extract their id's so we can map them in the return paths object
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
