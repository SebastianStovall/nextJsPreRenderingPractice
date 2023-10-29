// basically next.js calculates the size needed for the client to render the images to save us space for our image sizes
// caches this data for future screen sizes so it knows what size images it needs
import Image from 'next/image'

import styles from './event-item.module.css' // need the styles classword (bananable) there when importing a css file if you want to locally scope styles with the same className's
import Button from './ui/button'

function EventItem(props) {
    const {title, image, date, location, id} = props
    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})
    const formattedAddress = location.replace(', ', '\n') // all the dates have ", "... we are replacing with a line break

    const exploreLink = `/events/${id}`

    return (
        // if we have another class css element named .item now, it will only used the locally scoped one in the event-item.module.css file
        <li className={styles.item}>
                {/*for width and height, need to determine about how many pixels the image takes up inside of its container (NOT THE ORIGINAL SIZE OF THE IMAGE)!!!  */}
                {/* test the width and height by playing around with it and using different screen sizes */}
            <Image src={'/' + image} alt={title} width={250} height={160} />
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={styles.address}>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button link={exploreLink}>Explore Event</Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem
