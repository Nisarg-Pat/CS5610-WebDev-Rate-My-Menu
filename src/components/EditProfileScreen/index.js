import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {editUser, getProfile, signupUser} from "../../services/userService";

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
        if (user.name === "" || user.date === "") {
            alert("Enter correct details");
            return;
        }
        editUser(user).then((response) => {
            navigate("/profile");
        });
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
            default:
                break;
        }
    }

    return (
        <div className={"row"}>
            <div className={"col-4"}/>
            <div className={"col-4 al-signup"}>
                <div className={"row"}>
                    <div className={"col-1"}/>
                    <div className={"col-10"}>
                        <h1>
                            Edit Profile for {user.username}
                        </h1>
                    </div>
                    <div className={"col-1"}/>
                </div>
                <div className={"row"}>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Name
                        </div>
                        <div className={"col-6"}>
                            <input className={"al-signup-input"}
                                   value={user.name}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "name");
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
                                      onChange={(e) => {
                                          formHandler(e.target.value, "description");
                                      }}>{user.description}</textArea>
                        </div>
                    </label>
                    <br/>
                    <div
                        className={"row al-margin-top-large al-padding-left-large al-margin-bottom-small"}>
                        <div className={"col-4"}/>
                        <div className={"col-4"}>
                            <button className={"btn btn-primary al-button al-full"}
                                    onClick={editProfileClickHandler}>Edit
                            </button>
                        </div>
                        <div className={"col-4"}/>
                    </div>
                </div>
            </div>
            <div className={"col-4"}/>
        </div>
    )
}

export default EditProfileScreen;