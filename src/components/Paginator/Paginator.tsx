
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { settingsSlice } from "../../store/slices/settingsSlice"
import Pagination from "../ui/Pagination"


export interface PaginatorProps {
  theme: boolean
}

const Paginator = ({ theme }: PaginatorProps) => {
  const { currentPage, pagesAmount } = useAppSelector(state => state.paintingsReducer)
  const dispatch = useAppDispatch()


  return (
    <div className="Paginator">
      <Pagination
        currentPage={Number(currentPage)}
        onChange={(page) => dispatch(settingsSlice.actions.setCurrentPage(page))}
        pagesAmount={Number(pagesAmount)}
        isDarkTheme={theme}
      />
    </div>
  )
}

export default Paginator