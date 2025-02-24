<?php

require_once __DIR__ . "/../config.php";

class SummaryFormatter
{
    public static function formatEmailContent(array $data, bool $withPwd): string
    {
        $content = "<h2>Registration Summary</h2>";

        // IDENTITY
        $content .= "<p><strong>Name:</strong> {$data['title']} {$data['first_name']} {$data['last_name']}</p>";

        if (!empty($data['organization'])) {
            $content .= "<p><strong>Organization:</strong> {$data['organization']}</p>";
        }

        $content .= "
            <p><strong>Gender:</strong> {$data['gender']}</p>
            <p><strong>Date of Birth:</strong> {$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}</p>
            <p><strong>Email:</strong> {$data['email']}</p>
            <p><strong>Phone:</strong> {$data['phone']}</p>
            <p><strong>Address:</strong> {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}</p>
        ";

        // WORKSHOPS
        if ($data['Spectroscopy Workshop'] === "true" || $data['Radio Workshop'] === "true") {
            $content .= "<h3>Workshops</h3><ul>";

            if ($data['Spectroscopy Workshop'] === "true") {
                $content .= "<li>Spectroscopy Workshop: Yes</li>";
            }

            if ($data['Radio Workshop'] === "true") {
                $content .= "<li>Radio Workshop: Yes</li>";
            }

            $content .= "</ul>";
        }

        // ARRIVAL & DEPARTURE
        $content .= "
            <h3>Arrival & Departure</h3>
            <p><strong>Arrival Date:</strong> {$data['arrival_date']}</p>
            <p><strong>Arrival Time:</strong> {$data['arrival_hour']}:{$data['arrival_minute']}</p>
            <p><strong>Departure Date:</strong> {$data['departure_date']}</p>
            <p><strong>Departure Time:</strong> {$data['departure_hour']}:{$data['departure_minute']}</p>
            <p><strong>Travel Method:</strong> {$data['travelling']}</p>
        ";

        if (!empty($data['travelling_details'])) {
            $content .= "<p><strong>Travel Details:</strong> {$data['travelling_details']}</p>";
        }

        // REGISTRATION TYPE & PAYMENT METHOD
        $content .= "
            <h3>Registration & Payment</h3>
            <p><strong>Registration Type:</strong> {$data['registration_type']}</p>
            <p><strong>Payment Method:</strong> {$data['payment_method']}</p>
        ";

        // TALKS
        if (!empty($data['talks'])) {
            $content .= "<h3>Talk Contributions</h3>";

            foreach ($data['talks'] as $talk) {
                $content .= "
                    <p><strong>Title:</strong> {$talk['title']}</p>
                    <p><strong>Authors:</strong> {$talk['authors']}</p>
                    <p><strong>Abstract:</strong> {$talk['abstract']}</p>
                    <p><strong>Session:</strong> {$talk['session']}</p>
                    <p><strong>Duration:</strong> {$talk['duration']}</p>
                    <hr>
                ";
            }
        }

        // POSTERS
        if (!empty($data['posters'])) {
            $content .= "<h3>Poster Contributions</h3>";

            foreach ($data['posters'] as $poster) {
                $content .= "
                    <p><strong>Title:</strong> {$poster['title']}</p>
                    <p><strong>Authors:</strong> {$poster['authors']}</p>
                    <p><strong>Abstract:</strong> {$poster['abstract']}</p>
                    <p><strong>Session:</strong> {$poster['session']}</p>
                    <hr>
                ";
            }
        }

        // EXTRAS
        $content .= "
            <h3>Extras</h3>
            <p><strong>Excursion:</strong> {$data['excursion']}</p>
            <p><strong>T-shirt:</strong> {$data['buy_tshirt']}</p>
        ";

        if ($data['buy_tshirt'] === "yes") {
            $content .= "<p><strong>T-shirt Size:</strong> {$data['tshirt_size']}</p>";
        }

        // COMMENTS
        if (!empty($data['comments'])) {
            $content .= "<h3>Comments</h3><p>{$data['comments']}</p>";
        }

        // PASSWORD (If applicable)
        if ($withPwd) {
            $year = getenv("YEAR");
            $loginLink = "https://imc{$year}.imo.net/login";
            $content .= "
                <h3>Your Registration Password</h3>
                <p><strong>Password:</strong> {$data['password']}</p>
                <p>Use this password to update your record (travel details and/or contributions): 
                <a href='{$loginLink}'>on this page</a></p>
            ";
        }

        return $content;
    }
}
