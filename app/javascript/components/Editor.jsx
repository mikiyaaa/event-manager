import React, { useState, useEffect } from 'react';
import Header from './Header';
import EventList from './EventList';
import { Routes, Route } from 'react-router-dom';

function Editor() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await window.fetch('/api/events');
                if (!response) throw Error(response.statusText);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setIsError(true);
                console.log(error);
            }
            // fetchが完了したらisLoadingをfalse
            setIsLoading(false);
        };

        fetchData();
    }, []);
    
    return (
        <>c
            <Header />
            {isError && <p>Something went wrong. Check the console.</p>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <EventList events={events} />

                    <Routes>
                        <Route path=":id" element={<Event events={events} />} />
                    </Routes>
                </>
            )}
        </>
    )
}

export default Editor;