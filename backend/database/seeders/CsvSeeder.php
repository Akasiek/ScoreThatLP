<?php

namespace Database\Seeders;

use Exception;
use Illuminate\Database\Seeder;

abstract class CsvSeeder extends Seeder
{
    protected string $fileName;
    protected string $model;

    /**
     * @throws Exception
     */
    public function run(): void
    {
        $this->seedFromCsv();
    }

    abstract protected function getMapping(): array;

    /**
     * @return array { string => function(string) }
     */
    abstract protected function specialValueMappings(): array;

    /**
     * @throws Exception
     */
    private function loadCsvFile(): array
    {
        if (!file_exists(base_path($this->fileName))) {
            throw new Exception('File not found');
        }

        $file = fopen(base_path($this->fileName), 'r');

        $data = [];
        $headerRow = true;
        while (($row = fgetcsv($file, null, ';')) !== false) {
            if ($headerRow) {
                $headerRow = false;
                continue;
            }

            $data[] = $row;
        }
        fclose($file);

        return $data;
    }

    /**
     * @throws Exception
     */
    private function mapCsvData(): array
    {
        $mappedData = [];
        $data = $this->loadCsvFile();
        $mapping = $this->getMapping();

        foreach ($data as $rowIndex => $row) {
            foreach ($mapping as $colName => $colIndex) {
                $mappedData[$rowIndex][$colName] = $row[$colIndex];
            }
        }

        return $mappedData;
    }

    private function mapSpecialValues($data): array
    {
        $specialValueMappings = $this->specialValueMappings();

        foreach ($data as $rowIndex => $row) {
            foreach ($row as $colName => $colValue) {
                if (array_key_exists($colName, $specialValueMappings)) {
                    $func = $specialValueMappings[$colName];
                    $data[$rowIndex][$colName] = call_user_func($func, $colValue);
                }
            }
        }

        return $data;
    }

    /**
     * @throws Exception
     */
    private function seedFromCsv(): void
    {
        $data = $this->mapCsvData();
        $data = $this->mapSpecialValues($data);

        foreach ($data as $row) {
            if (!$this->model::updateOrCreate($row)) {
                throw new Exception('Cannot create seeded model');
            }
        }

    }
}
