// new import coming from our backend api
import { getAllEvents } from '../../helpers/api-util'

import { useRouter } from 'next/router'
import EventList from "../../components/events/event-list"
import EventsSearch from "../../components/events/events-search"

// the getStaticProps function will prop in all the event data into this function to display all events
function AllEventsPage(props) {
    // destructure the events out of props object
    const { events } = props
    // router hook used for navigation... same as a history.push()
    const router = useRouter()

    // this function is called when a user submits the event search form (reference onSubmit function in event search component)
    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events} />
        </div>
    )
}


export async function getStaticProps(context) {
    const allEvents = await getAllEvents()

    return {
        props: {
            events: allEvents
        },
        revalidate: 60
        // if a minute has passed and a new request came in, regenerate this page to get the latest data
    }
}



export default AllEventsPage
