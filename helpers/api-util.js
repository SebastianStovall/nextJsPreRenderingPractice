// these functions are querying a dummy base made in Firebase for demonstration purposes


// home page functions
export async function getAllEvents() {
    const response = await fetch('https://nextjspractice-9a2f0-default-rtdb.firebaseio.com/events.json')
    const data = await response.json()

    const events = []
    for(const key in data) {
        events.push({
            id: key,
            ...data[key]
        })
    }
    return events
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
    return allEvents.filter((event) => event.isFeatured);
}




// eventDetails page functions
export async function getEventById(id) {
    const allEvents = await getAllEvents()
    return allEvents.find((event) => event.id === id);
}



// [...slug].js (filtered events) function
export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents()

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}
