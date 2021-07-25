import styles from "../styles/User.module.css";
import React from "react";
import { connect } from "react-redux";
import userImage from "../assets/user_img.png";



class User extends React.Component {


  render() {
    const { userInfo } = this.props;

    return (
      !userInfo ? <div className="empty-message">user does not exist</div> :
        <div className={styles.user}>
          <img src={userImage} alt="User" />
          <div>
            <h2>{userInfo.name} {userInfo.surname}</h2>
          </div>
        </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}



export default connect(mapStateToProps)(User);