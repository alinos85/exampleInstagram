class profilServices {
  updateProfile() {
    alert("Update profile");
  }

  //Function non implémenter
  loadProfile(id: string) {
    // const dataAPIProfile = {"id":"1234567890","name":"Benoit","lastName":"Patry","email":"benoit.patry.1@ulaval.ca","phone":"5141234567"};

    return { id: "1234567890", name: "Benoit" };
    //return JSON.parse(dataAPIProfile);
  }
}

const myProfileServices = new profilServices();

export default myProfileServices;
