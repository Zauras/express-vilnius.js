const removeQueryParam = (key: string, sourceURL: string): string => {
  let newUrl = sourceURL.split("?")[0];

  const queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";

  if (queryString !== "") {
    const paramList = queryString.split("&") || [];

    for (let i = paramList.length - 1; i >= 0; i -= 1) {
      const [param] = paramList[i].split("=");

      if (param === key) {
        paramList.splice(i, 1);
      }
    }

    if (paramList.length) newUrl = `${newUrl}?${paramList.join("&")}`;
  }

  return newUrl;
};

export { removeQueryParam };
