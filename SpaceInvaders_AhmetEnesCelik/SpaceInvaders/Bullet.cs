using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    class Bullet : GameObject
    {
        // Determines what object spawned the bullet
        private GameObjectType eShooter;

        // Determines the boundaries of where the bullets need to die
        private int iTopBoundary = 3;
        private int iBottomBoundary = 39;

        // Constructor
        public Bullet(GameObjectType type, int x, int y)
        {
            // Who shot the bullet??
            eShooter = type;
            // Initialize the bullet position
            iPosX = x;
            switch (type)
            {
                case GameObjectType.Player:
                    iPosY = y - 1;
                    break;
                case GameObjectType.Enemy:
                    iPosY = y + 1;
                    break;
            }
        }

        // Move sthe bullet across the board
        public void vMove()
        {
            // Depending on the object the bullet starts to travel up or down
            if (eShooter == GameObjectType.Enemy)
            {
                iPosY++;
            }
            else if (eShooter == GameObjectType.Player)
            {
                iPosY--;
            }
        }

        // Checks if the bullet has reached any of the limits
        public bool bIsInsideBoundaries()
        {
            return iPosY > iTopBoundary && iPosY < iBottomBoundary;
        }

        // Getter method for shooter object
        public GameObjectType eGetShooter()
        {
            return eShooter;
        }
    }
}
