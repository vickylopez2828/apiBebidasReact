import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Notification from '../components/Notification'
import { useAppStore } from '../stores/useAppStore'
import { useEffect } from 'react'

export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage)
  useEffect(()=>{
    loadFromStorage()
  },[])
  return (
    <>
      <Header/>
      <main className="container mx-auto">
        <Outlet/>
      </main>
      <Modal/>
      <Notification/>
    </>
  )
}
