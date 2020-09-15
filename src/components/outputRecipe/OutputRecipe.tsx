import MUIDataTable from 'mui-datatables';
import React from 'react';
import { RecipeOutput } from '../dashboard/Dashboard';

interface Props {
  recipeOutput: RecipeOutput[];
}

const OutputRecipe = (props: Props) => {
  const { recipeOutput } = props;
  const columns = [
    {
      label: 'Ingredient',
      name: 'itemName',
    },
    {
      label: 'Portion',
      name: 'amount',
    },
    {
      label: 'Unit',
      name: 'unit',
    },
  ];

  const options = {
    checkboxes: false,
    fixedSelectColumn: false,
    viewColumns: false,
    elevation: 1,
    rowsPerPage: 100,
  };

  return (
    <MUIDataTable
      title={'Recipe Output'}
      data={recipeOutput}
      columns={columns}
      options={options}
    />
  );
};

export default OutputRecipe;
