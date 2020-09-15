import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Divider,
  Chip,
  Hidden,
  Fade,
  Menu,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Add, Close, MoreVert, PieChart, Remove } from '@material-ui/icons';
import React, { useState } from 'react';
import calculator from '../../helper/calculator';
import { RecipeOutput } from '../dashboard/Dashboard';
import CalculateIcon from '../../icons/calculateicon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardWidth: {
      minWidth: 250,
    },
  })
);

interface RecipeInput {
  itemName: string;
  amount: number;
  fractionalAmount: string;
  enableFractionalAmount: boolean;
  unit: string;
  hovered: boolean;
}

interface Props {
  setRecipeOutput: React.Dispatch<
    React.SetStateAction<RecipeOutput[] | undefined>
  >;
}

const InputRecipe = (props: Props) => {
  const classes = useStyles();
  const { setRecipeOutput } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputMultipler, setInputMultipler] = useState<number>(2);
  const [recipeInput, setRecipeInput] = useState<RecipeInput[]>([
    {
      itemName: '',
      amount: 0,
      unit: 'Cup',
      hovered: false,
      fractionalAmount: '',
      enableFractionalAmount: false,
    },
  ]);

  const addItem = () => {
    setRecipeInput((prevState) => [
      ...prevState,
      {
        itemName: '',
        amount: 0,
        unit: 'Cup',
        hovered: false,
        fractionalAmount: '',
        enableFractionalAmount: false,
      },
    ]);
  };

  const handleVertMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
  };

  const handleVertMenuClose = () => {
    setAnchorEl(null);
  };

  const removeItem = (index: number) => {
    const tempList = [...recipeInput];
    tempList.splice(index, 1);

    setRecipeInput(tempList);
    handleVertMenuClose();
  };

  const increaseMulti = () => {
    setInputMultipler((preState) => preState + 1);
  };

  const decreaseMulti = () => {
    setInputMultipler((preState) => preState - 1);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    method: string
  ) => {
    const tempList = [...recipeInput];

    switch (method) {
      case 'unit':
        tempList[index].unit = event.target.value;
        break;
      case 'item':
        tempList[index].itemName = event.target.value;
        break;
      case 'amount':
        tempList[index].amount = Number(event.target.value);
        break;
      case 'fractionalAmount':
        tempList[index].fractionalAmount = event.target.value;
    }

    setRecipeInput(tempList);
  };

  const handleHoverOn = (index: number) => {
    const tempList = [...recipeInput];

    tempList[index].hovered = true;

    setRecipeInput(tempList);
  };

  const handleHoverOff = (index: number) => {
    const tempList = [...recipeInput];

    tempList[index].hovered = false;

    setRecipeInput(tempList);
  };

  const handleFractionalAmount = (index: number) => {
    console.log(index);

    const tempList = [...recipeInput];

    tempList[index].enableFractionalAmount = !tempList[index]
      .enableFractionalAmount;

    if (tempList[index].enableFractionalAmount === false) {
      tempList[index].fractionalAmount = '';
    }

    setRecipeInput(tempList);

    handleVertMenuClose();
  };

  const calculate = () => {
    const test: any = calculator({
      [inputMultipler > 0 ? 'double' : 'half']:
        inputMultipler === 0 ? 1 : Math.abs(inputMultipler),
      data: recipeInput,
    });

    setRecipeOutput(test);

    console.log(test);
  };

  const measurementUnits = [
    {
      value: 'Cup',
      label: 'C',
    },
    {
      value: 'Tablespoon',
      label: 'Tbsp',
    },
    {
      value: 'Teaspoon',
      label: 'Tsp',
    },
    {
      value: 'Ounce',
      label: 'Oz',
    },
    {
      value: 'Pounds',
      label: 'lbs',
    },
  ];

  return (
    <>
      <Card className={classes.cardWidth}>
        <CardHeader
          title={
            <>
              {'Input Recipe'} {inputMultipler > 0 ? '*' : '/'}{' '}
              <Tooltip
                title={
                  inputMultipler > 0
                    ? `Increases the recipe by ${inputMultipler}`
                    : `Reduces the recipe by ${Math.abs(inputMultipler)}`
                }
              >
                <Chip label={Math.abs(inputMultipler)} />
              </Tooltip>
            </>
          }
          action={
            <>
              <IconButton onClick={decreaseMulti}>
                <Remove />
              </IconButton>
              <IconButton onClick={increaseMulti}>
                <Add />
              </IconButton>
            </>
          }
        />
        <Divider />
        <CardContent>
          <List>
            {recipeInput.map((recipeItem, index) => (
              <ListItem
                key={index}
                onMouseEnter={() => handleHoverOn(index)}
                onMouseLeave={() => handleHoverOff(index)}
              >
                <Grid container spacing={1}>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={10} lg={4}>
                      <TextField
                        id='recipe-name'
                        placeholder='Rice'
                        value={recipeItem.itemName}
                        label='Ingredient'
                        variant='outlined'
                        onChange={(event) => handleChange(event, index, 'item')}
                      />
                    </Grid>
                    <Hidden lgUp>
                      <Grid item xs={2}>
                        <Tooltip title='Fractional Input'>
                          <IconButton
                            onClick={(event) =>
                              handleVertMenuOpen(event, index)
                            }
                          >
                            <MoreVert />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Hidden>
                    <Grid item xs={6} lg={2}>
                      <TextField
                        id='recipe-amount'
                        value={recipeItem.amount}
                        type={'number'}
                        label='Portion'
                        variant='outlined'
                        onChange={(event) =>
                          handleChange(event, index, 'amount')
                        }
                      />
                    </Grid>

                    {recipeItem.enableFractionalAmount ? (
                      <Fade in={recipeItem.enableFractionalAmount}>
                        <Grid item xs={6} lg={2}>
                          <TextField
                            id='recipe-fractionalAmount'
                            value={recipeItem.fractionalAmount}
                            placeholder='1/4'
                            label='Fractional Portion'
                            variant='outlined'
                            onChange={(event) =>
                              handleChange(event, index, 'fractionalAmount')
                            }
                          />
                        </Grid>
                      </Fade>
                    ) : null}
                    <Grid item xs={6} lg={2}>
                      <TextField
                        variant='outlined'
                        id='recipe-unit'
                        label='unit'
                        select
                        value={recipeItem.unit}
                        onChange={(event) => handleChange(event, index, 'unit')}
                      >
                        {measurementUnits.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Hidden mdDown>
                      <Grid item lg={2}>
                        <div style={{ minWidth: '100px', display: 'flex' }}>
                          {recipeItem.hovered ? (
                            <Tooltip title='Fractional Input'>
                              <IconButton
                                onClick={() => handleFractionalAmount(index)}
                              >
                                <PieChart />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                          {recipeItem.hovered ? (
                            <Tooltip title='Remove Ingredient'>
                              <IconButton onClick={() => removeItem(index)}>
                                <Close />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                        </div>
                      </Grid>
                    </Hidden>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <Button startIcon={<CalculateIcon />} onClick={calculate}>
            Calculate
          </Button>
          <Button startIcon={<Add />} onClick={addItem}>
            Add Ingredient
          </Button>
        </CardActions>
      </Card>
      <Menu
        id='vert-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleVertMenuClose}
      >
        <MenuItem onClick={() => handleFractionalAmount(currentIndex)}>
          Fractional Portion
        </MenuItem>
        <MenuItem onClick={() => removeItem(currentIndex)}>
          Remove Ingredient
        </MenuItem>
      </Menu>
    </>
  );
};

export default InputRecipe;
