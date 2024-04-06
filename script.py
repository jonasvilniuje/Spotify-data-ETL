import csv

def find_rows_with_multiple_values(csv_file, delimiter=',', array_field_index=-1, encoding='utf-8'):
    rows_with_multiple_values = []
    with open(csv_file, 'r', newline='', encoding=encoding) as csvfile:
        reader = csv.reader(csvfile, delimiter=delimiter)
        header = next(reader)  # Skip header
        for row_index, row in enumerate(reader, start=2):  # Start from 2 because 1 is the header row
            if array_field_index < 0:
                array_field_index = len(row) + array_field_index  # Negative index support
            array_field = row[array_field_index]
            if array_field.startswith('[') and array_field.endswith(']'):
                values = array_field[1:-1].split(',')
                if len(values) > 1:
                    rows_with_multiple_values.append((row_index, row))
    
    return rows_with_multiple_values

# Usage example
csv_file_path = 'data/tracks.csv'
rows_with_multiple_values = find_rows_with_multiple_values(csv_file_path)

if rows_with_multiple_values:
    print("Rows with multiple values in the array:")
    for row_index, row in rows_with_multiple_values:
        print(f"Row {row_index}: {row}")
else:
    print("No rows with multiple values in the array found.")
