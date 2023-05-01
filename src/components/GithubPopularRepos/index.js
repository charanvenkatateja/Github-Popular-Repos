import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    allItems: [],
    apiStatus: apiStatusConstants.initial,
    filterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const {filterId} = this.state
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${filterId}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const newData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({allItems: newData, apiStatus: apiStatusConstants.success})
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="FiveDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getProductItems = () => {
    const {allItems} = this.state
    return (
      <ul className="list-container-2">
        {allItems.map(eachItem => (
          <RepositoryItem productDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  getRender = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getProductItems()
      case apiStatusConstants.inprogress:
        return this.loader()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  selectActiveLanguageFilter = activeId => {
    this.setState({filterId: activeId}, this.getItems)
  }

  render() {
    const {filterId} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              details={each}
              id={each.id}
              selectActiveLanguageFilter={this.selectActiveLanguageFilter}
              isActive={each.id === filterId}
            />
          ))}
        </ul>
        {this.getRender()}
      </div>
    )
  }
}
export default GithubPopularRepos
