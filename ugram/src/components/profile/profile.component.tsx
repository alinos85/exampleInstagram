import React from "react";
import ProfilPicture from "./profile-picture.component";
import ProfileInformation from "./profile-information.component";
import ProfileServices from "../../services/profile/profile.services";
import "./profile.scss";

export default function UserManagement() {
  return (
    <div className="profile">
      <ProfilPicture />
      <ProfileInformation
        name={"Benoit"}
        lastName="Patry"
        email="benoit.patry.1@ulaval.ca"
        phone="15149876543"
        date="2021-01-21"
        updateFunction={ProfileServices.updateProfile}
      />
    </div>
  );
}
