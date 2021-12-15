import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteUser, editUser, getProfile} from "../../services/userService";

const EditProfileScreen = () => {
    const navigate = useNavigate();
    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => {
            if (user._id === undefined) {
                navigate("/home");
            } else {
                user.date = user.date.substring(0, 10);
                setUser(user);
            }
        })
    }, [navigate])

    const editProfileClickHandler = () => {
        if (user.name === "" || user.date === "" || user.email === "") {
            alert("Enter correct details");
            return;
        }
        let email = user.email.split("@");
        if (email.length !== 2) {
            alert("Email not valid");
            return;
        } else {
            let others = email[1].split(".");
            if (others.length !== 2 || others[0] === '' || others[1] === '' || email[0] === ''
                || email[1] === '') {
                alert("Email not valid");
                return;
            }
        }
        editUser(user).then((response) => {
            navigate("/profile");
        });
    }

    const deleteClickHandler = () => {
        if (window.confirm('Do you really want to delete the profile?')) {
            deleteUser(user).then(() => {
                navigate("/home");
            })
        }
    }

    const formHandler = (change, inputType) => {
        switch (inputType) {
            case "date":
                setUser({...user, date: change});
                break;
            case "name":
                setUser({...user, name: change});
                break;
            case "description":
                setUser({...user, description: change});
                break;
            case "waiterRestaurantId":
                setUser({...user, waiterRestaurantId: change});
                break;
            case "email":
                setUser({...user, email: change});
                break;
            case "address":
                setUser({...user, address: change});
                break;
            default:
                break;
        }
    }

    return (
        <div className={"row"}>
            <div className={"col-sm-1 col-md-2 col-lg-3 col-xxl-4"}/>
            <div className={"col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-4 al-signup"}>
                <div className={"al-flex al-h-center"}>
                    <h1>
                        Edit Profile for {user.username}
                    </h1>
                </div>
                <div className={"row"}>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Name
                        </div>
                        <div className={"col-6"}>
                            <input className={"al-signup-input"}
                                   value={user.name}
                                   placeholder={"Your name"}
                                   title={"Your name"}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "name");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Email
                        </div>
                        <div className={"col-6"}>
                            <input className={"al-signup-input"}
                                   type={"email"}
                                   value={user.email}
                                   placeholder={"Your email"}
                                   title={"Your email"}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "email");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            {user.role === "restaurant" ? <>Opening Date</> : <>Date Of Birth</>}
                        </div>
                        <div className={"col-6"}>
                            <input type="date" className={"al-signup-input"}
                                   value={user.date}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "date");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Description
                        </div>
                        <div className={"col-6"}>
                            <textArea className={"al-signup-textArea"}
                                      value={user.description}
                                      placeholder={"Description"}
                                      title={"Description"}
                                      onChange={(e) => {
                                          formHandler(e.target.value, "description");
                                      }}/>
                        </div>
                    </label>
                    <br/>
                    {user.role === "restaurant" ?
                     <>
                         <label className={"row al-signup-label"}>
                             <div className={"col-6"}>
                                 Address
                             </div>
                             <div className={"col-6"}>
                                 <textarea className={"al-signup-input"}
                                           value={user.address}
                                           placeholder={"Your address"}
                                           title={"Your address"}
                                           onChange={(e) => {
                                               formHandler(e.target.value, "address");
                                           }}/>
                             </div>
                         </label>
                         <br/>
                     </> : <></>}
                    <div
                        className={"row al-margin-top-large al-padding-left-large al-margin-bottom-small"}>
                        <div className={"col-3"}/>
                        <div className={"col-6"}>
                            <button className={"btn btn-primary al-button al-full"}
                                    onClick={editProfileClickHandler}>Edit
                            </button>
                        </div>
                        <div className={"col-3"}/>
                    </div>
                    <div
                        className={"row al-padding-left-large al-margin-bottom-small"}>
                        <div className={"col-3"}/>
                        <div className={"col-6"}>
                            <button className={"btn btn-primary al-button al-full"}
                                    onClick={deleteClickHandler}>Delete Profile
                            </button>
                        </div>
                        <div className={"col-3"}/>
                    </div>
                </div>
            </div>
            <div className={"col-sm-1 col-md-2 col-lg-3 col-xxl-4"}/>
        </div>
    )
}

export default EditProfileScreen;