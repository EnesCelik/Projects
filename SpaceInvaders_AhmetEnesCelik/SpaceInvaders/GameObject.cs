using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceInvaders
{
    // Different types of objects inside the board
    enum GameObjectType { Player, Enemy };
    // Defines the color they are going to be displayed
    enum Color { Blue, Red, Yellow,Green , Magenta,  Grey, White };

    abstract class GameObject
    {
        // Position in grid map
        protected int iPosX;
        protected int iPosY;
    
        // Game properties
        protected GameObjectType eType;
        protected Color eColor;

        // Deletes the object from the grid
        public void vDestroy()
        {
            // TODO: Determine how the object is going to get destroyed
        }

        // Gets X Coordinate
        public int iGetPosX()
        {
            return iPosX;
        }

        // Gets Y Coordinate
        public int iGetPosY()
        {
            return iPosY;
        }

        // Getter function for the color
        public Color eGetColor()
        {
            return eColor;
        }
    }
}
