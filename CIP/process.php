<?php
header('Content-Type: application/json');
$_POST = json_decode(file_get_contents('php://input'), true);
print_r($_REQUEST);
$output = [
  'name' => $_POST['name'],
  'description' => $_POST['description'],
];

echo json_encode($output);
