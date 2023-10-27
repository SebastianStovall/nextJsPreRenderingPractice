// new import for filtered events coming from the backend api
import { getFilteredEvents } from "../../helpers/api-util"

import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/events/results-title"

function FilteredEventsPage(props) {

    // this conditional will fire if an invalid filter logic fires in the getServerSideProps() function (see down below)
    if( props.hasError ) return <p>Invalid Filter</p>

    const filteredEvents = props.events
    if(!filteredEvents || filteredEvents.length === 0) return <p>No events found</p>

                        // these values found in return key on getServerSideProps()
    const date = new Date(props.date.year, props.date.month - 1)

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}


// use getServerSideprops in this case because its generating dynamic context that has an infinite amount of combinations... so we wont be able to concretely use
// getStaticPaths due to this. So instead, we should generate all of this content on the fly for each incoming request with the getServerSideprops() function. Then the
// data can get passed as a prop to the FilteredEventsPage component
export async function getServerSideProps(context) { // remember that context arg in the getServerSideProps() func can give us full access to the req object
    // params deconstruced from context, used to grab the year/month
    const { params } = context

    // grab year/month
    const filterData = params.slug // .slug since thats the catchall spread named in the file name
    const filteredYear = Number(filterData[0])
    const filteredMonth = Number(filterData[1])

    if( isNaN(filteredYear) ||
        isNaN(filteredMonth)||
        filteredYear > 2030 ||
        filteredYear < 2021 ||
        filteredMonth < 1   ||
        filteredMonth > 12
    ) return { hasError: true } // show the 404 page if an invalid filter has been passed in

    const filteredEvents = await getFilteredEvents({year: filteredYear, month: filteredMonth})

    return {
        props: {
            events: filteredEvents,
            // date key used on here to construct the date we need for the other components to use
            date: {year: filteredYear, month: filteredMonth}
        }
    }
}

export default FilteredEventsPage
