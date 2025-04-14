import React from 'react'
// import { Navigate } from 'react-router-dom'
import ImgUrl from '../assets/welcome.gif'

export default function Home() {
  return (
    <img src={ImgUrl} style={{ width: '100%', height: '100%' }} />
  )
}
