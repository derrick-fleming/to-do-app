import React from "react"
import Container from "react-bootstrap/Container";
import Calendar from "react-calendar";

export default function CalendarComponent() {

  return (
    <Container>
        <h1 className="text-center my-4">Calendar</h1>
        <Calendar className="calendar-styles p-4"/>
    </Container >

  )

}
