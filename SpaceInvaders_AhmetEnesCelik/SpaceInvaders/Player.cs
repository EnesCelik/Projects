using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    class Player : ShooterObject
    {
        // Properties
        private int iLifes;
        private int iScore;

        // Determines if the object can shoot again because the bullet hasnt died
        private bool bCanShoot;

        // Player limits to move
        private const int iLeftLimit = 10;
        private const int iRightLimit = 69;
        private const int iVerticalPosition = 38; // Max Window Height is 40

        // Constructor
        public Player()
        {
            eType = GameObjectType.Player;
            iLifes = 3;
            iScore = 0;
            iPosX = 40; // Center of the screen
            iPosY = iVerticalPosition;
            bCanShoot = true;
        }

        // Changes the player points
        public void vIncreaseScore(int score)
        {
            iScore += score;     
        }

        // Getter method for the points
        public int iGetScore()
        {
            return iScore;
        }

        // Decreases the life of the player
        public void vDecreaseLife()
        {
            iLifes--;
        }

        // Getter method for the lifes
        public int iGetLifes()
        {
            return iLifes;
        }

        // Moves the player left or right
        public void vMove(Direction direction)
        {
            switch (direction)
            {
                case Direction.Right:
                    if (iPosX < iRightLimit)
                    {
                        iPosX++;
                    } 
                    break;
                case Direction.Left:
                    if (iPosX > iLeftLimit)
                    {
                        iPosX--;
                    }
                    break;
            }
        }

        // Makes the player shoot
        public Bullet bShoot()
        {
            bCanShoot = false;
            return bCreateBullet();
        }

        // Getter method for the player shooting state
        public bool bIsAbleToShoot()
        {
            return bCanShoot;
        }

        // Makes the player being able to shoot again
        public void vReloadBullet()
        {
            bCanShoot = true;
        }
    }
}
