<?php

require_once __DIR__ . "/../config.php";

class SummaryFormatter
{
    public static function formatEmailContent(array $data, bool $withPwd, string $format = "text"): string
    {
        // Define newline character based on format
        $newline = $format === "html" ? "<br>" : "\n";

        // IDENTITY
        $content = "Name: {$data['title']} {$data['first_name']} {$data['last_name']}{$newline}";

        if (!empty($data['organization'])) {
            $content .= "Organization: {$data['organization']}{$newline}";
        }

        $content .= "Gender: {$data['gender']}{$newline}" .
                    "Date of Birth: {$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}{$newline}" .
                    "Email: {$data['email']}{$newline}" .
                    "Phone: {$data['phone']}{$newline}" .
                    "Address: {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}{$newline}";

        // WORKSHOPS
        if ($data['Spectroscopy Workshop'] === "true" || $data['Radio Workshop'] === "true") {
            $content .= "{$newline}Workshops:{$newline}";

            if ($data['Spectroscopy Workshop'] === "true") {
                $content .= "Spectroscopy Workshop: Yes{$newline}";
            }

            if ($data['Radio Workshop'] === "true") {
                $content .= "Radio Workshop: Yes{$newline}";
            }
        }

        // ARRIVAL & DEPARTURE
        $content .= "{$newline}Arrival & Departure:{$newline}" .
                    "Arrival Date: {$data['arrival_date']}{$newline}" .
                    "Arrival Time: {$data['arrival_hour']}:{$data['arrival_minute']}{$newline}" .
                    "Departure Date: {$data['departure_date']}{$newline}" .
                    "Departure Time: {$data['departure_hour']}:{$data['departure_minute']}{$newline}" .
                    "Travel Method: {$data['travelling']}{$newline}";

        if (!empty($data['travelling_details'])) {
            $content .= "Travel Details: {$data['travelling_details']}{$newline}";
        }

        // REGISTRATION TYPE
        $content .= "{$newline}Registration Type: {$data['registration_type']}{$newline}";

        // PAYMENT METHOD
        $content .= "Payment Method: {$data['payment_method']}{$newline}";

        // TALKS
        if (!empty($data['talks'])) {
            $content .= "{$newline}Talk Contributions:{$newline}";

            foreach ($data['talks'] as $talk) {
                $content .= "Title: {$talk['title']}{$newline}" .
                            "Authors: {$talk['authors']}{$newline}" .
                            "Abstract: {$talk['abstract']}{$newline}" .
                            "Session: {$talk['session']}{$newline}" .
                            "Duration: {$talk['duration']}{$newline}{$newline}";
            }
        }

        // POSTERS
        if (!empty($data['posters'])) {
            $content .= "{$newline}Poster Contributions:{$newline}";

            foreach ($data['posters'] as $poster) {
                $content .= "Title: {$poster['title']}{$newline}" .
                            "Authors: {$poster['authors']}{$newline}" .
                            "Abstract: {$poster['abstract']}{$newline}" .
                            "Session: {$poster['session']}{$newline}{$newline}";
            }
        }

        // EXTRAS
        $content .= "Extras:{$newline}" .
                    "Excursion: {$data['excursion']}{$newline}" .
                    "T-shirt: {$data['buy_tshirt']}{$newline}";

        if ($data['buy_tshirt'] === "yes") {
            $content .= "T-shirt Size: {$data['tshirt_size']}{$newline}";
        }

        // COMMENTS
        if (!empty($data['comments'])) {
            $content .= "{$newline}Comments: {$data['comments']}{$newline}";
        }

        // PASSWORD (If applicable)
        if ($withPwd) {
            $content .= "{$newline}Your Registration Password: {$data['password']}{$newline}";
            $content .= "Use this password to update your record (travelling details and/or contributions): ";

            if($format === 'html') {
              $content .= "<a href='https://imc" . getenv("YEAR") . ".imo.net/login'>on this page</a>{$newline}";
            } else {
              $content .= "on https://imc" . getenv("YEAR") . ".imo.net/login{$newline}";

            }
        }

        // Convert plain text to HTML if needed
        if ($format === "html") {
            return nl2br(htmlspecialchars($content, ENT_QUOTES, 'UTF-8'));
        }

        return $content;
    }
}
