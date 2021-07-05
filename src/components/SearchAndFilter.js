import "./SearchAndFilter.css";
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getAllTasks } from "../reduxStore/actions";

class SearchAndFilter extends React.Component {

  state = {
    search: ""
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      search: value
    })
  }

  handleSearch = () => {
    const { filterParams, setSearchParams, getAllTasks } = this.props;
    const search = this.state.search.trim();
    setSearchParams(search);

    const queryParams = {
      ...filterParams
    }
    if (search) {
      queryParams.search = search;
    }
    getAllTasks(queryParams)
  }

  render() {
    const { onSelectMode, toggleFilterMode } = this.props;
    return (
      <div className="SearchAndFilter">
        <input
          type="text"
          className="search-field"
          placeholder="Search for a task"
          disabled={onSelectMode}
          onChange={this.handleChange}
        />
        <button
          className="search-btn"
          title="search"
          disabled={onSelectMode}
          onClick={this.handleSearch}
        ><FontAwesomeIcon icon={faSearch} /></button>
        <button
          className="filter-btn"
          title="apply filters"
          disabled={onSelectMode}
          onClick={toggleFilterMode}
        ><FontAwesomeIcon icon={faFilter} /> Filters</button>
      </div>

    )
  }
}

SearchAndFilter.propTypes = {
  onSelectMode: PropTypes.bool.isRequired,
  toggleFilterMode: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  filterParams: PropTypes.object.isRequired,
}



const mapDispatchToProps = {
  getAllTasks
}

export default connect(null, mapDispatchToProps)(SearchAndFilter);
