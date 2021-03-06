import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";

import { Main } from "../App";
import { StyledContentGroupPage } from "./albums";
import ContentGroup from "./common/contentGroup";
import { getAlbums } from "./../services/albumService";
import LoadingScreen from "./loadingScreen";

const NewReleases = () => {
    const [newReleases, setNewReleases] = useState(null);

    useEffect(() => {
        (async () => {
            let { data: albums } = await getAlbums();
            albums = albums.filter((a) => moment(a.release_date) < moment());
            setNewReleases(albums);
        })();
    }, []);

    return newReleases ? (
        <Main>
            <Helmet>
                <title>New Releases | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
                <ContentGroup
                    title="New Releases"
                    content={newReleases}
                    contentType="albums"
                    isPaginationEnabled={true}
                    contentPageSize={50}
                    isSortingEnabled={true}
                    className="contentGroup"
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    ) : (
        <LoadingScreen />
    );
};

export default NewReleases;
