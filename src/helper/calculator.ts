interface RecipeItem {
  amount: number;
  enableFractionalAmount: boolean;
  fractionalAmount: string;
  hovered: boolean;
  itemName: string;
  unit: string;
}

interface Props {
  double?: number;
  half?: number;
  data: RecipeItem[];
}

const calculator = (props: Props) => {
  const { double, half, data } = props;

  const test = data.map((recipeItem) => {
    let fractionAmount: number = 0;

    if (
      recipeItem.enableFractionalAmount &&
      recipeItem.fractionalAmount !== ''
    ) {
      const numerator = recipeItem.fractionalAmount.split('/')[0];
      const denominator = recipeItem.fractionalAmount.split('/')[1];

      if (!isNaN(Number(numerator)) && !isNaN(Number(denominator))) {
        fractionAmount = Number(numerator) / Number(denominator);
      }
    }

    switch (recipeItem.unit) {
      case 'Cup':
        const ozCup = (Math.abs(recipeItem.amount) + fractionAmount) / 0.125;

        if (double) {
          const doubledCups = ozCup * double * 0.125;
          console.log(doubledCups);
          if (doubledCups - Math.floor(doubledCups) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(doubledCups),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: doubledCups,
          };
        } else if (half) {
          const halfedCups = (ozCup / half) * 0.125;

          if (halfedCups - Math.floor(halfedCups) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(halfedCups),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: halfedCups,
          };
        }
        break;
      case 'Tablespoon':
        const ozTbsp = (Math.abs(recipeItem.amount) + fractionAmount) / 2;

        if (double) {
          const doubledTbsp = ozTbsp * double * 2;

          if (doubledTbsp - Math.floor(doubledTbsp) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(doubledTbsp),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: doubledTbsp,
          };
        } else if (half) {
          const halfedTbsp = (ozTbsp / half) * 2;

          if (halfedTbsp - Math.floor(halfedTbsp) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(halfedTbsp),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: halfedTbsp,
          };
        }
        break;
      case 'Teaspoon':
        const ozTeaspoon =
          (Math.abs(recipeItem.amount) + fractionAmount) * 0.1667;

        if (double) {
          const doubledTsp = (ozTeaspoon * double) / 0.1667;

          if (doubledTsp - Math.floor(doubledTsp) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(doubledTsp),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: doubledTsp,
          };
        } else if (half) {
          const halfedTsp = ozTeaspoon / half / 0.1667;

          if (halfedTsp - Math.floor(halfedTsp) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(halfedTsp),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: halfedTsp,
          };
        }
        break;
      case 'Ounce':
        if (double) {
          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: Math.abs(recipeItem.amount) * double,
          };
        } else if (half) {
          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: Math.abs(recipeItem.amount) / half,
          };
        }
        break;
      case 'Pounds':
        const totalWeight = Math.abs(recipeItem.amount) + fractionAmount;

        if (double) {
          const doubledLbs = totalWeight * double;

          if (doubledLbs - Math.floor(doubledLbs) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(doubledLbs),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: doubledLbs,
          };
        } else if (half) {
          const halfedLbs = totalWeight / half;

          if (halfedLbs - Math.floor(halfedLbs) !== 0) {
            return {
              itemName: recipeItem.itemName,
              unit: recipeItem.unit,
              amount: decimalToFractions(halfedLbs),
            };
          }

          return {
            itemName: recipeItem.itemName,
            unit: recipeItem.unit,
            amount: halfedLbs,
          };
        }
    }
  });

  return test;
};

const decimalToFractions = (decimal: number) => {
  const gcd = (a: number, b: number): number => {
    if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

    return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
  };

  const fraction = decimal;
  const len = fraction.toString().length - 2;

  let denominator = Math.pow(10, len);
  let numerator = fraction * denominator;

  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  // checks for improper fraction
  if (numerator > denominator) {
    const decimalWhole = numerator / denominator;

    const wholenumber = String(decimalWhole).split('.')[0];

    const fraction: any = decimalToFractions(
      Number(`.${String(decimalWhole).split('.')[1]}`)
    );

    return `${wholenumber} ${fraction}`;
  }

  return `${Math.floor(numerator)}/${Math.floor(denominator)}`;
};

export default calculator;
