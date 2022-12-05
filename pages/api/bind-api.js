export default function handler(req, res) {
  const getData = async () => {
    const response = await fetch(
      `https://bing-news-search1.p.rapidapi.com/news/search?q="bitcoin"`,
      {
        method: "GET",
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "b1f05b99c9msh84c7f8928e12780p194411jsn85165cd63758",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
          category: "Cryptocurrency",
        },
      }
    );
    const data = await response.json();

    res.status(200).json({data});
  };
  getData();
}
