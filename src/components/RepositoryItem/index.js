// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {productDetails} = props
  const {name, starsCount, forksCount, issuesCount, avatarUrl} = productDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} className="repository-image" alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stats-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
