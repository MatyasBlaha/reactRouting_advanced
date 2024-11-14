import EventsList from '../components/EventsList';
import { Suspense } from "react";
import {useLoaderData, json, defer, Await} from "react-router-dom";

function EventsPage() {
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents}/>}
            </Await>
        </Suspense>
    )

}

export default EventsPage;

async function loadEvents(){
    // get cookies...
    // get localstorage...
    // CAN'T USE STATE!
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return {isError: true, message: 'Could not get events'}
        // throw new Response(JSON.stringify({message: 'Could not get events'}), {status: 500})
        throw json({message: 'Could not get events'}, {status: 500})
    } else {
        const resData = await response.json()
        return resData.events;
    }
}

export function loader() {
    return defer({
        events: loadEvents()
    })
}