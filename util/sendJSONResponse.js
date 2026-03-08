//on the principle of DRY (Don't Repeat Yourself !)
export default function sendJSONResponse(res, stat, obj) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.statusCode = stat;
  res.end(JSON.stringify(obj));
  return;
}
