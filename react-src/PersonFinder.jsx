import React, { Component } from 'react';
import PropTypes from 'prop-types';

// inspired by https://www.w3schools.com/howto/howto_js_autocomplete.asp

function defaultPersonFinder(searchTerm, list) {
  if (searchTerm === '') return [];
  const matches = [];
  const re = new RegExp(searchTerm, 'i');
  list.forEach((person) => {
    if (re.test(person.fullName)) {
      matches.push({
        display: person.fullName,
        key: person.personId,
        item: person,
      });
    }
  });
  return matches;
}

class PersonFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      searchTerm: '',
      selectedKey: null,
      selectedIndex: -1,
    };
    this.textInput = React.createRef();
    this.finder = defaultPersonFinder;
    this.inputChange = this.inputChange.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.completeMatch = this.completeMatch.bind(this);
    this.focus = this.focus.bind(this);
  }

  inputChange(e) {
    this.setState({
      searchTerm: e.target.value,
      selectedIndex: -1,
      selectedKey: null,
    }, () => {
      this.updateResults();
    });
  }

  keyPressed(e) {
    const { key } = e;
    const { selectedIndex, matches } = this.state;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();
      let newIndex = selectedIndex + (key === 'ArrowDown' ? 1 : -1);
      if (newIndex < 0) {
        newIndex = 0;
      }
      if (newIndex > matches.length - 1) {
        newIndex = matches.length - 1;
      }
      const newKey = (newIndex > -1) ? matches[newIndex].key : null;
      this.setState({
        selectedIndex: newIndex,
        selectedKey: newKey,
      });
    } else if (key === 'Tab') {
      e.preventDefault();
      if (matches.length > 0) {
        this.completeMatch(matches[0]);
      }
    } else if (key === 'Enter') {
      e.preventDefault();
      if (selectedIndex > -1) {
        this.completeMatch(matches[selectedIndex]);
      }
    }
  }

  completeMatch(match) {
    this.setState({
      searchTerm: match.display,
      selectedKey: match.key,
      selectedIndex: -1,
      matches: [],
    });
    this.focus();
  }

  updateResults() {
    const { searchTerm } = this.state;
    const { people } = this.props;
    const newMatches = this.finder(searchTerm, people);
    this.setState({ matches: newMatches });
  }

  focus() {
    this.textInput.current.focus();
  }

  render() {
    const { searchTerm, matches, selectedKey } = this.state;
    return (
      <div className="ui search" style={{ width: '300px' }}>
        <div className="ui icon input">
          <input
            className="prompt"
            type="text"
            placeholder="Find Student..."
            onChange={this.inputChange}
            onKeyDown={this.keyPressed}
            value={searchTerm}
            ref={this.textInput}
          />
          <i className="search icon" />
        </div>
        {matches.length > 0 && (
          <div
            className="results visible"
            style={{ display: 'block' }}
          >
            {
              matches.map((match) => {
                const cssClass = (match.key === selectedKey ? 'result active' : 'result');
                return (
                  <a
                    href="."
                    className={cssClass}
                    key={match.key}
                    onClick={() => this.completeMatch(match)}
                  >
                    <div className="content">{match.display}</div>
                  </a>
                );
              })
            }
          </div>
        )}
      </div>
    );
  }
}

PersonFinder.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PersonFinder;
