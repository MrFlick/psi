import React, { Component} from "react";
import PropTypes from 'prop-types';

//inspired by https://www.w3schools.com/howto/howto_js_autocomplete.asp

function default_person_finder(searchTerm, list) {
    if (searchTerm=="") return [];
    var matches = []
    var re = new RegExp(searchTerm, "i")
    list.forEach(person => {
        if (re.test(person.full_name)) {
                matches.push({
                    display: person.full_name, 
                    key: person.person_id,
                    item: person})
            }
    })
    return matches
}

class PersonFinder extends Component{
  constructor(props) {
    super(props)
    this.state = {
        matches: [],
        searchTerm: "",
        selectedKey: null,
        selectedIndex: -1
    }
    this.textInput = React.createRef()
    this.finder = default_person_finder
    this.inputChange = this.inputChange.bind(this)
    this.updateResults = this.updateResults.bind(this)
    this.keyPressed = this.keyPressed.bind(this)
    this.completeMatch = this.completeMatch.bind(this)
    this.focus = this.focus.bind(this)
  }

  inputChange(e) {
    this.setState({
        searchTerm: e.target.value,
        selectedIndex: -1,
        selectedKey: null
    }, ()=> {
        this.updateResults()
    })
  }

  keyPressed(e) {
    var key = e.key
    if (key=="ArrowDown" || key=="ArrowUp") {
        e.preventDefault()
        var newIndex = this.state.selectedIndex+(key=="ArrowDown" ? 1 : -1)
        if (newIndex < 0) {
            newIndex = 0
        }
        if (newIndex>this.state.matches.length-1) {
            newIndex = this.state.matches.length-1
        }
        var newKey = (newIndex > -1) ? this.state.matches[newIndex].key : null
        this.setState({
            selectedIndex: newIndex,
            selectedKey: newKey
        })
    } else if (key=="Tab") {
        e.preventDefault()
        if (this.state.matches.length>0) {
            this.completeMatch(this.state.matches[0])
        }
    } else if (key=="Enter") {
        e.preventDefault()
        if (this.state.selectedIndex>-1) {
            this.completeMatch(this.state.matches[this.state.selectedIndex])
        }
    }
  }

  completeMatch(match) {
    this.setState({
        searchTerm: match.display,
        selectedKey: match.key,
        selectedIndex: -1,
        matches: []
    })
    this.focus()
  }

  updateResults() {
    var newMatches = this.finder(
        this.state.searchTerm,
        this.props.people)
    this.setState({matches: newMatches})
  }

  focus() {
      this.textInput.current.focus()
  }

  render(){
    return(
      <div className="ui search" style={{width: "300px"}}>
            <div className="ui icon input">
            <input 
                className="prompt" type="text" 
                placeholder="Find Student..."
                onChange={this.inputChange}
                onKeyDown={this.keyPressed}
                value={this.state.searchTerm}
                ref={this.textInput}/>
            <i className="search icon"></i>
        </div>
        {this.state.matches.length > 0 && <div className="results visible"
        style={{display: "block"}}>{
            this.state.matches.map((match) => {
                var cssClass = (match.key==this.state.selectedKey ? "result active":"result")
                return <a className={cssClass}
                key={match.key}
                onClick={() => this.completeMatch(match)}
                ><div className="content">{match.display}</div></a>
            })
        }</div>}
      </div>
    );
  }
}

PersonFinder.propTypes = {
  people: PropTypes.array
}

export default PersonFinder;