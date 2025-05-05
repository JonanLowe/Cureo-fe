const EuroKey = import.meta.env.VITE_EUROPEANA_KEY;

import axios from "axios";

const scienceMuseum = axios.create({
  baseURL: "https://collection.sciencemuseumgroup.org.uk/",
});

const userAPI = axios.create({
  baseURL: "https://cureo-databse-api.onrender.com/api/",
});

export function getSMGroup(
  searchFilters = null,
  pageNumber = 0,
  resultsPerPage = 50,
  searchTerm = "*"
) {
  return scienceMuseum
    .get(
      `/search${searchFilters}?q=${searchTerm}&page[size]=${resultsPerPage}&page[number]=${pageNumber}`,
      {
        headers: { Accept: "application/json" },
      }
    )
    .then(({ data }) => {
      return data;
    })
    .catch(function (err) {
      console.error(err);
    });
}

export function getSingleItemSM(type, id) {
  return scienceMuseum
    .get(`/api/${type}/${id}`, {
      headers: { Accept: "application/json" },
    })
    .then(({ data }) => {
      return data.data;
    })
    .catch(function (err) {
      console.error(err);
    });
}

export function fetchEuropeanaGroup(
  searchFilters = "",
  pageNumber = 0,
  rows = 100,
  searchTerm = "*",
) {
  let startPoint = pageNumber * rows + 1;
  return fetch(
    `https://api.europeana.eu/record/v2/search.json?query=${searchTerm}${searchFilters}&rows=${rows}&start=${startPoint}&profile=facets&f.DATA_PROVIDER.facet.limit=9999`,
    {
      headers: {
        "X-Api-Key": EuroKey,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      return Promise.reject();
    }
    return response.json();
  });
}

export function getSingleItemEU(type, id) {
  return fetch(
    `https://api.europeana.eu/record/v2/${type}/${id}.json?`,
    {
      headers: {
        "X-Api-Key": EuroKey,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      return Promise.reject();
    }
    return response.json();
  });
}

export function getAllUsers() {
  return userAPI.get("/users").then(({ data }) => {
    return data;
  });
}

export function getCollections(user) {
  return userAPI.get(`/users/${user}/collections`).then(({ data }) => {
    return data;
  });
}

export function getSingleCollection(user, collectionName) {
  return userAPI
    .get(`/users/${user}/collections/${collectionName}`)
    .then((response) => {
      return response.data;
    });
}

export function addItemToCollection(user, collectionName, item) {
  return userAPI
    .patch(`/users/${user}/collections/${collectionName}/addItem`, {
      item,
    })
    .then((response) => {
      return response.body;
    });
}

export function removeItemFromCollection(user, collectionName, item) {
  return userAPI
    .patch(`/users/${user}/collections/${collectionName}/removeItem`, {
      item,
    })
    .then((response) => {
      return response;
    });
}

export function createCollection(user, collectionName) {
  return userAPI
    .patch(`/users/${user}/collections/createCollection`, {
      collectionName,
    })
    .then((response) => {
      return response;
    });
}