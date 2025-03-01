<?php

require_once __DIR__ . "/../config.php";

class SummaryFormatter
{

    public static function getRegistrationDescription($registrationTypes, $registrationTypeId) {
        $filtered = array_filter($registrationTypes, function($type) use ($registrationTypeId) {
            return $type['id'] == $registrationTypeId;
        });
    
        return !empty($filtered) ? reset($filtered)['description'] : "Description not found";
    }
     
    public static function formatEmailContent(array $data, array $workshops, array $paymentMethods, array $registrations_types, bool $withPwd): string
    {
        $content = "";

        // PASSWORD (If applicable)
        if ($withPwd) {
            $year = getenv("YEAR");
            $loginLink = "https://imc{$year}.imo.net/login";
            $content .= "
                 Your Registration Password</br>
                <b>Password:</b> {$data['password']}<br>
                 Use this password to update your record (travel details and/or contributions): <a href='{$loginLink}'>on this page</a><br><br>
        ";
        }

        // IDENTITY
        $content .= "<b>Name:</b> {$data['title']} {$data['first_name']} {$data['last_name']}<br>";

        if (!empty($data['organization'])) {
            $content .= "<b>Organization:</b> {$data['organization']}<br>";
        }

        // TODO: NO ADDRESS FOR ONLINE 
        $content .= "
            <b>Gender:</b> {$data['gender']}<br>
            <b>Date of Birth:</b> {$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}<br>
            <b>Email:</b> {$data['email']}<br>
            <b>Phone:</b> {$data['phone']}<br>
            <b>Address:</b> {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}<br>
        ";

        // WORKSHOPS (Dynamically fetched from DB)
        $workshopList = [];
        foreach ($workshops as $workshop) {
            $workshopTitle = $workshop['title']; 
            if (!empty($data['workshops'][$workshopTitle]) && $data['workshops'][$workshopTitle] === "true") {
                $workshopList[] = "<b>{$workshopTitle}:</b> Yes";
            }
        }

        if (!empty($workshopList)) {
            $content .= "<br><b>Workshops</b><br>" . implode("<br>", $workshopList) . "<br>";
        }

        // ARRIVAL & DEPARTURE
        $content .= "
            <br><b>Arrival & Departure</b><br>
            <b>Arrival :</b> {$data['arrival_date']} {$data['arrival_hour']}:{$data['arrival_minute']}<br>
            <b>Departure :</b> {$data['departure_date']} {$data['departure_hour']}:{$data['departure_minute']}<br> 
            <b>Travel Method:</b> {$data['travelling']}<br>
        ";

        if (!empty($data['travelling_details'])) {
            $content .= "<b>Travel Details:</b> {$data['travelling_details']}<br>";
        }

         
        $registrationDescription = self::getRegistrationDescription($registrations_types, $data['registration_type_id']);
 
        // Get the payment method name from the paymentMethods array using the ID
        $paymentMethodName = isset($paymentMethods[$data['payment_method_id']])
            ? $paymentMethods[$data['payment_method_id']]
            : "Unknown";
  
        
        $content .= "
            <br><b>Registration & Payment</b><br>
            <b>Registration Type:</b> {$registrationDescription}<br>
            <b>Payment Method:</b> {$paymentMethodName['method']}<br>
        "; 


        // TALKS
        if (!empty($data['talks'])) {
            $content .= "<br><b>Talk Contribution(s)</b><br>";

            foreach ($data['talks'] as $talk) {
                $content .= "
                    <b>Title:</b> {$talk['title']}<br>
                    <b>Authors:</b> {$talk['authors']}<br>
                    <b>Abstract:</b> {$talk['abstract']}<br>
                    <b>Session:</b> {$talk['session']}<br>
                    <b>Duration:</b> {$talk['duration']}<br>
                ";
            }
        }

        // POSTERS
        if (!empty($data['posters'])) {
            $content .= "<br><b>Poster Contribution(s)</b><br>";

            foreach ($data['posters'] as $poster) {
                $content .= "
                    <b>Title:</b> {$poster['title']}<br>
                    <b>Authors:</b> {$poster['authors']}<br>
                    <b>Abstract:</b> {$poster['abstract']}<br>
                    <b>Session:</b> {$poster['session']}<br>
                ";
            }
        }

        // EXTRAS
        $content .= "
            <br><b>Extras</b><br>
            <b>Excursion:</b> {$data['excursion']}<br>
            <b>T-shirt:</b> {$data['buy_tshirt']}<br>
        ";

        if ($data['buy_tshirt'] === "yes") {
            $content .= "<b>T-shirt Size:</b> {$data['tshirt_size']}<br>";
        }

        // COMMENTS
        if (!empty($data['comments'])) {
            $content .= "<br><b>Comments</b><br>{$data['comments']}<br>";
        }


        var_dump($content);

        return $content;
    }
}
