import React, {useEffect, useState} from "react";
import {getRatingsOfFoodItem,} from "../../services/userFoodRatingService";
import UserRatingList from "../RatingComponent/UserRatingList";
import {getRatingsOfRestaurant,} from "../../services/userRestaurantRatingService";
import LoginSignupComponent from "../LoginSignupComponent";
import {getEmployeesListByRestaurantId, getUsersList} from "../../services/userService";
import UserItem from "../RestaurantComponent/UserItem";
import {getFoodLikesByUser} from "../../services/userFoodLikesService";
import {getRestaurantLikesByUser} from "../../services/userRestaurantLikesService";

const HomeScreenComponent = ({user}) => {

    let [foodRatings, setFoodRatings] = useState([]);
    let [restaurantRatings, setRestaurantRatings] = useState([]);
    let [active, setActive] = useState("foodItem");
    let [employees, setEmployees] = useState([]);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        if (user.role === "customer") {
            getFoodLikesByUser(user).then((likes) => {
                likes.map((like, key) => getRatingsOfFoodItem(like.foodItem).then((ratings) => setFoodRatings(...foodRatings, ratings)))
            });
            getRestaurantLikesByUser(user).then((likes) => {
                likes.map((like, key) =>getRatingsOfRestaurant(like.restaurant).then(ratings => setRestaurantRatings(...restaurantRatings, ratings)))
            });
        } else if (user.role === "waiter") {
            getFoodLikesByUser(user).then((likes) => {
                likes.map((like, key) => getRatingsOfFoodItem(like.foodItem).then((ratings) => setFoodRatings(...foodRatings, ratings)))
            });
            getRestaurantLikesByUser(user).then((likes) => {
                likes.map((like, key) =>getRatingsOfRestaurant(like.restaurant).then(ratings => setRestaurantRatings(...restaurantRatings, ratings)))
            });
            getEmployeesListByRestaurantId(user.waiterRestaurantId)
                .then((employees) => setEmployees(employees))
        } else if (user.role === "restaurant") {
            getRatingsOfRestaurant(user).then((ratings) => setRestaurantRatings(ratings));
            getEmployeesListByRestaurantId(user._id)
                .then((employees) => setEmployees(employees))
            setActive("restaurant")
        } else {
            getUsersList().then(users => setUsers(users))
        }
    }, [user, foodRatings, restaurantRatings]);

    const getNoUserHome = () => {
        return (
            <div className={"row"}>
                <div className={"col-12 col-md-10 col-10 al-allside-border"}>
                    <div className={"row al-border-bottom al-padding-small"}>
                        Welcome to Food and Restaurant Review systems!
                        <br/>
                        You can search for Food items and restaurants.
                        <br/>
                        Login to post reviews and like food items and restaurants!!
                    </div>
                    <div className={"row al-border-bottom"}>
                        <h1>
                            New Restaurants
                        </h1>
                            {users.filter((user, key)=>user.role === "restaurant").slice(0, 10).map(
                                (user, key) => <div className={"col-sm-12 col-lg-6 al-color-white al-no-underline"}><UserItem restaurant={user} key={key}/></div>)}
                    </div>
                    <div className={"row al-border-bottom"}>
                        <h1>
                            New Customers
                        </h1>
                        {users.filter((user, key)=>user.role === "customer").slice(0, 10).map(
                            (user, key) => <div className={"col-sm-12 col-lg-6 al-color-white al-no-underline"}><UserItem restaurant={user} key={key}/></div>)}
                    </div>
                    <div className={"row"}>
                        <h1>
                            New Employees
                        </h1>
                        {users.filter((user, key)=>user.role === "waiter").slice(0, 10).map(
                            (user, key) => <div className={"col-sm-12 col-lg-6 al-color-white al-no-underline"}><UserItem restaurant={user} key={key}/></div>)}
                    </div>
                </div>
                <div className={"d-none d-md-block col-md-2"}>
                    <LoginSignupComponent/>
                </div>
            </div>
        )
    }

    const getUserHome = () => {
        return (
            <div className={"row al-allside-border"}>
                <div className={"al-border-bottom"}>
                    <h1 className={"col-11"}>
                        {user.name}
                    </h1>
                </div>
                <div>
                    <div className={"al-border-bottom"}>
                        <ul className="nav nav-tabs al-nav al-font-big">
                            {user.role === 'customer' || user.role === "waiter" ?
                             <li className={`nav-item al-padding-small al-margin-small al-pointer ${active
                                                                                                    === "foodItem"
                                                                                                    ? "al-navbar-active"
                                                                                                    : ""}`}
                                 onClick={() => setActive("foodItem")}>
                                 Liked Food Ratings
                             </li> : <></>}
                            {user.role === 'waiter' || user.role === "restaurant" || user.role
                             === "customer" ?
                             <li className={`nav-item al-padding-small al-margin-small al-pointer ${active
                                                                                                    === "restaurant"
                                                                                                    ? "al-navbar-active"
                                                                                                    : ""}`}
                                 onClick={() => setActive("restaurant")}>
                                 Liked Restaurant Ratings
                             </li> : <></>}
                            {user.role === 'waiter' || user.role === "restaurant" ?
                             <li className={`nav-item al-padding-small al-margin-small al-pointer ${active
                                                                                                    === "employees"
                                                                                                    ? "al-navbar-active"
                                                                                                    : ""}`}
                                 onClick={() => setActive("employees")}>
                                 Employees List
                             </li> : <></>}
                        </ul>
                    </div>

                    <div className={"al-padding-top-small"}>
                        {active === "foodItem" ? <UserRatingList ratings={foodRatings}
                                                                 showTitleUserName={true}
                                                                 showFoodTitle={true}/> : <></>}
                        {active === "restaurant" ? <UserRatingList ratings={restaurantRatings}
                                                                   showRestaurantName={user.role
                                                                                       !== "restaurant"}
                                                                   showUsername={user.role
                                                                                 === "restaurant"}
                                                                   showTitleUserName={user.role
                                                                                  !== "restaurant"}/>
                                                 : <></>}
                        {active === "employees" ? <div>
                                                    {employees.map(
                                                        (employee, key) => <UserItem restaurant={employee} key={key}/>)}
                                                </div>
                                                : <></>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"al-margin-right-small"}>
            {
                user._id !== undefined ? getUserHome() : getNoUserHome()
            }
        </div>
    )
}

export default HomeScreenComponent;