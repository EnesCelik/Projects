using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    class Enemy : ShooterObject
    {
        // Points the player is going to get when destroyed
        private int iPoints;

        // Constructor
        public Enemy(int points, int x, int y)
        {
            eType = GameObjectType.Enemy;
            iPoints = points;
            iPosX = x;
            iPosY = y;
        }
        
        // Getter Method for getting the points
        public int iGetPoints()
        {
            return iPoints;
        }

        // Assingns a color to the enemy
        public void vAssignColor(Color color)
        {
            eColor = color;
        }

        // Moves the enemy sideways
        public void vModeSide(Direction direction)
        {
            if(direction == Direction.Left)
            {
                iPosX--;
            }
            else if(direction == Direction.Right)
            {
                iPosX++;
            }
        }

        // Moves the enemy down a posistion in the grid
        public void vModeDown()
        {
            iPosY++;
        }

        // Make the enemy shoot
        public Bullet bShoot()
        {
            return bCreateBullet();
        }
    }
}
