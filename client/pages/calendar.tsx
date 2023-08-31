import React, { useState } from "react"
import Container from "react-bootstrap/Container";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Container>
        <h1 className="text-center my-4">Calendar</h1>
        <Calendar onChange={onChange} value={value} className="calendar-styles p-4"/>
    </Container >

  )

}
