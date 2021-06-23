import React from "react";

class Modal extends React.Component {
  render() {
    return (
      <div className="modal-wrapper-1">
        <div className="modal-header-1">
          <p>Modal header text</p>
          <span className="close-modal-btn">x</span>
        </div>
        <div className="modal-body-1">
          <h4>Title</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Perferendis quibusdam itaque perspiciatis laudantium architecto non? 
            Ipsa consequatur nobis sequi culpa, cupiditate eveniet neque aut 
            ipsum repudiandae cum laborum ipsam illo.</p>
        </div>
        <div className="modal-footer-1">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-done">Done</button>
        </div>
      </div>
    )
  }
}

export default Modal;