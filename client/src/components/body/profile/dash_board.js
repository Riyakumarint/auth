import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProfile from "./Admin_profile";
import Doctor_dash from "./Doctor_dash";
import Patient_dash from "./Patient_dah";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
import SideNav from "./sidenav/SideNav";

const initialState = {
  err: "",
  success: "",
};

function Dash_board() {
  const { user, isAdmin,isDoctor } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const [data, setData] = useState(initialState);
  const { err, success } = data;
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0 })
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  return (
    <>
       <SideNav />
      <div className="continer-profile">
     
        <div className="pro">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <div className="profile_page">
            <div className="profile_header">
              <h4>{user.name}</h4>
            </div>
            <div className="profile-container">
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="avatar">
                    <img src={user.avatar} alt="" />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="line-2">
            <hr></hr>
          </div>
          <div className="col-right">
            <div>{isAdmin ? <AdminProfile /> : (
              <>{isDoctor?<Doctor_dash/>:<Patient_dash/>}</>
              )
            }</div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Dash_board;
