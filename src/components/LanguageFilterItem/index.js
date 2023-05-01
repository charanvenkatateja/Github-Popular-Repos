// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, isActive, selectActiveLanguageFilter} = props
  const {id, language} = details
  const className = isActive ? 'act-button' : 'button'

  const onClickLanguageButton = () => {
    selectActiveLanguageFilter(id)
  }

  return (
    <li className="line">
      <button
        className={className}
        type="button"
        onClick={onClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
