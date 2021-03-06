import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { LazyLoadImage } from "react-lazy-load-image-component";

import getScoreColor from "../../utils/scoreColor";
import Like from "./like";

const StyledReviewContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    &.expanded {
        grid-column: 1 / 3;
    }

    .userContainer {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding: 1rem;

        color: var(--darkBlueColor);
        transition: background-color 0.3s ease-in-out;

        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 0.5rem;
        }

        h2 {
            font-size: clamp(1rem, 2vw, 1.5rem);
        }

        h4 {
            font-size: clamp(0.65rem, 1.5vw, 1rem);
        }

        a {
            display: flex;
            align-items: center;
            justify-content: left;

            h4 {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            color: inherit;
            text-decoration: none;
            gap: 0.5rem;

            @media (max-width: ${({ theme }) => theme.mobile}) {
                gap: 0.5rem;
            }

            &:hover {
                text-decoration: underline;
            }
            &:hover img {
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            }
        }

        a > span > img {
            height: clamp(2.5rem, 4vw, 4rem);
            object-fit: cover;
            aspect-ratio: 1;
            vertical-align: top;
            border-radius: 100%;
            transition: all 0.2s ease-in-out;
        }

        &.GreenBG {
            background-color: var(--greenScoreColor) !important;
        }
        &.YellowBG {
            background-color: var(--yellowScoreColor) !important;
        }
        &.RedBG {
            background-color: var(--redScoreColor) !important;
        }
    }
    .reviewAlbumContainer {
        display: flex;

        .albumCoverContainer {
            img {
                height: clamp(7.5rem, 10vw, 10rem);
                width: auto;

                aspect-ratio: 1;
                object-fit: cover;
                aspect-ratio: 1;
                vertical-align: top;
            }
        }

        .albumTextContainer {
            flex: 1;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;

            background-color: var(--blueColor);
            padding: 0.5rem 1rem;
            a {
                width: 100%;
                color: var(--lightColor);
                text-decoration: none !important;
            }

            h2 {
                font-size: clamp(0.85rem, 1.8vw, 1.5rem);
            }
            h4 {
                font-weight: normal;
                font-size: clamp(0.7rem, 1.5vw, 1rem);
            }

            h2:hover,
            h4:hover {
                text-decoration: underline;
            }
        }
    }
    .reviewContainer {
        & > * {
            margin: 0 auto;
            max-width: 800px;
            white-space: pre-line;
        }
        line-height: 1.6;
        padding: 1.5rem 2rem;
        background-color: var(--blueColor);
        font-size: clamp(0.8rem, 1vw, 1.1rem);
        font-weight: normal;
        .reviewHeaderText {
            text-transform: uppercase;
            /* font-size: 1.5rem; */
            font-weight: 900;
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 1rem 1.25rem;
        }
    }

    .read-more-button {
        cursor: pointer;
        font-weight: 900;
        margin-top: 0.5rem;
    }

    .showMoreText {
        a {
            color: var(--accentColor);
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .creationTimeText {
        opacity: 0.6;
        font-style: italic;
    }
`;

const ReviewContainer = ({ review, isOutsideAlbum }) => {
    const showMoreTextRef = useRef(null);

    // Scroll to review after collapsing "Show more"
    const handleExpand = (isExpanded) => !isExpanded && showMoreTextRef.current.scrollIntoView({ block: "center" });

    return (
        <StyledReviewContainer>
            {review.album && isOutsideAlbum && (
                <div className="reviewAlbumContainer">
                    <div className="albumCoverContainer">
                        <Link to={`/albums/${review.album.id}`}>
                            <LazyLoadImage
                                src={review.album.art_cover || review.album.art_cover_url || `/images/square-404.jpg`}
                                alt={`${review.album.title} Cover Art`}
                                effect="blur"
                            />
                        </Link>
                    </div>
                    <div className="albumTextContainer">
                        <Link to={`/artists/${review.album.artist.slug}`}>
                            <h2>{review.album.artist.name}</h2>
                        </Link>

                        <Link to={`/albums/${review.album.id}`}>
                            <h4>{review.album.title}</h4>
                        </Link>
                    </div>
                </div>
            )}
            <div className={`userContainer ${getScoreColor(review.rating)}BG`}>
                <Link to={`/users/${review.reviewer.username}`}>
                    <LazyLoadImage
                        src={review.reviewer.profile_pic || review.reviewer.profile_pic_url || `/images/avatar_placeholder.jpg`}
                        alt={`${review.reviewer.username} profile avatar`}
                        effect="blur"
                    />
                    <h4>{review.reviewer.username}</h4>
                </Link>
                <h2>{review.rating}</h2>
            </div>
            <div className="reviewContainer" ref={showMoreTextRef}>
                <p className="reviewHeaderText">Review</p>
                <ShowMoreText
                    lines={4}
                    more="Show more"
                    keepNewLines={true}
                    less="Show less"
                    className="showMoreText"
                    truncatedEndingComponent={"... "}
                    onClick={handleExpand}
                >
                    {review.review_text}
                </ShowMoreText>
                <p title={moment(review.updated_at).format("YYYY-MM-DD HH:mm:ss")} className="creationTimeText">
                    {moment(review.updated_at).fromNow()}
                </p>
                <Like content={review} />
            </div>
        </StyledReviewContainer>
    );
};

export default ReviewContainer;
