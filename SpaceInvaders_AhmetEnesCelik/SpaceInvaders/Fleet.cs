using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    class Fleet
    {
        // Fleet Size
        private const int iFleetRows = 5;
        private const int iFleetColumns = 10;
        private Direction direction;
        
        // Fleet Position
        private int iPosX;
        private int iPosY;

        // Fleet Speed
        private int iSpeed;

        // Keeps control over available shooting columns of the fleet
        private List<int> liShootingColumns = new List<int>();

        // Sets how much to the sides the fleet can go inside the boundaries of the grid / board
        private const int iBoundaryLeftLimit = 9;
        private const int iBoundaryRightLimit = 70;

        // Determines the moving limits of the fleet and the bottom limit to end the game
        private int iLeftLimit;
        private int iRightLimit;
        private int iBottomLimit;
        
        // Fleet Map attributes
        private int iRemainingEnemies;
        private Enemy[,] fleetMap;
        
        // Initialize fleet
        public Fleet()
        {
            // Initial fleet coordinates from which to start drawing
            iPosX = 31; 
            iPosY = 5;
            // Starting speed
            iSpeed = 500;
            // Initialize shoting columns array
            for (int i = 0; i < iFleetColumns; i++)
            {
                liShootingColumns.Add(i);
            }
            // Initial Fleet movement direction
            direction = Direction.Right; 
            // The fleet is going to have 50 enemies
            iRemainingEnemies = iFleetRows * iFleetColumns;
            // Populates the fleet
            vCreateFleet();
            // Initialize fleet movement limits
            iLeftLimit = 0; // Represents left most posX enemy
            iRightLimit = (iFleetColumns - 1) * 2; // Represents the right most posx enemy
            iBottomLimit = (iFleetRows - 1) * 2; // Represents the bottom posy enemy
        }

        // Getter method for the fleet row count
        public int iGetRows()
        {
            return iFleetRows;
        }

        // Getter method for the fleet column count
        public int iGetColumns()
        {
            return iFleetColumns;
        }

        // Getter method for Fleet PosX
        public int iGetPosX()
        {
            return iPosX;
        }

        // Getter method for Fleet PosY
        public int iGetPosY()
        {
            return iPosY;
        }

        // Getter method for bottom limit for the fleet
        public int iGetBottomLimit()
        {
            return iBottomLimit;
        }

        // Getter method to get the fleet map
        public Enemy[,] aGetFleetMap()
        {
            return fleetMap;
        }

        // Getter method for the shooting columns
        public List<int> getShootingColumns()
        {
            return liShootingColumns;
        }

        // Getter method for the remaining enemies
        public int iGetRemainingEnemies()
        {
            return iRemainingEnemies;
        }

        // Getter method for fleet speed
        public int iGetSpeed()
        {
            return iSpeed;
        }

        // Populates the Fleet of enemies
        public void vCreateFleet()
        {
            int points = iFleetRows * iFleetColumns;
            fleetMap = new Enemy[iFleetRows, iFleetColumns];
            for (int row = 0; row < iFleetRows; row++)
            {
                for (int column = 0; column < iFleetColumns; column++)
                {
                    // Places each enemy with one space from each other
                    Enemy newEnemy = new Enemy(points, iPosX + (column + column), iPosY + (row + row));

                    // Change the color of the enemy in the case of which row do they have 
                    switch(row)
                    {
                        case 0:
                            newEnemy.vAssignColor(Color.Blue);
                            break;
                        case 1:
                            newEnemy.vAssignColor(Color.Red);
                            break;
                        case 2:
                            newEnemy.vAssignColor(Color.Yellow);
                            break;
                        case 3:
                            newEnemy.vAssignColor(Color.Green);
                            break;
                        case 4:
                            newEnemy.vAssignColor(Color.Magenta);
                            break;
                    }
                    
                    // Adds the enemy to the fleet
                    fleetMap[row, column] = newEnemy;
                }
                // Every row has 10 points less
                points -= 10;
            }
        }

        // Decreases the enemy count
        public void vDecreaseRemainingEnemies()
        {
            iRemainingEnemies--;
        }
        
        // Moves the fleet depending on the direction
        public void vMove()
        {
            // Check if fleet is already going down
            if (direction == Direction.Down)
            {
                // Check which side the fleet needs to go now (Left or Right)
                if(iPosX + 1 + iRightLimit == iBoundaryRightLimit)
                {
                    direction = Direction.Left;
                }
                else if (iPosX - 1 - iLeftLimit == iBoundaryLeftLimit)
                {
                    direction = Direction.Right;
                }
            } 
            // Checks if the fleet has to go down
            else if ((iPosX + 1 + iRightLimit == iBoundaryRightLimit || iPosX - 1 - iLeftLimit == iBoundaryLeftLimit) && direction != Direction.Down)
            {
                direction = Direction.Down;
            }

            // Makes the fleet update its position and enemies position
            switch (direction)
            {
                case Direction.Left:
                    iPosX--;
                    vMoveSide();
                    break;
                case Direction.Right:
                    iPosX++;
                    vMoveSide();
                    break;
                case Direction.Down:
                    iPosY++;
                    vMoveDown();
                    break;
            }
        }

        // Moves the entire fleet to the Right or Left depending 
        private void vMoveSide()
        {
            for (int row = 0; row < iFleetRows; row++)
            {
                for (int column = 0; column < iFleetColumns; column++)
                {
                    if(fleetMap[row, column] != null)
                    {
                        fleetMap[row, column].vModeSide(direction);
                    }
                }
            }
        }

        // Moves the entire fleet down
        private void vMoveDown()
        {
            for (int row = 0; row < iFleetRows; row++)
            {
                for (int column = 0; column < iFleetColumns; column++)
                {
                    if (fleetMap[row, column] != null)
                    {
                        fleetMap[row, column].vModeDown();
                    }
                }
            }
        }

        // Determines the limits of movement for the fleet
        public void vCalculateFleetLimits()
        {
            // Check is there are still enemies
            if (iRemainingEnemies > 0)
            {
                vUpdateBottomRowLimit();
                vUpdateRightColumnLimit();
                vUpdateLeftColumnLimit();
            }
        }

        private void vUpdateBottomRowLimit()
        {
            // Loops the bottom row to check if there are still enemies
            bool iEnemiesInRow = false;
            for (int column = 0; column < iFleetColumns; column++)
            {
                if (fleetMap[(iBottomLimit / 2), column] != null)
                {
                    // One enemy found
                    iEnemiesInRow = true;
                    break;
                }
            }
            // Updates the bottom limit
            // It is using 2 because it is counting the white space between ships
            if (!iEnemiesInRow)
            {
                iBottomLimit -= 2;
                vUpdateBottomRowLimit();
            }
        }

        // Loops over the enemies that are placed on the right column limit to update the right limit of the entire fleet movement
        private void vUpdateRightColumnLimit()
        {
            bool iEnemiesInRightColumn = false;
            for (int row = 0; row < iFleetRows; row++)
            {
                if (fleetMap[row, (iRightLimit / 2)] != null)
                {
                    // One Enemy Found
                    iEnemiesInRightColumn = true;
                    break;
                }
            }
            if (!iEnemiesInRightColumn)
            {
                iRightLimit -= 2;
                vUpdateRightColumnLimit();
            }
        }

        // Loops over the enemies that are placed on the left column limit to update the left limit of the entire fleet movement
        private void vUpdateLeftColumnLimit()
        {
            bool iEnemiesInLeftColumn = false;
            for (int row = 0; row < iFleetRows; row++)
            {
                if (fleetMap[row, (iLeftLimit / 2) * -1] != null)
                {
                    // One Enemy Found
                    iEnemiesInLeftColumn = true;
                    break;
                }
            }
            if (!iEnemiesInLeftColumn)
            {
                iLeftLimit -= 2;
                vUpdateLeftColumnLimit();
            }
        }

        // Update Available Enemy Columns That Can Shoot
        public void vUpdateShootingColumns(int column)
        {
            bool iEnemiesInColumn = false;
            // Loop over the column to check for remaining enemies
            for (int i = iFleetRows - 1; i >= 0; i--)
            {
                if(fleetMap[i, column] != null)
                {
                    // There are still enemies in column
                    iEnemiesInColumn = true;
                    break;
                }
            }
            // This means we hit the top enemy of the column
            if (!iEnemiesInColumn)
            {
                // Remove column number from array
                liShootingColumns.Remove(column);
            }
        }
    }
}
