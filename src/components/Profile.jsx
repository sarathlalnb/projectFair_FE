import React, { useState } from "react";
import { Collapse, FloatingLabel, Form } from "react-bootstrap";
import placeHolder from "../assets/boy.png";
import { editProfile } from "../services/AllApi";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const [profileData, setProfileData] = useState({});

  const updateProfile = async () => {
    if (Object.keys(profileData).length > 0) {
      try {
        let token = sessionStorage.getItem("token");

        let headers = {
          Authorization: `Bearer ${token}`,
        };

        let apiResponse = await editProfile(profileData, headers);

        if (apiResponse.status == 200) {
          alert("Successfully Updated");
        } else {
          alert("Something Went Wrong");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill atleast one field");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-around align-items-center text-warning">
        <h2>Profile</h2>
        <button
          onClick={() => setOpen(!open)}
          className="btn text-warning fs-3"
        >
          <i class="fa-solid fa-caret-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div className="card ">
          <div className="text-center p-2">
            <label>
              <input
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    profilePic: e.target.files[0],
                  })
                }
                style={{ display: "none" }}
                type="file"
                name=""
                id=""
              />
              <img className="img-fluid w-25" src={placeHolder} alt="" />
            </label>
            <FloatingLabel
              controlId="floatingInput"
              label="User github Link"
              className="my-3"
            >
              <Form.Control
                onChange={(e) =>
                  setProfileData({ ...profileData, github: e.target.value })
                }
                type="text"
                placeholder="User github Link"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="User Linkedin Link"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) =>
                  setProfileData({ ...profileData, linkedIn: e.target.value })
                }
                type="text"
                placeholder="User Linkedin Link"
              />
            </FloatingLabel>
            <button
              onClick={updateProfile}
              className="w-100 btn btn-warning  fw-bold"
            >
              Update
            </button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Profile;
