<?php
function authorize($mySQL)
{
  $headers = getallheaders();

  if (isset($headers['Authorization'])) {
    $authHeader = $headers['Authorization'];
  } else {
    http_response_code(401);
    echo json_encode(['error' => 'Authorization header missing']);
    exit;
  }

  if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $bearerToken = $matches[1];
  } else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid authorization format']);
    exit;
  }

  $sql = "SELECT user_id, access_token_expiry FROM session WHERE access_token = '$bearerToken'";
  $result = $mySQL->query($sql)->fetch_object();

  if (!$result) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid access token']);
    exit;
  }

  $currentDateTime = new DateTime();
  $accessTokenExpiry = new DateTime($result->access_token_expiry);

  if ($currentDateTime > $accessTokenExpiry) {
    http_response_code(401);
    echo json_encode(['error' => 'Access token expired']);
    exit;
  }

  return $result->user_id;
}
