import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import InputRecipe from '../inputRecipe/InputRecipe';
import OutputRecipe from '../outputRecipe/OutputRecipe';

export interface RecipeOutput {
  itemName: string;
  unit: 'Cup' | 'Tablespoon' | 'Teaspoon';
  amount: number | string;
}

const Dashboard = () => {
  const [recipeOutput, setRecipeOutput] = useState<
    RecipeOutput[] | undefined
  >();

  return (
    <Grid container justify='center' alignContent='center' spacing={3}>
      <Grid item xs={12} lg={!recipeOutput ? 10 : 6}>
        <InputRecipe setRecipeOutput={setRecipeOutput} />
      </Grid>
      {recipeOutput ? (
        <Grid item xs={12} lg={6}>
          <OutputRecipe recipeOutput={recipeOutput} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Dashboard;
