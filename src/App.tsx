import { useCallback, useEffect } from "react";
import { getPaintings } from "./store/actions/getPaintings";
import { useAppDispatch } from "./store/hooks";
import './App.css'
import { getLocations } from "./store/actions/getLocations";
import { getAuthors } from "./store/actions/getAuthors";
import AppHeader from "./components/Header/AppHeader";
import Filters from "./components/Filters/Filters";
import Items from "./components/Items/Items";
import Paginator from "./components/Paginator/Paginator";
import { useDarkMode } from "./hooks/themeToggler/ThemeToggler";





function App() {
  const dispatch = useAppDispatch()


  const initApp = useCallback(() => {
    dispatch(getPaintings({})) //убрать объект пропсов
    dispatch(getLocations())
    dispatch(getAuthors())
  } , [dispatch]) 


  const [theme, themeToggler] = useDarkMode()
  let isDarkTheme =  theme === "dark" ? true : false

  useEffect(() => {
    initApp()
  }, [initApp])


  return (
    <div className={`wrapper ${isDarkTheme && 'wrapper__dark'}`}>
      <div className="container">
        <AppHeader theme={theme} themeToggler={themeToggler}/>
        <Filters isDarkTheme={isDarkTheme}/>
        <Items />
        <Paginator theme={isDarkTheme}/>
      </div>
    </div>
  )
}


export default App;
