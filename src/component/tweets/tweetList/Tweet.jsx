import React, { useState, useEffect } from "react";
import { likeTweet, unlikeTweet } from "../../../api/likeAndUnlike";
import commitIcon from "../../../assets/commit.svg";
import heartIcon from "../../../assets/heart.svg";
import { useId } from "../../../contexts/IdContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Tweet.scss";
import PopupReply from "../../popupReply/PopupReply";
import { getSingleTweet } from "../../../api/tweets";

const Tweet = ({
  logo,
  username,
  accountName,
  postTime,
  content,
  comments,
  tweetId,
  likes,
  replyTo,
  hideFooter,
  onGetUserIdFromTweet,
  setList,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  //const [count, setCount] = useState(likes);
  const { checkItemId } = useId();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleOneTweet = async () => {
    checkItemId(tweetId);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLike = async () => {
    try {
      // if (isLiked) {
      //   return;
      // }
      if (isLiked) {
        await unlikeTweet(String(tweetId));
        setList?.((prev) => {
          return prev.map((tweet) => {
            if (tweet.id === tweetId) {
              return {
                ...tweet,
                LikesCount: tweet.LikesCount - 1,
              };
            }
            return { ...tweet };
          });
        });
        setIsLiked(false);
      } else {
        await likeTweet(String(tweetId));
        setList?.((prev) => {
          return prev.map((tweet) => {
            if (tweet.id === tweetId) {
              return {
                ...tweet,
                LikesCount: tweet.LikesCount + 1,
              };
            }
            return { ...tweet };
          });
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("喜歡推文失败:", error);
    }
    setIsLiked(!isLiked);
  };

  return (
<<<<<<< HEAD
    <div
      className="tweetContainer"
      onClick={(e) => {
        if (e.target.tagName !== "IMG") {
          checkItemId(tweetId);
          navigate("/reply_list");
        }
      }}
    >
      <Link to={`/user/other`}>
        <img
          src={logo}
          alt="Logo"
          className="userLogo"
          onClick={onGetUserIdFromTweet}
        />
      </Link>

      <div className="tweetContent">
        <div className="tweetHeader">
          <span className="tweetUsername">{username}</span>

          <span className="tweetAccountName">@{accountName}</span>
          <span className="dot" />
          <span className="tweetPostTime">{postTime}</span>
        </div>

        {replyTo && (
          <div className="replyText">
            回覆 <span>@{replyTo}</span>
=======
    <>
      <div
        className="tweetContainer"
        onClick={(e) => {
          if (e.target.tagName !== "IMG") {
            checkItemId(tweetId);
            navigate("/reply_list");
          }
        }}
      >
        <Link to={`/user/other`}>
          <img
            src={logo}
            alt="Logo"
            className="userLogo"
            onClick={onGetUserIdFromTweet}
          />
        </Link>

        <div className="tweetContent">
          <div className="tweetHeader">
            <span className="tweetUsername">{username}</span>

            <span className="tweetAccountName">@{accountName}</span>
            <span className="dot" />
            <span className="tweetPostTime">{postTime}</span>
>>>>>>> 0e7a0258deba16114cf276bb17539628755be59f
          </div>
        )}

        <div className="tweetText">{content}</div>

        <div className="tweetFooter">
          {!hideFooter && (
            <>
              <div className="tweetComments">
                <img src={commitIcon} alt="commit icon" />
                <span className="commentCount">{comments}</span>
              </div>
              <div className="tweetLikes" onClick={handleLike}>
                <img
                  src={heartIcon}
                  alt="heart icon"
                  className={`heartIcon ${isLiked ? "liked" : ""}`}
                />
                <span className="likeCount">{count}</span>
              </div>
            </>
          )}
<<<<<<< HEAD
=======

          <div className="tweetText">{content}</div>

          <div className="tweetFooter">
            {!hideFooter && (
              <>
                <div className="tweetComments" onClick={() => handleOneTweet()}>
                  <img
                    src={commitIcon}
                    alt="commit icon"
                    onClick={handleOpenModal}
                  />
                  <span className="commentCount">{comments}</span>
                </div>
                <div className="tweetLikes" onClick={handleLike}>
                  <img
                    src={heartIcon}
                    alt="heart icon"
                    className={`heartIcon ${isLiked ? "liked" : ""}`}
                  />
                  <span className="likeCount">{likes}</span>
                </div>
              </>
            )}
          </div>
>>>>>>> 0e7a0258deba16114cf276bb17539628755be59f
        </div>
        {showModal && (
          <PopupReply
            open={showModal}
            onClose={handleCloseModal}
            setList={setList}
          />
        )}
      </div>
<<<<<<< HEAD
    </div>
=======
    </>
>>>>>>> 0e7a0258deba16114cf276bb17539628755be59f
  );
};

export default Tweet;
