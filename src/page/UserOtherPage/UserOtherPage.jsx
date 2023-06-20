import { useEffect, useState } from "react";
import {
  getUserLikes,
  getUserRepliedTweets,
  getUserTweets,
<<<<<<< HEAD
} from '../../api/tweets';
import Header from '../../component/header/Header';
import Navbar from '../../component/navbar/Navbar';
import PopularList from '../../component/popularList/PopularList';
import TabBar from '../../component/tabBar/TabBar';
import UserOtherItem from '../../component/userInfo/userOther/UserOther';
import { getPopularList } from '../../api/popularlist.js';
import { getUserPageById } from '../../api/getUserPage';
import { useUserId } from '../../contexts/UserIdContext';
import UserTweetsList from '../../component/userTweetList/UserTweetList';
import UserRepliesList from '../../component/userRepliesList/UserRepliesList';
import UserLikesList from '../../component/userLikesList/UserLikesList';
import '../MainPage/MainPage.scss';
=======
} from "../../api/tweets";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import UserOtherItem from "../../component/userInfo/userOther/UserOther";
import { getPopularList } from "../../api/popularlist.js";
import { getUserPageById } from "../../api/getUserPage";
import { useUserId } from "../../contexts/UserIdContext";
import UserTweetsList from "../../component/userTweetList/UserTweetList";
import UserRepliesList from "../../component/userRepliesList/UserRepliesList";
import UserLikesList from "../../component/userLikesList/UserLikesList";
import "../MainPage/MainPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
>>>>>>> 0e7a0258deba16114cf276bb17539628755be59f

const UserOther = () => {
  const { userId } = useUserId();
  const [activeTab, setActiveTab] = useState("tweets");
  const [tweets, setTweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [popularCards, setPopularCards] = useState([]);
  const [userData, setUserData] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await getUserTweets(userId);
        //console.log(userTweets);
        setTweets(userTweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error("获取用户推文失败：", error);
      }

      try {
        const userReplies = await getUserRepliedTweets(userId);
        //console.log(userReplies);
        setReplies(userReplies.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error("獲取用戶資料失败：", error);
      }

      try {
        const userLikes = await getUserLikes(userId);
        console.log(userLikes);
        setLikes(userLikes.map((like) => ({ ...like })));
      } catch (error) {
        console.error("获取用户喜欢的推文失败：", error);
      }

      try {
        const popularCards = await getPopularList();
        setPopularCards(popularCards.map((users) => ({ ...users })));
      } catch (error) {
        console.error("获取热门列表失败：", error);
      }

      try {
        const user = await getUserPageById(userId);
        console.log(user);
        setUserData(user);
      } catch (error) {
        console.error("获取用户信息失败：", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <Header username={userData?.name} tweetCount={userData?.TweetCount} />
        <div className="postSection">
          <UserOtherItem
            avatar={userData?.avatar}
            username={userData?.name}
            accountName={userData?.account}
            bio={userData?.introduction}
            followingCount={userData?.followingCount}
            followersCount={userData?.followerCount}
            banner={userData?.banner}
          />
        </div>
        <TabBar
          activePage="UserOther"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <hr />
        <div className="tweetsSection">
          {activeTab === "tweets" && (
            <UserTweetsList tweets={tweets} className="tweetsSection" />
          )}
          {activeTab === "replies" && (
            <UserRepliesList replies={replies} className="tweetsSection" />
          )}
          {activeTab === "likes" && (
            <UserLikesList likes={likes} className="tweetsSection" />
          )}
        </div>
      </div>
      <PopularList popularCards={popularCards} />
    </div>
  );
};

export default UserOther;
