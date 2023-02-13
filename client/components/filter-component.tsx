import React, { EventHandler } from "react";

export default function FilterTodos (props: { filter: any}) {
  const { filter } = props
  return (
    <div>
      <h6 className="inline-block">
        Filter Results
      </h6>
      <button className="btn-link" id="complete" onClick={() => filter("complete")}>
        Complete
      </button>
      <button className="btn-link" id="incomplete" onClick={() => filter("incomplete")}>
        Incomplete
      </button>
    </div>

  )
}
