import moment from "moment";
import _ from "lodash";

export default function sort(content, contentType, sorting) {
    if (contentType === "albums") {
        switch (sorting?.value) {
            case "newest":
                content = _.orderBy(content, (o) => moment(o.release_date), ["desc"]);
                break;

            case "oldest":
                content = _.orderBy(content, (o) => moment(o.release_date), ["asc"]);
                break;

            case "name-asc":
                content = _.orderBy(content, (o) => o.title.toLowerCase(), ["asc"]);
                break;

            case "name-desc":
                content = _.orderBy(content, (o) => o.title.toLowerCase(), ["desc"]);
                break;

            case "highest-score":
                content = _.orderBy(content, (o) => o.overall_score || 0, ["desc"]);
                break;

            case "lowest-score":
                content = _.orderBy(content, (o) => o.overall_score, ["asc"]);
                break;

            default:
                content = _.orderBy(content, (o) => o.release_date, ["desc"]);
                break;
        }
    }
    if (contentType === "reviews") {
        switch (sorting?.value) {
            case "newest":
                content = _.orderBy(content, (o) => moment(o.updated_at), ["desc"]);
                break;

            case "oldest":
                content = _.orderBy(content, (o) => moment(o.updated_at), ["asc"]);
                break;

            case "highest-score":
                content = _.orderBy(content, (o) => o.rating, ["desc"]);
                break;

            case "lowest-score":
                content = _.orderBy(content, (o) => o.rating, ["asc"]);
                break;

            case "most-liked":
                content = _.orderBy(content, (o) => o.likes, ["desc"]);
                break;

            case "least-liked":
                content = _.orderBy(content, (o) => o.likes, ["asc"]);
                break;

            default:
                content = _.orderBy(content, (o) => moment(o.updated_at), ["desc"]);
                break;
        }
    }
    if (contentType === "artists") {
        switch (sorting?.value) {
            case "name-asc":
                content = _.orderBy(content, (o) => o.name.toLowerCase(), ["asc"]);
                break;

            case "name-desc":
                content = _.orderBy(content, (o) => o.name.toLowerCase(), ["desc"]);
                break;

            case "highest-avg-score":
                content = _.orderBy(content, (o) => o.average_score || 0, ["desc"]);
                break;

            case "lowest-avg-score":
                content = _.orderBy(content, (o) => o.average_score, ["asc"]);
                break;

            default:
                content = _.orderBy(content, (o) => o.name, ["asc"]);
                break;
        }
    }
    if (contentType === "ratingAlbums") {
        switch (sorting?.value) {
            case "newest":
                content = _.orderBy(content, (o) => moment(o.album.release_date), ["desc"]);
                break;

            case "oldest":
                content = _.orderBy(content, (o) => moment(o.album.release_date), ["asc"]);
                break;

            case "name-asc":
                content = _.orderBy(content, (o) => o.album.title.toLowerCase(), ["asc"]);
                break;

            case "name-desc":
                content = _.orderBy(content, (o) => o.album.title.toLowerCase(), ["desc"]);
                break;

            case "highest-user-score":
                content = _.orderBy(content, (o) => o.rating, ["desc"]);
                break;

            case "lowest-user-score":
                content = _.orderBy(content, (o) => o.rating, ["asc"]);
                break;

            case "latest-rating":
                content = _.orderBy(content, (o) => moment(o.updated_at), ["desc"]);
                break;

            case "oldest-rating":
                content = _.orderBy(content, (o) => moment(o.updated_at), ["asc"]);
                break;

            default:
                content = _.orderBy(content, (o) => moment(o.updated_at), ["desc"]);
                break;
        }
    }
    return content;
}

export function getSortOptions(contentType) {
    if (contentType === "albums") {
        return [
            { value: "newest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
            { value: "name-asc", label: "Name ascending" },
            { value: "name-desc", label: "Name descending" },
            { value: "highest-score", label: "Highest score" },
            { value: "lowest-score", label: "Lowest score" },
        ];
    }

    if (contentType === "artists") {
        return [
            // { value: "popularity", label: "By Popularity" },
            { value: "name-asc", label: "Name ascending" },
            { value: "name-desc", label: "Name descending" },
            { value: "highest-avg-score", label: "Highest average score" },
            { value: "lowest-avg-score", label: "Lowest average score" },
        ];
    }

    if (contentType === "reviews") {
        return [
            { value: "newest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
            { value: "highest-score", label: "Highest score" },
            { value: "lowest-score", label: "Lowest score" },
            // { value: "most-liked", label: "Most liked" },
            // { value: "least-liked", label: "Least liked" },
        ];
    }

    if (contentType === "ratingAlbums") {
        return [
            { value: "latest-rating", label: "Latest rating" },
            { value: "oldest-rating", label: "Oldest rating" },
            { value: "highest-user-score", label: "Highest user score" },
            { value: "lowest-user-score", label: "Lowest user score" },
            { value: "newest", label: "Newest album" },
            { value: "oldest", label: "Oldest album" },
            { value: "name-asc", label: "Name ascending" },
            { value: "name-desc", label: "Name descending" },
        ];
    }
    return null;
}
