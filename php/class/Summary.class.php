<?php

require_once __DIR__ . "/../config.php";

class EmailFormatter
{
  public static function formatEmailContent(array $data): string
  {
    $year = getenv("YEAR");

    // IDENTITY
    $plainText = "Hello {$data['first_name']} {$data['last_name']},\n\n" .
      "Thank you for registering for IMC $year. Below is the summary of your registration:\n\n" .
      "Personal Information:\n" .
      "Name: {$data['title']} {$data['first_name']} {$data['last_name']}\n";

    if (!empty($data['organization'])) {
      $plainText .= "Organization: {$data['organization']}\n";
    }

    $plainText .= "Gender: {$data['gender']}\n" .
      "Date of Birth: {$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}\n" .
      "Email: {$data['email']}\n" .
      "Phone: {$data['phone']}\n" .
      "Address: {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}\n";


    // WORKSHOPS
    if ($data['Spectroscopy Workshop'] === "true" || $data['Radio Workshop'] === "true") {
      $plainText .= "\nWorkshops:\n";

      if ($data['Spectroscopy Workshop'] === "true") {
        $plainText .= "Spectroscopy Workshop: Yes\n";
      }

      if ($data['Radio Workshop'] === "true") {
        $plainText .= "Radio Workshop: Yes\n";
      }
    }

    // ARRIVAL & DEPARTURE
    $plainText .= "\nArrival & Departure:\n" .
      "Arrival Date: {$data['arrival_date']}\n" .
      "Arrival Time: {$data['arrival_hour']}:{$data['arrival_minute']}\n" .
      "Departure Date: {$data['departure_date']}\n" .
      "Departure Time: {$data['departure_hour']}:{$data['departure_minute']}\n" .
      "Travel Method: {$data['travelling']}\n";

    if ($data['travelling_details']) {
      $plainText .= "Travel Details: {$data['travelling_details']}\n";
    }

    // REGISTRATION TYPE 
    $plainText .= "\nRegistration Type: {$data['registration_type']}\n";

    // PAYMENT METHOD
    $plainText .= "Payment Method: {$data['payment_method']}\n";
    

    // TALKS
    if (!empty($data['talks'])) {
      $plainText .= "\nTalk Contributions:\n";

      foreach ($data['talks'] as $talk) {
        $plainText .= "Title: {$talk['title']}\nAuthors: {$talk['authors']}\nAbstract: {$talk['abstract']}\nSession: {$talk['session']}\nDuration: {$talk['duration']}\n\n";
      }
    }

    // POSTERS
    if (!empty($data['posters'])) {
      $plainText .= "\nPoster Contributions:\n";

      foreach ($data['posters'] as $poster) {
        $plainText .= "Title: {$poster['title']}\nAuthors: {$poster['authors']}\nAbstract: {$poster['abstract']}\nSession: {$poster['session']}\n\n";
      }
    }

    // EXTRAS
    $plainText .= "Extras:\n";
    $plainText .= "Excursion: {$data['excursion']}\n"; 
    $plainText .= "T-shirt: {$data['buy_tshirt']}\n"; 
    $data['buy_tshirt'] === "yes" ? $plainText .= "T-shirt Size: {$data['tshirt_size']}\n" : null;

    // COMMENTS
    if ($data['comments']) {
      $plainText .= "\nComments: {$data['comments']}\n";
    }


    $plainText .= "\nYour Registration Password: {$data['password']}\n";

    return $plainText;
  }
}
