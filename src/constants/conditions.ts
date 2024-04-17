export const trackConditions = [
    {
      columnName: 'name',
      predicate: (value: string) => value !== ''
    },
    {
      columnName: 'duration_ms',
      predicate: (value: string) => parseInt(value, 10) >= 60000
    }
  ];
  