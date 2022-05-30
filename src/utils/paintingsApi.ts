import { ILocation, IAuthor, IPainting } from '../types/types';

import instance from './axiosInstance';

export type GetPaintingsQueryParams = {
  q?: string,
  authorId?: number,
  locationId?: number,
  created_gte?: string | null,
  created_lte?: string | null,
  _page?: number,
  _limit?: number
};

export const paintingsApi = {

  async fetchPaintings({
    q, authorId, locationId, created_gte, created_lte, _page, _limit = 12,
  }:GetPaintingsQueryParams) {
    const { data, headers } = await instance.get<IPainting[]>('paintings', {
      params: {
        q, authorId, locationId, created_gte, created_lte, _page, _limit,
      },
    });
    const totalCounts = headers?.['x-total-count'] || 0;

    return { data, totalCounts };
  },
  async fetchAuthors() {
    const { data } = await instance.get<IAuthor[]>('authors');
    return data;
  },
  async fetchLocations() {
    const { data } = await instance.get<ILocation[]>('locations');
    return data;
  },

};
