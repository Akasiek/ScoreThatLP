import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

import getScoreColor from "../../utils/scoreColor";

const StyledRatingContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0;

    color: var(--darkBlueColor);
    transition: background-color 0.3s ease-in-out;

    h2 {
        font-size: clamp(1.25rem, 2.5vw, 1.7rem);
    }

    h4 {
        font-size: clamp(0.55rem, 1.25vw, 0.9rem);
        padding: 0 1rem;
    }

    a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: inherit;
        text-decoration: none;
        text-align: center;
        gap: 1rem;

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
        width: clamp(3rem, 7vw, 5rem);
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
`;

const RatingContainer = ({ rating }) => {
    return (
        <StyledRatingContainer className={`${getScoreColor(rating.rating)}BG`}>
            <Link to={`/users/${rating.reviewer.username}`}>
                <LazyLoadImage
                    src={rating.reviewer.profile_pic || rating.reviewer.profile_pic_url || `/images/avatar_placeholder.jpg`}
                    alt={`${rating.reviewer.username} profile avatar`}
                    effect="blur"
                />
                <h4>{rating.reviewer.username}</h4>
            </Link>
            <h2>{rating.rating}</h2>
        </StyledRatingContainer>
    );
};

export default RatingContainer;
