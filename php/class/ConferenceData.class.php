<?php

class ConferenceData
{
  private static $conferenceData = null;
  private static $filePath = __DIR__ . "/../../imc/src/data/conference-data.json"; // Adjusted path

  /**
   * Load conference data from JSON file
   */
  private static function loadData()
  {
    if (self::$conferenceData === null) {
      if (!file_exists(self::$filePath)) {
        throw new Exception("Conference data file not found: " . self::$filePath);
      }

      $jsonContent = file_get_contents(self::$filePath);
      self::$conferenceData = json_decode($jsonContent, true);

      if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Error decoding conference data JSON: " . json_last_error_msg());
      }
    }
  }

  /**
   * Get the entire conference data
   */
  public static function getAllData()
  {
    self::loadData();
    return self::$conferenceData;
  }

  /**
   * Get a specific conference detail
   */
  public static function get($key, $default = null)
  {
    self::loadData();
    return self::$conferenceData[$key] ?? $default;
  }


  /**
   * Get email contact details for a specific workshop by title
   */
  public static function getWorkshopEmailTo(string $workshopTitle)
  {
    self::loadData();

    if (!isset(self::$conferenceData['workshops']) || !is_array(self::$conferenceData['workshops'])) {
      return null;
    }

    foreach (self::$conferenceData['workshops'] as $workshop) {
      if (isset($workshop['title']) && strtolower($workshop['title']) === strtolower($workshopTitle)) {
        return $workshop['email_to'] ?? null;
      }
    }

    return null; // Return null if workshop not found
  }
}
