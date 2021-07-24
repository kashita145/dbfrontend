export default function authHeader() {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  if (username && token) {
    return {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
