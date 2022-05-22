
// import { useAuthorFilter } from "../../hooks/useAuthorFilter"
// import { useCreatedBeforeFilter } from "../../hooks/useCreatedBeforeFilter"
// import { useCreatedFromFilter } from "../../hooks/useCreatedFromFilter"
// import { useLocationFilter } from "../../hooks/useLocationFilter"
// import { useNameFilter } from "../../hooks/useNameFilter"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getPaintings } from "../../store/actions/getPaintings";

import Input from "../ui/filters/Input"
import Range from "../ui/filters/Range"
import Select from "../ui/filters/Select"
import styles from './Filters.module.scss'
import React, { useCallback, useEffect, useState } from "react"
import { settingsSlice } from "../../store/slices/settingsSlice"

export interface FiltersProps {
  isDarkTheme: boolean
}
const Filters = ({ isDarkTheme }: FiltersProps) => {
  const {setAuthor, setCreatedBefore, setCreatedFrom, setLocation, setName} = settingsSlice.actions
  const { authors, locations,  } = useAppSelector(state => state.paintingsReducer)
  const { author, createdBefore, createdFrom, currentPage, location, name, pageSize } = useAppSelector(state => state.settingsReducer)

  const locationsArr = locations.map(e => ({ id: e.id, name: e.location }))

  // const [author, setAuthor] = useAuthorFilter()
  // const [location, setLocation] = useLocationFilter()
  // const [name, setName] = useNameFilter()
  // const [createdFrom, setCreatedFrom] = useCreatedFromFilter()
  // const [createdBefore, setCreatedBefore] = useCreatedBeforeFilter()


  const [isRangeClosed, setIsRangeClosed] = useState(true)

  const dispatch = useAppDispatch()

  const getData = useCallback(() => {
    if (isRangeClosed) {
      dispatch(getPaintings({
        q: name,
        authorId: author?.id,
        locationId: location?.id,
        created_gte: createdFrom !== '' ? createdFrom : null,
        created_lte: createdBefore !== '' ? createdBefore : null,
        _page: currentPage,
        _limit: pageSize
      })
      )
    }
  }, [dispatch, name, author, location, createdFrom, createdBefore, isRangeClosed, currentPage, pageSize])

  const onChangeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value !== name) {
      dispatch(setName(e.target.value))
    }
  }

  useEffect(() => {
    getData()
  }, [getData])



  return (
    <div className={styles.filters}  >

      <Input
        isDarkTheme={isDarkTheme}
        placeholder={'Name'}
        value={name}
        onChange={onChangeNameHandler}
      />

      <Select
        isDarkTheme={isDarkTheme}
        disabled={false}
        onChange={author => dispatch(setAuthor(author))}
        options={authors}
        value={author?.name}
        placeHolder='Author'
        onCrossClicked={() => dispatch(setAuthor(null))}
      />
      <Select
        isDarkTheme={isDarkTheme}
        disabled={false}
        onChange={location => dispatch(setLocation({id: location.id, location: location.name}))}
        options={locationsArr}
        value={location?.location}
        placeHolder='Location'
        onCrossClicked={() => dispatch(setLocation(null))}
      />

      <Range
        isDarkTheme={isDarkTheme}
        title='Created'
        onClose={() => setIsRangeClosed(true)}
        onOpen={() => setIsRangeClosed(false)}
      >
        <div className={styles.rangeParent} >
          <Input
            className={styles.rangeChildren}
            isDarkTheme={isDarkTheme}
            placeholder='from'
            value={createdFrom}
            onChange={e => dispatch(setCreatedFrom(e.target.value)) }
          />
          <div className={`${styles.rangeStick} ${isDarkTheme && styles.rangeStickDark}`}></div>
          <Input
            className={styles.rangeChildren}
            isDarkTheme={isDarkTheme}
            placeholder='before'
            value={createdBefore}
            onChange={e =>  dispatch(setCreatedBefore(e.target.value)) }
          />
        </div>
      </Range>

    </div>
  )
}

export default React.memo(Filters)