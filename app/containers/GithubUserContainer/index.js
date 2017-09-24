/*
 *
 * GithubUserContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withState } from 'recompose';

import makeSelectGithubUserContainer from './selectors';
import * as actions from './actions';

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) => <div className="mdl-grid">
  <input className="mdl-cell mdl-cell--4-col mdl-textfield__input" type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
<button className="mdl-cell mdl-cell--2-col mdl-button mdl-button--raised mdl-button--primary" onClick={() => loadUser(searchText)}>Search</button>
</div>

const CommitsList = ({loadCommits}) => <div>

</div>

const SearchComponent = withState('searchText', 'setSearchText', 'giko')(SearchComponentStateless);

export class GithubUserContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="mdl-cell mdl-cell--6-col" >
          <SearchComponent loadUser={this.props.loadUser} />
        <div className="mdl-grid">
          <ul className="mdl-list mdl-cell mdl-cell--6-col">
            { this.props.githubUserContainer.userRepos &&
              this.props.githubUserContainer.userRepos.map((repo) => {
                return <li  className="mdl-list__item" key={repo.id}
                            onClick={() => this.props.loadCommits(repo.full_name)}>
                            {repo.name}
                       </li>
              })}
          </ul>
          <ol className="mdl-cell mdl-cell--6-col">
            { this.props.githubUserContainer.userCommits &&
              this.props.githubUserContainer.userCommits.map((commit, index) => {
                return <li key={index}>
                  <a href={commit.html_url}
                    target="_blank">
                    {commit.sha}
                  </a>
                </li>
              })}
          </ol>
        </div>
        </div>
      </div>
    );
  }
}

GithubUserContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  githubUserContainer: makeSelectGithubUserContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUser: (userName) => {
      if (userName.search(/[А-яЁё]/) === -1 ) {
        dispatch(actions.loadUser(userName))
      } else {
        alert('Допускаются только англиские буквы')
      }
    },
    loadCommits: (repoName) => dispatch(actions.loadCommits(repoName))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserContainer);
