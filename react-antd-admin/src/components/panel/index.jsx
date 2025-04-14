import React from 'react'
export default function index(props) {
  return (
    <div style={{padding: '10px'}}>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  )
}
