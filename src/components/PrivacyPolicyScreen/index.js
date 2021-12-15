import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSideBar";
import {getProfile} from "../../services/userService";

const PrivacyPolicyScreen = () => {
    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => setUser(user))
    }, [])

    return (
        <>
            <div className="row">
                <div className={"col-2"}>
                    <NavigationSidebar active={"privacy"} user={user} setUser={setUser}/>
                </div>

                <div className={"col-10 al-allside-border al-margin-bottom-small"}>
                    <h1>
                        Privacy Policy
                    </h1>
                    The following content entails our Privacy Policy to make users aware of how their information is collected, used, disclosed and transferred through our website. This Policy applies to any individuals accessing, browsing or using our website. We recommended that our users carefully review these policies for their own awareness and benefit and peruse periodically to remain updated with the changes in the policies. By accessing and using the Sites, you consent to collection, storage, and use of the personal information you provide for any of the Services that we provide.
                    The privacy of our users and the services they use is pertinent to us and we are committed to protect it in all respects. The information about the User that is collected by the Company includes information supplied by users, information automatically tracked while navigation and information collected from any other source.
                    <h2 className={"al-padding-top-small"}>
                        Information Supplied By the Users
                    </h2>
                    <b>Registration data for customer:</b><br/>
                    To avail certain sites/ services on our Sites, Users may be required to provide certain information for the registration process that may include but not limited to :-
                    <ul>
                        <li>
                            Your name
                        </li>
                        <li>
                            Date of birth
                        </li>
                        <li>
                            E-mail address
                        </li>
                    </ul>
                    <b>Registration data for restaurants:</b><br/>
                    Certain data of restaurants is required for us to provide certain services. These include:
                    <ul>
                        <li>
                            Restaurant Name
                        </li>
                        <li>
                            Opening date
                        </li>
                        <li>
                            E-mail address
                        </li>
                        <li>
                            Restaurant Address
                        </li>
                    </ul>
                    <b>Registration data for restaurant employees:</b><br/>
                    Along with the information required for the customers, employees need to provide the restaurant they are working in to register in our website.
                    <br/><br/>
                    <b>Voluntary Information:</b><br/>
                    We may collect additional information at other times, including but not limited to, when you provide feedback, comment or like any food item or restaurant and for the restaurant, the details of the menu.

                    <h2 className={"al-padding-top-small"}>
                        Information Automatically Collected/Tracked while Navigation
                    </h2>
                    <b>Cookies: </b><br/>
                    We use cookies to collect Information to assign each visitor a unique, random number as a User Identification to understand the User's individual interests using the identified computer or device.
                    It helps us to improve and understand your preferences based on previous or current Site activity. Unless you voluntarily identify yourself, we will have no way of knowing who you are, even if we assign a cookie to your computer or device. The only personal information a cookie can contain is information you supply.
                    <br/><br/>
                    <b>Links to Third Party Sites / Ad-servers:</b><br/>
                    <p>The Sites may include links to other websites or applications. The users must understand that once you leave our servers to access these third party service providers, the use of any information provided by you will be determined under the privacy policy of the operators you choose to visit. Therefore, they are governed by their respective privacy policies.</p>
                    <p>We may present information to our advertisers to help them understand our audience and confirm the value of advertising on our Sites. We use third-party advertising companies to serve ads when you visit our Sites. These companies may use Information about your interactions with the website  to present you advertisements about goods and services of your interest.</p>
                    <p>We do not provide any personally identifiable information to third party websites / advertisers / ad-servers without your consent.</p>

                    <h2>Information used by Company</h2>
                    <p>The required information supplied by the users is service-dependent and is useful for us to maintain, protect, and improve the services of our company (including advertising and personalisation on the Sites) and for developing new services. It further enables us to provide the most user-friendly experience. Information such as your email address or other personally identifiable information will be used to send commercial or marketing messages about our Services and/or such additional updates and features about third parties products and services with an option to subscribe / unsubscribe (where feasible).</p>
                    <p>Any personally identifiable information provided by you will not be considered as sensitive if it is freely available and / or accessible in the public domain like any comments, or likes in this website or the restaurant menu.</p>

                    <h2>Accessing and Updating Personal Information</h2>
                    <p>Users have the right to update their personal information at any time. To maintain utmost privacy, we do not store any deleted information once the information is updated.</p>

                    <h2>Deleting the profile</h2>
                    <p>Users also have the choice to restrict the use of their personal information. You can do so by deleting the registered account from our website. Doing so will deny us access and we will not store your information. However, this only pertains to your personal information. Any publicly available data such as comments or likes may remain visible to us for a certain time after you delete them.</p>

                </div>
            </div>
        </>
    )
}

export default PrivacyPolicyScreen;