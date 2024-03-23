import React from 'react'
import { itemService } from '../services/item.service'
import { useLoading } from '../hooks/useLoading'
import Loading from '../components/Loading/Loading'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { useEntity } from 'simpler-state'
import { theme } from '../store/theme.store'


function Home() {
  const { isLoading, toggleLoading } = useLoading()
  const currTheme = useEntity(theme)
  useEffectUpdate(loadItems, [])

  async function loadItems() {
    try {
      await itemService.makeData()
    } catch (error) {
      console.error("Unable to make data:", error)
    } finally {
      toggleLoading()
    }
  }

   return (<Loading />)
  return (
    <section className={"home " + currTheme}>
      <h1>Welcome to the Star Wars Universe</h1>
    </section>
  )
}

export default Home
