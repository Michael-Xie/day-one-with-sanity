import React from 'react'

const VenueView = ({document}) => {
  const {draft, published} = document
  const venue = draft || published
  return (
    <div style={{padding: '20px'}}>
      <h1>Venue View</h1>
      <p>{venue?.name || 'nothing to show'}</p>
    </div>
  )
}

export default VenueView
