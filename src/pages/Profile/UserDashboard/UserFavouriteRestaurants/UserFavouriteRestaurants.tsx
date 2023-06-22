import { useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import SingleFavouriteRestaurant from './SingleFavouriteRestaurant/SingleFavouriteRestaurant';
import TitleWithSubtitle from '../../../../components/TitleWithSubtitle/TitleWithSubtitle';
import SingleFavouriteRestaurantLoading from './SingleFavouriteRestaurant/SingleFavouriteRestaurantLoading/SingleFavouriteRestaurantLoading';
import { UserFavouriteRestaurantsProps } from '../../../../types/types';

export default function UserFavouriteRestaurants({
  loading,
  favRestaurants,
  setFavRestaurants,
}: UserFavouriteRestaurantsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favRestaurants.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <TitleWithSubtitle
        title='Ulubione restauracje'
        subtitle='Przeglądaj i zarządzaj swoimi ulubionymi restauracjami. Dodawaj, usuwaj lub edytuj restauracje, które lubisz najbardziej.'
      ></TitleWithSubtitle>
      {loading ? (
        <SingleFavouriteRestaurantLoading></SingleFavouriteRestaurantLoading>
      ) : (
        <>
          {favRestaurants.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
              <Typography textAlign='center' variant='body1'>
                Brak ulubionych restauracji
              </Typography>
            </Box>
          ) : (
            currentItems.map((item, index) => (
              <SingleFavouriteRestaurant
                key={item.restaurantId}
                index={index}
                id={item.restaurantId}
                setFavRestaurants={setFavRestaurants}
                favRestaurants={favRestaurants}
                {...item}
              />
            ))
          )}

          {favRestaurants.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
              <Pagination
                count={Math.ceil(favRestaurants.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
}
