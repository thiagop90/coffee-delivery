'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Coffee, coffeeData } from '@/data/coffees'
import { CoffeeType } from '@/@types/CoffeeType'
import { produce } from 'immer'
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/localstorage/localStorage'

type CoffeeContextType = {
  loading: boolean
  dataLoaded: boolean
  clearList: () => void
  selectedTag: CoffeeType | null
  coffeeTypes: CoffeeType[]
  filteredCoffees: Coffee[]
  handleChangeFilter: (tag: CoffeeType | null) => void
  coffees: Coffee[]
  favoriteCoffees: Coffee[]
  toggleFavoriteCoffee: (coffee: Coffee) => void
  quantityFavorites: number
}

const CoffeeContext = createContext({} as CoffeeContextType)

type CoffeeProviderProsp = {
  children: ReactNode
}

export function CoffeeProvider({ children }: CoffeeProviderProsp) {
  const [selectedTag, setSelectedTag] = useState<CoffeeType | null>(null)
  const [filteredCoffees, setFilteredCoffees] = useState(coffeeData)
  const [loading, setLoading] = useState(false)

  const [coffeeTypes, setCoffeeTypes] = useState<CoffeeType[]>([
    'alcoólico',
    'com leite',
    'especial',
    'gelado',
    'tradicional',
  ])

  const handleChangeFilter = async (tag: CoffeeType | null) => {
    setSelectedTag(tag)
    setLoading(true)

    if (tag) {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const filtered = coffeeData.filter((coffee) => coffee.tags.includes(tag))
      setFilteredCoffees(filtered)

      const updatedCoffeeTypes = [...coffeeTypes]
      const index = updatedCoffeeTypes.indexOf(tag)
      if (index !== -1) {
        updatedCoffeeTypes.splice(index, 1)
        updatedCoffeeTypes.unshift(tag)
      }
      setCoffeeTypes(updatedCoffeeTypes)
    } else {
      setFilteredCoffees(coffeeData)
    }

    setLoading(false)
  }

  const coffees = useMemo(
    () => (selectedTag ? filteredCoffees : coffeeData),
    [selectedTag, filteredCoffees],
  )

  const [favoriteCoffees, setFavoriteCoffees] = useState<Coffee[]>([])
  const quantityFavorites = favoriteCoffees.length
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const favoriteCoffees = getLocalStorageItem('favoriteCoffees')
    if (favoriteCoffees) {
      setFavoriteCoffees(favoriteCoffees)
      setDataLoaded(true)
    }
  }, [])

  const clearList = () => {
    setFavoriteCoffees([])
    localStorage.removeItem('favoriteCoffees')
  }

  useEffect(() => {
    setLocalStorageItem('favoriteCoffees', favoriteCoffees)
  }, [favoriteCoffees])

  const toggleFavoriteCoffee = (coffee: Coffee) => {
    setFavoriteCoffees((prevFavoriteCoffees) => {
      const favoriteIndex = prevFavoriteCoffees.findIndex(
        (favCoffee) => favCoffee.id === coffee.id,
      )
      const updatedFavoriteCoffees = produce(prevFavoriteCoffees, (draft) => {
        if (favoriteIndex !== -1) {
          draft.splice(favoriteIndex, 1)
        } else {
          draft.push(coffee)
        }
      })
      return updatedFavoriteCoffees
    })
  }

  const contextValue: CoffeeContextType = {
    dataLoaded,
    selectedTag,
    coffeeTypes,
    handleChangeFilter,
    filteredCoffees,
    coffees,
    clearList,
    favoriteCoffees,
    loading,
    toggleFavoriteCoffee,
    quantityFavorites,
  }

  return (
    <CoffeeContext.Provider value={contextValue}>
      {children}
    </CoffeeContext.Provider>
  )
}

export const useCoffee = () => useContext(CoffeeContext)
