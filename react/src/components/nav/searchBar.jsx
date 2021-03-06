import React from "react";
import styled from "styled-components";

import SearchResults from "./searchResults";

export const StyledSearchBar = styled.div`
    height: 100%;
    position: relative;

    .searchBar {
        position: absolute;
        transition: all 0.5s ease-in-out;
        bottom: 0;
        right: 0;
        left: 0;
        text-align: center;
        transform: translateY(${({ visibility }) => (visibility ? "100%" : "0")});

        .searchInputContainer {
            background-color: var(--darkBlueColor);

            .searchInput {
                width: 80%;
                font-size: 1.2rem;
                font-family: "Montserrat", sans-serif;
                border: none;
                outline: none;
                background-color: var(--blueColor);
                color: var(--lightColor);
                margin: 1.25rem;
                padding: 0.75rem;

                @media (max-width: ${({ theme }) => theme.mobile}) {
                    font-size: 0.9rem;
                    margin: 1rem;
                    padding: 0.5rem;
                }

                &:focus {
                    box-shadow: 0 0 25px 5px var(--darkestColor);
                }

                &::-webkit-search-cancel-button {
                    content: url("/images/close.svg");
                }
            }
        }
    }
`;

const SearchBar = ({ visibleSearchBar, value, queryResults, timer, onSearch, onSubmit, onClick }) => {
    return (
        <StyledSearchBar visibility={visibleSearchBar ? 1 : 0}>
            <div className="searchBar">
                <div className="searchInputContainer">
                    <form onSubmit={onSubmit}>
                        <input
                            className="searchInput"
                            type="search"
                            autoComplete="off"
                            placeholder="Search..."
                            value={value}
                            onChange={(event) => onSearch(event.currentTarget.value)}
                            id="searchInput"
                        />
                    </form>
                </div>
                <SearchResults queryResults={queryResults} searchQuery={value} timer={timer} visibility={visibleSearchBar} onClick={onClick} />
            </div>
        </StyledSearchBar>
    );
};

export default SearchBar;
