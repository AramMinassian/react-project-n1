import styles from "../styles/Modals.module.css";
import React from "react";
import PropTypes from "prop-types";
import { Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getAllTasks } from "../reduxStore/actions";


const statusOptions = [
  {
    name: "Both",
    value: ""
  },
  {
    name: "Active",
    value: "active"
  },
  {
    name: "Done",
    value: "done"
  }
]

const sortOptions = [
  {
    name: "A-Z",
    value: "a-z"
  },
  {
    name: "Z-A",
    value: "z-a"
  },
  {
    name: "Creation date oldest",
    value: "creation_date_oldest"
  },
  {
    name: "Creation date newest",
    value: ""
  },
  {
    name: "Completion date oldest",
    value: "completion_date_oldest"
  },
  {
    name: "Completion date newest",
    value: "completion_date_newest"
  }
]


class FilterModal extends React.Component {

  state = {
    status: "",
    sort: "",
    create_lte: "",
    create_gte: "",
    complete_lte: "",
    complete_gte: ""
  }

  componentDidMount() {
    const { filterParams } = this.props;
    this.setState({
      ...filterParams
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleReset = () => {
    this.setState({
      status: "",
      sort: "",
      create_lte: "",
      create_gte: "",
      complete_lte: "",
      complete_gte: ""
    })
  }

  handleApply = () => {
    const { toggleFilterMode, search, setFilterParams, getAllTasks } = this.props;
    const filterData = {};
    for (let filter in this.state) {
      if (this.state[filter]) {
        filterData[filter] = this.state[filter];
      }
    }
    setFilterParams(filterData);
    const queryParams = {
      ...filterData
    };
    if (search) queryParams.search = search;

    toggleFilterMode();
    getAllTasks(queryParams);
  }

  render() {
    const { toggleFilterMode } = this.props;
    const { status, sort, create_lte, create_gte, complete_lte, complete_gte } = this.state;

    return (
      <div className={styles.modalBg}>
        <div className={`${styles.modalWrapper} ${styles.filterModal}`}>
          <div className={styles.modalHeader}>
            <span
              className={styles.modalInfo}
            > Filter options</span>
            <span
              className={styles.modalCloseButton}
              onClick={toggleFilterMode}
            ><FontAwesomeIcon icon={faTimes} /></span>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.select}>
              <label htmlFor="sort">Sort by</label>
              <select
                name="sort"
                value={sort}
                onChange={this.handleChange}>
                {sortOptions.map(option => (
                  <option
                    key={option.name}
                    value={option.value}
                  >{option.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              <label htmlFor="status">Status</label>
              <select
                name="status"
                value={status}
                onChange={this.handleChange}>
                {statusOptions.map(option => (
                  <option
                    key={option.name}
                    value={option.value}
                  >{option.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="create_lte">Created before</label>
              <FormControl
                type="date"
                name="create_lte"
                value={create_lte}
                onChange={this.handleChange}
              />
              <label htmlFor="create_gte">Created after</label>
              <FormControl
                type="date"
                name="create_gte"
                value={create_gte}
                onChange={this.handleChange}
              />
              <label htmlFor="complete_lte">Completed before</label>
              <FormControl
                type="date"
                name="complete_lte"
                value={complete_lte}
                onChange={this.handleChange}
              />
              <label htmlFor="complete_gte">Completed after</label>
              <FormControl
                type="date"
                name="complete_gte"
                value={complete_gte}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button
              variant="primary"
              onClick={this.handleApply}
            >Apply</Button>
            <Button
              variant="success"
              onClick={this.handleReset}
            >Reset</Button>
            <Button
              variant="warning"
              onClick={toggleFilterMode}
            >Cancel</Button>
          </div>
        </div>
      </div>
    )
  }
}



FilterModal.propTypes = {
  toggleFilterMode: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setFilterParams: PropTypes.func.isRequired,
  filterParams: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  getAllTasks
}


export default connect(null, mapDispatchToProps)(FilterModal);