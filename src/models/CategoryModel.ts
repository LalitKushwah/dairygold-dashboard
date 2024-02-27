export interface Category {
  _id: string;
  name: string;
  type: string;
  lastUpdatedAt: number;
  parentCategoryId: string;
  label: string;
  value: string;
  key?: number
}

export const getEmptyCategoryStructure = (): Category => {
  return {
    _id: 'string',
    name: 'string',
    type: 'string',
    lastUpdatedAt: 0,
    parentCategoryId: 'string',
    label: '',
    value: '',
  };
};
