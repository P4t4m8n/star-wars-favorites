import React from 'react'
import { itemService } from '../services/item.service'
import { useLoading } from '../hooks/useLoading'
import Loading from '../components/Loading/Loading'
import { useEffectUpdate } from '../hooks/useEffectUpdate'


function Home() {
  const { isLoading, toggleLoading } = useLoading()
  useEffectUpdate(loadItems, [])

  async function loadItems() {
    try {
      await itemService.makeData()
    } catch (error) {
      console.error("Unable to make data:", error)
    } finally { toggleLoading() }
  }

  if (isLoading) return (<Loading />)
  return (
    <section className="home">
      <h1>Welcome to the Star Wars Universe</h1>
    </section>
  )
}

export default Home
