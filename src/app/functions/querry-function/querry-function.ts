export function buildQuery(
  page: number,
  pageSize: number,
  sortField?: string,
  sortOrder?: number,
  filters?: { [key: string]: any }
): string {
  let query = `?_page=${page / pageSize + 1}&_limit=${pageSize}`;
  if (sortField) {
    query += `&_sort=${sortField}&_order=${sortOrder === 1 ? 'asc' : 'desc'}`;
  }
  if (filters) {
    Object.keys(filters).forEach((key) => {
      const filter = filters[key];
      if (filter.value) {
        switch (filter.matchMode) {
          case 'startsWith':
          case 'contains':
          case 'endsWith':
            query += `&${key}_like=${filter.value}`;
            break;
          case 'equals':
            query += `&${key}=${filter.value}`;
            break;
          case 'notEquals':
            query += `&${key}_ne=${filter.value}`;
            break;
          default:
            break;
        }
      }
    });
  }
  return query;
}
