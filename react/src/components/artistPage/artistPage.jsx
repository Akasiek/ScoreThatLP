import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ArtistPageHeader from "./artistPageHeader";
import { Main } from "../../App";
import ArtistPageContentContainer from "./artistPageContentContainer";
import { getArtist } from "../../services/artistService";
import LoadingScreen from "./../loadingScreen";

const StyledArtistPage = styled.div``;

const ArtistPage = ({ match, history }) => {
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { data: artist } = await getArtist(match.params.slug);
                setArtist(artist);
            } catch (ex) {
                if (ex.response && ex.response.status === 404) {
                    history.push("/not-found");
                }
            }
        })();
    }, [match.params.slug, history]);

    return artist !== null ? (
        <StyledArtistPage>
            <Helmet>
                <title>{`${artist.name} | ScoreThatLP`}</title>
            </Helmet>

            <ArtistPageHeader artist={artist} />

            <Main>
                <ArtistPageContentContainer artist={artist} />
            </Main>
        </StyledArtistPage>
    ) : (
        <LoadingScreen />
    );
};

export default ArtistPage;
